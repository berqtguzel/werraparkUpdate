import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import GiftVoucherForm from "@/Components/GiftVoucher/GiftVoucherForm";
import SeoHead from "@/Components/SeoHead";
import { useTranslation } from "@/i18n";
import "@/../css/gift-voucher-page.css";

export default function CheckoutSepa({
    currentRoute = "gutschein",
    locale = "de",
    paymentMethods = {},
    companies = [],
    defaultCompanyId = null,
}) {
    const { t } = useTranslation();
    const sepa = paymentMethods.sepa ?? {};
    const ready = Boolean(sepa.enabled);

    const paymentPanel = (
        <div className="gvf-method-panel">
            <h3>{t("giftVoucher.sepaPanelTitle")}</h3>
            {ready ? (
                <ul className="gvf-sepa-list">
                    {sepa.bank_name ? (
                        <li>
                            <span>{t("giftVoucher.sepaBank")}</span>
                            <strong>{sepa.bank_name}</strong>
                        </li>
                    ) : null}
                    {sepa.creditor_name &&
                    (!sepa.bank_name ||
                        sepa.creditor_name !== sepa.bank_name) ? (
                        <li>
                            <span>{t("giftVoucher.sepaCreditor")}</span>
                            <strong>{sepa.creditor_name}</strong>
                        </li>
                    ) : null}
                    {sepa.iban_masked ? (
                        <li>
                            <span>{t("giftVoucher.sepaIban")}</span>
                            <strong>{sepa.iban_masked}</strong>
                        </li>
                    ) : null}
                    {sepa.bic ? (
                        <li>
                            <span>BIC</span>
                            <strong>{sepa.bic}</strong>
                        </li>
                    ) : null}
                </ul>
            ) : (
                <p className="gvf-warn">
                    {t("giftVoucher.sepaUnavailableNote")}
                </p>
            )}
            <p className="gvf-note">
                {t("giftVoucher.sepaIntegrationNote")}
            </p>
        </div>
    );

    return (
        <AppLayout currentRoute={currentRoute}>
            <SeoHead
                title={`${t("giftVoucher.pageTitle")} - SEPA`}
                description={t("giftVoucher.heroSubtitle")}
            />
            <GiftVoucherForm
                locale={locale}
                methodTitle="SEPA"
                paymentMethod="sepa"
                paymentReady={ready}
                submitLabel={
                    ready
                        ? t("giftVoucher.payWithSepa")
                        : t("giftVoucher.sepaUnavailableTitle")
                }
                submitVariant="gvf-pay-btn--sepa"
                paymentPanel={paymentPanel}
                companies={companies}
                defaultCompanyId={defaultCompanyId}
            />
        </AppLayout>
    );
}
