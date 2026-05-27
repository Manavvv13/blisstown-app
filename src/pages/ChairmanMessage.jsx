import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ChairmanMessage.css';

const ChairmanMessage = () => {
    useEffect(() => {
        // Reveal on scroll logic
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
        
        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div className="chairman-page">
            {/* Page Header */}
            <header className="page-header reveal-up">
                <div className="container">
                    <span className="font-subheading-lg page-header__tag">Leadership</span>
                    <h1 className="font-display-xl page-header__title">Chairman Message</h1>
                    <div className="breadcrumbs">
                        <Link to="/" className="breadcrumb-item" style={{ textDecoration: 'none' }}>Home</Link>
                        <span className="breadcrumb-separator">/</span>
                        <span className="breadcrumb-item breadcrumb-item--active">Chairman Message</span>
                    </div>
                </div>
            </header>

            {/* Main Message Section */}
            <section className="section container">
                <div className="chairman-grid grid-12">
                    {/* Visual Monogram/Portrait block */}
                    <div className="chairman-portrait-container col-lg-5 col-12 reveal-up">
                        <div className="chairman-portrait-frame">
                            <div className="chairman-portrait-bg">
                                <div className="gold-star-emblem">✦</div>
                                <span className="portrait-title">Office of the Chairman</span>
                                <span className="portrait-subtitle">Bliss Town Developers</span>
                            </div>
                            <div className="frame-border-top"></div>
                            <div className="frame-border-bottom"></div>
                        </div>
                    </div>

                    {/* Message Content */}
                    <div className="chairman-content col-lg-7 col-12 reveal-up">
                        <span className="font-subheading-lg text-gold">Executive Address</span>
                        <h2 className="font-headline-lg chairman-title">
                            A Most Trusted Name <em>"Bliss Town"</em> <br />
                            in Real Estate in NCR
                        </h2>

                        <div className="chairman-text">
                            <p className="font-body-lg letter-lead">
                                I sincerely thank you all for always standing beside through the journey of our group company, and now with Blisstown. Started with a modest beginning of constructing quality real estate, today Bliss Town stands tall after giving new-age homes to thousands of families.
                            </p>
                            <p className="font-body-md">
                                We cater to multiple geographies with real estate projects in all ranges. Our focus has been on the common man of the country not only limited to Tier-I cities but to reach such destinations which are new to organized real estate. In reciprocation, the market today has grown to recognize us as a responsible leader of tomorrow. We believe that value creation is an everlasting phenomenon and trust is not built overnight.
                            </p>
                        </div>

                        {/* Experience Counter Block */}
                        <div className="experience-counter-wrapper">
                            <div className="experience-counter">
                                <div className="experience-number">25</div>
                                <div className="experience-text-block">
                                    <span className="exp-line-1">Years of</span>
                                    <span className="exp-line-2">Working Experience</span>
                                </div>
                            </div>
                        </div>

                        <div className="signature-block">
                            <div className="signature-line"></div>
                            <span className="signer-name">Chairman</span>
                            <span className="signer-title">Bliss Town Developers Pvt. Ltd.</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ChairmanMessage;
