import React, { useState, useEffect, useRef } from 'react';
import './Gallery.css';

const gallerySlides = [
    {
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
        title: "The Penthouse Collection",
        desc: "Unrivaled views of the skyline through expansive glass walls."
    },
    {
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
        title: "Aquatic Sanctuaries",
        desc: "Private infinity pools designed for ultimate restoration."
    },
    {
        image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
        title: "The Signature Club",
        desc: "Bespoke health clubs, state-of-the-art spas, and private lounges."
    },
    {
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
        title: "Lush Sky Mansions",
        desc: "Stunning architectural terraces suspended in light and space."
    }
];

const Gallery = () => {
    // Clone first and last slides for seamless infinite loop
    const extendedSlides = [
        gallerySlides[gallerySlides.length - 1], // Clone of last slide at index 0
        ...gallerySlides,
        gallerySlides[0]                         // Clone of first slide at index 5
    ];

    const [currentIndex, setCurrentIndex] = useState(1);
    const [transitionEnabled, setTransitionEnabled] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const autoplayRef = useRef(null);

    // Re-enable transitions in the next rendering tick after a quick layout shift (infinite loop wrap)
    useEffect(() => {
        if (!transitionEnabled) {
            const raf = requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setTransitionEnabled(true);
                });
            });
            return () => cancelAnimationFrame(raf);
        }
    }, [transitionEnabled]);

    // Autoplay effect
    useEffect(() => {
        if (!isHovered && !isTransitioning) {
            autoplayRef.current = setInterval(() => {
                handleNext();
            }, 4000);
        }
        return () => {
            if (autoplayRef.current) clearInterval(autoplayRef.current);
        };
    }, [isHovered, isTransitioning, currentIndex]);

    const handleNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setTransitionEnabled(true);
        setCurrentIndex((prev) => prev + 1);
    };

    const handlePrev = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setTransitionEnabled(true);
        setCurrentIndex((prev) => prev - 1);
    };

    const handleTransitionEnd = () => {
        setIsTransitioning(false);
        if (currentIndex === extendedSlides.length - 1) {
            // Jump to the real first slide (index 1) instantly without animation
            setTransitionEnabled(false);
            setCurrentIndex(1);
        } else if (currentIndex === 0) {
            // Jump to the real last slide (index 4) instantly without animation
            setTransitionEnabled(false);
            setCurrentIndex(gallerySlides.length);
        }
    };

    const handleDotClick = (index) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setTransitionEnabled(true);
        setCurrentIndex(index + 1);
    };

    // Calculate active indicator dot
    let activeDotIndex = 0;
    if (currentIndex === 0) {
        activeDotIndex = gallerySlides.length - 1;
    } else if (currentIndex === extendedSlides.length - 1) {
        activeDotIndex = 0;
    } else {
        activeDotIndex = currentIndex - 1;
    }

    return (
        <section 
            className="gallery-section reveal-up"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div 
                className="gallery-slider-container" 
                style={{ 
                    transform: `translateX(-${currentIndex * 100}%)`,
                    transition: transitionEnabled ? 'transform 1s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
                }}
                onTransitionEnd={handleTransitionEnd}
            >
                {extendedSlides.map((slide, index) => (
                    <div className="gallery-slide" key={index}>
                        <img 
                            alt={slide.title} 
                            className="gallery-image" 
                            src={slide.image}
                        />
                        <div className="gallery-overlay">
                            <div className="gallery-content">
                                <h3 className="gallery-title">{slide.title}</h3>
                                <p className="gallery-description">{slide.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Navigation Buttons */}
            <div className="gallery-nav gallery-nav-left">
                <button 
                    className="gallery-nav-button" 
                    onClick={handlePrev}
                    aria-label="Previous slide"
                >
                    <span className="material-symbols-outlined">chevron_left</span>
                </button>
            </div>
            <div className="gallery-nav gallery-nav-right">
                <button 
                    className="gallery-nav-button" 
                    onClick={handleNext}
                    aria-label="Next slide"
                >
                    <span className="material-symbols-outlined">chevron_right</span>
                </button>
            </div>

            {/* Slide indicators/dots */}
            <div className="gallery-indicators">
                {gallerySlides.map((_, index) => (
                    <button
                        key={index}
                        className={`gallery-indicator-dot ${activeDotIndex === index ? 'active' : ''}`}
                        onClick={() => handleDotClick(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    ></button>
                ))}
            </div>
        </section>
    );
};

export default Gallery;
