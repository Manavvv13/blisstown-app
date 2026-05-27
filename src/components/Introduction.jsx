import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Introduction.css';

const Introduction = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        const elements = sectionRef.current?.querySelectorAll('[class*="reveal-"]');
        if (elements) {
            elements.forEach(el => observer.observe(el));
        }

        const handleScroll = () => {
            if (!textRef.current) return;
            const rect = textRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate scroll progress for the text block:
            // Start fading when the top of the text block is at 90% of the screen height
            // Finish fading (all black) when the top of the text block reaches 35% of the screen height
            const start = windowHeight * 0.9;
            const end = windowHeight * 0.35;
            
            let progress = (start - rect.top) / (start - end);
            progress = Math.max(0, Math.min(1, progress));
            
            const words = textRef.current.querySelectorAll('.word-fade');
            const totalWords = words.length;
            
            words.forEach((word, index) => {
                const wordStart = index / totalWords;
                const wordEnd = (index + 1) / totalWords;
                
                let wordProgress = (progress - wordStart) / (wordEnd - wordStart);
                wordProgress = Math.max(0, Math.min(1, wordProgress));
                
                // Color fades from rgba(255, 255, 255, 0.25) to rgba(255, 255, 255, 1)
                const alpha = 0.25 + wordProgress * 0.75;
                word.style.color = `rgba(255, 255, 255, ${alpha})`;
            });
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        handleScroll();

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    return (
        <section className="intro-section" ref={sectionRef}>
            <div className="intro-container container">
                
                {/* Left Column: Heading and Rounded Image */}
                <div className="intro-left reveal-left">
                    <span className="font-subheading-lg intro-tag">About Us</span>
                    <div className="intro-image-wrapper">
                        <img 
                            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80" 
                            alt="Luxury Architecture Facade" 
                            className="intro-image"
                        />
                    </div>
                </div>

                {/* Right Column: High-Contrast Highlighted Typography */}
                <div className="intro-right reveal-right" style={{ transitionDelay: '0.2s' }}>
                    <h3 className="intro-highlight-title" ref={textRef}>
                        {"We're a team of developers and architects dedicated to building smarter, more sustainable homes tailored to the way you live today, and ready for the demands of tomorrow."
                            .split(" ")
                            .map((word, i) => (
                                <span 
                                    key={i} 
                                    className="word-fade"
                                    style={{ transitionDelay: '0s' }} // Scroll listener controls delay dynamically
                                >
                                    {word}{" "}
                                </span>
                            ))
                        }
                    </h3>

                    <div className="intro-actions">
                        <Link to="/about-us" className="btn-black-pill">
                            Get Started
                            <div className="arrow-circle">
                                <span className="material-symbols-outlined">arrow_outward</span>
                            </div>
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Introduction;
