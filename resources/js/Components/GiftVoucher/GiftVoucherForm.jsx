import React from "react";
import { Link } from "@inertiajs/react";
import { useTranslation } from "@/i18n";

function getNumberLocale(locale) {
    if (locale === "tr") return "tr-TR";
    if (locale === "en") return "en-GB";
    return "de-DE";
}

export default function GiftVoucherForm({
    locale = "de",
    backHref,
    methodTitle,
    paymentPanel,
    paymentMethod,
    paymentReady = false,
    submitLabel,
    submitVariant = "",
    companies = [],
    defaultCompanyId = null,
}) {
    const { t } = useTranslation();
    const presetAmounts = [100, 200, 300, 400, 500];
    const [selectedAmount, setSelectedAmount] = React.useState(100);
    const [useCustom, setUseCustom] = React.useState(false);
    const [customAmount, setCustomAmount] = React.useState("");
    const [quantity, setQuantity] = React.useState(1);
    const [recipientName, setRecipientName] = React.useState("");
    const [recipientEmail, setRecipientEmail] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [companyId, setCompanyId] = React.useState(
        defaultCompanyId ?? companies[0]?.id ?? "",
    );
    const [submitting, setSubmitting] = React.useState(false);
    const [submitError, setSubmitError] = React.useState("");
    const [invoiceResult, setInvoiceResult] = React.useState(null);

    const parsedCustom = Number(customAmount);
    const customValue = Number.isFinite(parsedCustom)
        ? Math.min(500, Math.max(10, parsedCustom))
        : 0;
    const amount = useCustom ? customValue || 10 : selectedAmount;
    const total = amount * Math.max(1, quantity);
    const back = backHref ?? `/${locale}/gutschein`;
    const money = new Intl.NumberFormat(getNumberLocale(locale), {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
    });
    const currentRecipientName = recipientName.trim();
    const currentRecipientEmail = recipientEmail.trim();

    React.useEffect(() => {
        if (!companyId && companies[0]?.id) {
            setCompanyId(defaultCompanyId ?? companies[0].id);
        }
    }, [companies, companyId, defaultCompanyId]);

    const resolveErrorMessage = React.useCallback(
        (payload) => {
            if (!payload || typeof payload !== "object") {
                return t("giftVoucher.submitError");
            }

            const fieldErrors = payload.errors;
            if (fieldErrors && typeof fieldErrors === "object") {
                const firstEntry = Object.values(fieldErrors).find(
                    (entry) => Array.isArray(entry) && entry[0],
                );
                if (Array.isArray(firstEntry) && firstEntry[0]) {
                    return String(firstEntry[0]);
                }
            }

            if (payload.message) {
                return String(payload.message);
            }

            return t("giftVoucher.submitError");
        },
        [t],
    );

    const handleSubmit = async () => {
        if (!paymentReady || submitting) {
            return;
        }

        const cleanName = recipientName.trim();
        const cleanEmail = recipientEmail.trim();
        const numericCompanyId = Number(companyId);

        if (!cleanName) {
            setSubmitError(t("giftVoucher.validationName"));
            return;
        }

        if (!cleanEmail) {
            setSubmitError(t("giftVoucher.validationEmail"));
            return;
        }

        if (!Number.isFinite(numericCompanyId) || numericCompanyId <= 0) {
            setSubmitError(t("giftVoucher.validationCompany"));
            return;
        }

        setSubmitting(true);
        setSubmitError("");
        setInvoiceResult(null);

        try {
            const csrfToken =
                document
                    .querySelector('meta[name="csrf-token"]')
                    ?.getAttribute("content") ?? "";

            const response = await fetch("/api/billing/invoices", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    "X-CSRF-TOKEN": csrfToken,
                },
                body: JSON.stringify({
                    company_id: numericCompanyId,
                    customer_name: cleanName,
                    customer_email: cleanEmail,
                    total_amount: total,
                    amount,
                    quantity,
                    payment_method: paymentMethod,
                    message: message.trim(),
                    description: `Werrapark gift voucher - ${quantity} x ${amount} EUR - ${paymentMethod}`,
                }),
            });

            const payload = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(resolveErrorMessage(payload));
            }

            const invoice = payload.invoice ?? null;
            const created = payload.data ?? null;

            setInvoiceResult({
                message:
                    payload.message || t("giftVoucher.invoiceCreatedSuccess"),
                created,
                invoice,
            });
        } catch (error) {
            setSubmitError(
                error instanceof Error
                    ? error.message
                    : t("giftVoucher.submitError"),
            );
        } finally {
            setSubmitting(false);
        }
    };

    const summaryInvoice = invoiceResult?.invoice ?? invoiceResult?.created ?? null;
    const actionClassName = `gvf-pay-btn ${submitVariant}`.trim();

    return (
        <section className="gvf-page">
            <div className="gvf-box gvf-box--checkout">
                <div className="gvf-checkout-top">
                    <Link href={back} className="gvf-back">
                        ← {t("giftVoucher.backToMethods")}
                    </Link>
                    <header className="gvf-head gvf-head--checkout">
                        <span className="gvf-kicker">
                            {t("giftVoucher.checkoutKicker")}
                        </span>
                        <h1>{t("giftVoucher.pageTitle")}</h1>
                        <p>
                            {methodTitle
                                ? t("giftVoucher.paymentWith", {
                                      method: methodTitle,
                                  })
                                : t("giftVoucher.checkoutSubtitle")}
                        </p>
                    </header>
                </div>

                <div className="gvf-top">
                    <div className="gvf-amounts">
                        <div className="gvf-section-head">
                            <h2>{t("giftVoucher.chooseAmount")}</h2>
                            <p>{t("giftVoucher.chooseAmountHint")}</p>
                        </div>

                        <div className="gvf-amount-grid">
                            {presetAmounts.map((value) => {
                                const active =
                                    !useCustom && selectedAmount === value;
                                return (
                                    <button
                                        key={value}
                                        type="button"
                                        className={`gvf-amount-card ${active ? "is-active" : ""}`}
                                        onClick={() => {
                                            setUseCustom(false);
                                            setSelectedAmount(value);
                                        }}
                                    >
                                        <span className="gvf-radio" />
                                        <strong>{money.format(value)}</strong>
                                        <small>
                                            {t("giftVoucher.oneTime")}
                                        </small>
                                    </button>
                                );
                            })}
                        </div>

                        <div
                            className={`gvf-custom ${useCustom ? "is-active" : ""}`}
                            onClick={() => setUseCustom(true)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) =>
                                (e.key === "Enter" || e.key === " ") &&
                                setUseCustom(true)
                            }
                        >
                            <span className="gvf-radio" />
                            <div className="gvf-custom-body">
                                <h3>{t("giftVoucher.customAmount")}</h3>
                                <div className="gvf-custom-input">
                                    <span>EUR</span>
                                    <input
                                        type="number"
                                        min={10}
                                        max={500}
                                        placeholder={t(
                                            "giftVoucher.customPlaceholder",
                                        )}
                                        value={customAmount}
                                        onChange={(e) => {
                                            setUseCustom(true);
                                            setCustomAmount(e.target.value);
                                        }}
                                    />
                                </div>
                                <p>{t("giftVoucher.customRange")}</p>
                            </div>
                        </div>
                    </div>

                    <aside className="gvf-preview" aria-hidden="true">
                        <div className="gvf-card gcf-back" />
                        <div className="gvf-card gcf-front">
                            <span className="gcf-chip" />
                            <span className="gcf-brand">WERRAPARK</span>
                            <span className="gcf-tag">
                                {t("giftVoucher.cardTag")}
                            </span>

                            <em>{money.format(amount)}</em>
                        </div>
                    </aside>
                </div>

                <section className="gvf-section">
                    <div className="gvf-section-head">
                        <h2>{t("giftVoucher.recipientInfo")}</h2>
                        <p>{t("giftVoucher.recipientHint")}</p>
                    </div>
                    <div className="gvf-form-row">
                        <label>
                            {t("giftVoucher.recipientName")}
                            <input
                                type="text"
                                placeholder={t(
                                    "giftVoucher.recipientNamePlaceholder",
                                )}
                                value={recipientName}
                                onChange={(e) =>
                                    setRecipientName(e.target.value)
                                }
                            />
                        </label>
                        <label>
                            {t("giftVoucher.recipientEmail")}
                            <input
                                type="email"
                                placeholder={t(
                                    "giftVoucher.recipientEmailPlaceholder",
                                )}
                                value={recipientEmail}
                                onChange={(e) =>
                                    setRecipientEmail(e.target.value)
                                }
                            />
                        </label>
                    </div>
                    <label className="gvf-full">
                        {t("giftVoucher.messageLabel")}
                        <textarea
                            rows={5}
                            placeholder={t("giftVoucher.messagePlaceholder")}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </label>
                </section>

                <section className="gvf-section">
                    <div className="gvf-section-head">
                        <h2>{t("giftVoucher.summaryTitle")}</h2>
                        <p>{t("giftVoucher.summaryHint")}</p>
                    </div>
                    <div className="gvf-summary-grid">
                        {companies.length > 1 ? (
                            <label>
                                {t("giftVoucher.companyLabel")}
                                <select
                                    value={companyId}
                                    onChange={(e) =>
                                        setCompanyId(e.target.value)
                                    }
                                >
                                    {companies.map((company) => (
                                        <option
                                            key={company.id ?? company.name}
                                            value={company.id ?? ""}
                                        >
                                            {company.name ?? "—"}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        ) : null}
                        <label>
                            {t("giftVoucher.quantity")}
                            <input
                                type="number"
                                min={1}
                                value={quantity}
                                onChange={(e) =>
                                    setQuantity(Number(e.target.value) || 1)
                                }
                            />
                        </label>
                        <label>
                            {t("giftVoucher.selectedAmount")}
                            <input
                                type="text"
                                value={money.format(amount)}
                                readOnly
                            />
                        </label>
                        <label>
                            {t("giftVoucher.total")}
                            <input
                                type="text"
                                value={money.format(total)}
                                readOnly
                            />
                        </label>
                    </div>

                    {paymentPanel ? (
                        <div className="gvf-payment-slot">{paymentPanel}</div>
                    ) : null}

                    <div className="gvf-footer">
                        <div className="gvf-total">
                            <span>{t("giftVoucher.total")}</span>
                            <strong>{money.format(total)}</strong>
                        </div>
                        <button
                            type="button"
                            className={actionClassName}
                            disabled={!paymentReady || submitting}
                            title={
                                !paymentReady
                                    ? t("giftVoucher.paymentUnavailable")
                                    : ""
                            }
                            onClick={handleSubmit}
                        >
                            {submitting
                                ? t("giftVoucher.processing")
                                : submitLabel || t("giftVoucher.payNow")}
                        </button>
                    </div>

                    {submitError ? (
                        <div className="gvf-submit-state gvf-submit-state--error">
                            <strong>{t("giftVoucher.submitErrorTitle")}</strong>
                            <p>{submitError}</p>
                        </div>
                    ) : null}

                    {summaryInvoice ? (
                        <div className="gvf-submit-state gvf-submit-state--success">
                            <strong>
                                {invoiceResult?.message ||
                                    t("giftVoucher.invoiceCreatedSuccess")}
                            </strong>
                            <div className="gvf-invoice-result-grid">
                                <div>
                                    <span>{t("giftVoucher.resultInvoice")}</span>
                                    <b>
                                        {summaryInvoice.invoice_number ||
                                            summaryInvoice.number ||
                                            "—"}
                                    </b>
                                </div>
                                <div>
                                    <span>{t("giftVoucher.resultStatus")}</span>
                                    <b>{summaryInvoice.status || "pending"}</b>
                                </div>
                                <div>
                                    <span>{t("giftVoucher.resultMethod")}</span>
                                    <b>
                                        {summaryInvoice.payment_method ||
                                            paymentMethod ||
                                            "—"}
                                    </b>
                                </div>
                                <div>
                                    <span>{t("giftVoucher.resultTotal")}</span>
                                    <b>
                                        {money.format(
                                            Number(
                                                summaryInvoice.total_amount ??
                                                    summaryInvoice.total ??
                                                    total,
                                            ) || total,
                                        )}
                                    </b>
                                </div>
                                <div>
                                    <span>{t("giftVoucher.resultCustomer")}</span>
                                    <b>
                                        {summaryInvoice.customer_name ||
                                            currentRecipientName ||
                                            recipientName}
                                    </b>
                                </div>
                                <div>
                                    <span>{t("giftVoucher.resultEmail")}</span>
                                    <b>
                                        {summaryInvoice.customer_email ||
                                            currentRecipientEmail ||
                                            recipientEmail}
                                    </b>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </section>
            </div>
        </section>
    );
}
