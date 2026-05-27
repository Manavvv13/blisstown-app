import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';

const AboutUs = () => {
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
        <div className="about-page">
            {/* Page Header / Hero Banner */}
            <header className="about-hero reveal-up">
                <div className="about-hero__overlay"></div>
                <div className="container about-hero__content">
                    <span className="font-subheading-lg about-hero__tag">Heritage of Trust</span>
                    <h1 className="font-display-xl about-hero__title">Our Story</h1>
                    <div className="breadcrumbs">
                        <Link to="/" className="breadcrumb-item" style={{ textDecoration: 'none' }}>Home</Link>
                        <span className="breadcrumb-separator">/</span>
                        <span className="breadcrumb-item breadcrumb-item--active">About Us</span>
                    </div>
                </div>
            </header>

            {/* Who We Are & Visual Stack */}
            <section className="about-intro-section container section">
                <div className="about-intro-grid">
                    
                    {/* Left: Overlapping Image Stack */}
                    <div className="about-image-stack reveal-up">
                        <div className="image-wrapper main-image-wrapper">
                            <img 
                                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" 
                                alt="Luxury Villa Architecture" 
                                className="about-img"
                            />
                        </div>
                        <div className="image-wrapper sub-image-wrapper">
                            <img 
                                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80" 
                                alt="Luxury Modern Lobby" 
                                className="about-img"
                            />
                        </div>
                        <div className="decor-gold-box"></div>
                    </div>

                    {/* Right: Who We Are Text */}
                    <div className="about-intro-text reveal-up" style={{ transitionDelay: '0.2s' }}>
                        <span className="font-subheading-lg text-gold">Who We Are</span>
                        <h2 className="font-headline-lg about-intro-title">
                            Bliss Town Developers <br />
                            <em>A Name You Can Trust</em>
                        </h2>
                        <div className="title-separator"></div>
                        <p className="font-body-lg intro-p">
                            Bliss Town Developers Pvt. Ltd., backed by the renowned <strong>Maxblis Group</strong>, brings decades of construction excellence to Greater Noida. 
                        </p>
                        <p className="font-body-md intro-sub-p">
                            With a vision to redefine real estate standards, we combine modern architectural concepts, robust engineering practices, and transparent customer relations to deliver landmark addresses.
                        </p>
                    </div>

                </div>
            </section>

            {/* Performance & Track Record */}
            <section className="about-performance-section section">
                <div className="container">
                    <div className="section-title-wrapper reveal-up">
                        <span className="font-subheading-lg text-gold">Performance</span>
                        <h2 className="font-headline-lg section-title-center">Our Track Record Speaks For Itself</h2>
                    </div>

                    {/* Projects Cards Grid */}
                    <div className="about-projects-grid reveal-up" style={{ transitionDelay: '0.2s' }}>
                        
                        <div className="project-glass-card glass-panel">
                            <div className="card-header-icon">
                                <span className="material-symbols-outlined">domain</span>
                            </div>
                            <h3 className="project-card-title">Maxblis Grand Kingston</h3>
                            <p className="project-card-loc">Sector 75, Noida</p>
                            <div className="status-badge-container">
                                <span className="status-badge-capsule">Delivered on Time</span>
                            </div>
                        </div>

                        <div className="project-glass-card glass-panel">
                            <div className="card-header-icon">
                                <span className="material-symbols-outlined">location_city</span>
                            </div>
                            <h3 className="project-card-title">Maxblis Grand Wellington</h3>
                            <p className="project-card-loc">Sector 75, Noida</p>
                            <div className="status-badge-container">
                                <span className="status-badge-capsule">Delivered on Time</span>
                            </div>
                        </div>

                        <div className="project-glass-card glass-panel">
                            <div className="card-header-icon">
                                <span className="material-symbols-outlined">home_work</span>
                            </div>
                            <h3 className="project-card-title">Maxblis White House</h3>
                            <p className="project-card-loc">Sector 75, Noida</p>
                            <div className="status-badge-container">
                                <span className="status-badge-capsule">Delivered on Time</span>
                            </div>
                        </div>

                    </div>

                    {/* Stats Achievements Badges */}
                    <div className="about-stats-container reveal-up" style={{ transitionDelay: '0.3s' }}>
                        <div className="stat-achievement-card">
                            <span className="stat-ach-number">100%</span>
                            <span className="stat-ach-label">Delivery Record</span>
                        </div>
                        <div className="stat-ach-divider"></div>
                        <div className="stat-achievement-card">
                            <span className="stat-ach-number">0</span>
                            <span className="stat-ach-label">Litigation History</span>
                        </div>
                        <div className="stat-ach-divider"></div>
                        <div className="stat-achievement-card">
                            <span className="stat-ach-number">RERA</span>
                            <span className="stat-ach-label">Full Compliance</span>
                        </div>
                    </div>

                </div>
            </section>

            {/* Promise & Philosophy */}
            <section className="about-philosophy-section container section">
                <div className="about-philosophy-grid">
                    
                    {/* Left: Luxury Quote Box */}
                    <div className="about-quote-box reveal-up">
                        <blockquote className="promise-blockquote">
                            "We don't just build homes. We deliver promises. On Time, Every Time."
                        </blockquote>
                        <cite className="promise-citation">— Bliss Town Commitment</cite>
                    </div>

                    {/* Right: Philosophy Content */}
                    <div className="about-philosophy-content reveal-up" style={{ transitionDelay: '0.2s' }}>
                        <span className="font-subheading-lg text-gold">Our Philosophy</span>
                        <h3 className="font-headline-md philosophy-title">Engineering Customer Satisfaction</h3>
                        <p className="font-body-md philosophy-p">
                            Bliss Town believes in developing and constructing aesthetically designed, functionally efficient residential and commercial complexes of international quality, offering more value for money.
                        </p>
                        <p className="font-body-md philosophy-p">
                            We believe our buildings should reflect engineering excellence with a view to providing complete customer satisfaction. It is our intention that the quality of our products and services should result in complete value for our clients, as well as foster continuous demand for our products. 
                        </p>
                        <p className="font-body-md philosophy-p">
                            While rendering our construction services, we shall strive to make Environmental, Health and Safety (EHS) matters as an integral part of our business.
                        </p>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default AboutUs;
