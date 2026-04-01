import React, { useState } from "react";
import { useTranslation } from "@/i18n"; // i18n hook'unu import ettik
import "../../../css/reviews-page.css";
import HotelReviews from "../Home/HotelReviews";

const Index = () => {
    const { t } = useTranslation(); // t fonksiyonunu aldık
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
        rating: 5,
    });

    const [hover, setHover] = useState(0);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: "", message: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: "", message: "" });

        try {
            const res = await fetch("/api/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        ?.getAttribute("content"),
                },
                body: JSON.stringify({
                    author_name: form.name,
                    author_email: form.email,
                    content: form.message,
                    rating: form.rating,
                }),
            });

            if (res.ok) {
                setStatus({
                    type: "success",
                    message: t("reviews.success"), // Başarı mesajı
                });
                setForm({
                    name: "",
                    email: "",
                    message: "",
                    rating: 5,
                });
            } else {
                setStatus({
                    type: "error",
                    message: t("reviews.error"), // Hata mesajı
                });
            }
        } catch (error) {
            setStatus({
                type: "error",
                message: t("reviews.serverError"), // Sunucu hatası
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className="review-page">
                <div className="review-bg-shape review-bg-shape-1"></div>
                <div className="review-bg-shape review-bg-shape-2"></div>
                <div className="review-bg-grid"></div>

                <div className="review-container">
                    <div className="review-hero">
                        <div className="review-badge">
                            {t("reviews.heroBadge")}
                        </div>
                        <h1>{t("reviews.heroTitle")}</h1>
                        <p>{t("reviews.heroSubtitle")}</p>

                        <div className="review-hero-stats">
                            <div className="hero-stat-card">
                                <strong>5★</strong>
                                <span>{t("reviews.statSatisfaction")}</span>
                            </div>
                            <div className="hero-stat-card">
                                <strong>{t("reviews.statFast")}</strong>
                                <span>{t("reviews.statFastDesc")}</span>
                            </div>
                            <div className="hero-stat-card">
                                <strong>{t("reviews.statSecure")}</strong>
                                <span>{t("reviews.statSecureDesc")}</span>
                            </div>
                        </div>
                    </div>

                    <div className="review-card">
                        <div className="review-card-top">
                            <div>
                                <span className="mini-label">
                                    {t("reviews.formMiniLabel")}
                                </span>
                                <h2>{t("reviews.formTitle")}</h2>
                                <p>{t("reviews.formSubtitle")}</p>
                            </div>

                            <div className="review-score-box">
                                <span>{t("reviews.selectedScore")}</span>
                                <strong>{form.rating}.0</strong>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="review-form">
                            <div className="review-form-grid">
                                <div className="input-group">
                                    <label htmlFor="name">
                                        {t("reviews.labelName")}
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder={t(
                                            "reviews.placeholderName",
                                        )}
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <label htmlFor="email">
                                        {t("reviews.labelEmail")}
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder={t(
                                            "reviews.placeholderEmail",
                                        )}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="rating-panel">
                                <div className="rating-texts">
                                    <span className="rating-title">
                                        {t("reviews.labelRating")}
                                    </span>
                                    <span className="rating-subtitle">
                                        {t("reviews.ratingInstruction")}
                                    </span>
                                </div>

                                <div className="star-rating">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            type="button"
                                            key={star}
                                            className={`star ${
                                                star <= (hover || form.rating)
                                                    ? "filled"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                setForm({
                                                    ...form,
                                                    rating: star,
                                                })
                                            }
                                            onMouseEnter={() => setHover(star)}
                                            onMouseLeave={() => setHover(0)}
                                            aria-label={`${star} ${t("reviews.ariaStars")}`}
                                        >
                                            ★
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="input-group textarea-group">
                                <label htmlFor="message">
                                    {t("reviews.labelMessage")}
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder={t(
                                        "reviews.placeholderMessage",
                                    )}
                                    required
                                />
                            </div>

                            <div className="review-actions">
                                <button
                                    type="submit"
                                    className={`submit-btn ${loading ? "loading" : ""}`}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner"></span>
                                            {t("reviews.btnSending")}
                                        </>
                                    ) : (
                                        t("reviews.btnSubmit")
                                    )}
                                </button>
                            </div>

                            {status.message && (
                                <div className={`status-msg ${status.type}`}>
                                    {status.message}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </section>

            <HotelReviews />
        </>
    );
};

export default Index;
