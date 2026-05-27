import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    const [offsetY, setOffsetY] = useState(0);

    const handleScroll = () => {
        setOffsetY(window.pageYOffset);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="hero">
            <div className="hero__background">
                <img 
                    alt="Luxury Property Facade" 
                    className="hero__image" 
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
                    style={{ transform: `translateY(${offsetY * 0.08}px) scale(${1.05 + offsetY * 0.00015})` }}
                />
                <div className="hero__overlay"></div>
            </div>

            <div className="hero__container container">
                <div className="hero__content reveal-up">
                    <div className="hero__tagline-wrapper">
                        <span className="hero__tagline-line"></span>
                        <span className="hero__tagline-text">Premium Urban Living</span>
                    </div>

                    <h1 className="hero__main-title">
                        Future Living <em>Designed</em> <br />for Visionaries
                    </h1>

                    <div className="hero__actions-group">
                        <Link to="/contact" className="hero__btn-explore" style={{ textDecoration: 'none' }}>
                            Get in touch <span className="btn-chevron">›</span>
                        </Link>
                    </div>
                </div>
            </div>
            
            <div className="hero__scroll-indicator">
                <span className="material-symbols-outlined hero__scroll-icon">keyboard_double_arrow_down</span>
            </div>
        </section>
    );
};

export default Hero;
