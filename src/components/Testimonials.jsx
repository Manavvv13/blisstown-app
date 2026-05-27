import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
    return (
        <section className="testimonials-section">
            <div className="testimonials-container">
                <div className="testimonials-header reveal-up">
                    <div className="testimonials-title-wrapper">
                        <span className="testimonials-subtitle">Client Echoes</span>
                        <h2 className="testimonials-title">Living the Vision</h2>
                    </div>
                    <div className="testimonials-description">
                        Reflections from those who chose Bliss Town as their sanctuary.
                    </div>
                </div>
                <div className="testimonials-grid">
                    <div className="testimonial-card reveal-up">
                        <span className="testimonial-quote-icon material-symbols-outlined">format_quote</span>
                        <p className="testimonial-text">"The attention to detail in our new home surpassed every expectation. It's not just a house; it's a piece of art."</p>
                        <div className="testimonial-author">
                            <div className="author-name">Adrian Thorne</div>
                            <div className="author-title">Global CEO, TechStream</div>
                        </div>
                    </div>
                    <div className="testimonial-card reveal-up" style={{ transitionDelay: '0.2s' }}>
                        <span className="testimonial-quote-icon material-symbols-outlined">format_quote</span>
                        <p className="testimonial-text">"Walking into a Bliss Town project feels like stepping into a curated world of calm. The architecture breathes."</p>
                        <div className="testimonial-author">
                            <div className="author-name">Helena Rossi</div>
                            <div className="author-title">Interior Architect</div>
                        </div>
                    </div>
                    <div className="testimonial-card reveal-up" style={{ transitionDelay: '0.4s' }}>
                        <span className="testimonial-quote-icon material-symbols-outlined">format_quote</span>
                        <p className="testimonial-text">"Luxury is found in the quiet moments. This developer understands the soul of modern living better than any other."</p>
                        <div className="testimonial-author">
                            <div className="author-name">Marcus Bennett</div>
                            <div className="author-title">Private Investor</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
