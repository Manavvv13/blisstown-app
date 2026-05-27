import React, { useEffect, useRef, useState } from 'react';
import './Stats.css';

const CountUp = ({ end, duration = 1500, isVisible }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        if (!isVisible) return;
        
        const endNum = parseInt(end);
        if (isNaN(endNum)) return;
        
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Ease out quad
            const easeProgress = progress * (2 - progress);
            setCount(Math.floor(easeProgress * endNum));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                setCount(endNum);
            }
        };
        window.requestAnimationFrame(step);
    }, [end, duration, isVisible]);
    
    return <>{count}</>;
};

const Stats = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (sectionRef.current) observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    return (
        <section className="stats" ref={sectionRef}>
            <div className="stats__container">
                <div className={`stats__item ${isVisible ? 'stats__item--visible' : ''}`} style={{ transitionDelay: '0s' }}>
                    <div className="stats__number">
                        <CountUp end={25} isVisible={isVisible} />+
                    </div>
                    <div className="stats__label">Years of Trust</div>
                </div>
                <div className={`stats__item ${isVisible ? 'stats__item--visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
                    <div className="stats__number">
                        <CountUp end={5000} isVisible={isVisible} />+
                    </div>
                    <div className="stats__label">Happy Families</div>
                </div>
                <div className={`stats__item ${isVisible ? 'stats__item--visible' : ''}`} style={{ transitionDelay: '0.4s' }}>
                    <div className="stats__number">
                        <CountUp end={1200} isVisible={isVisible} />+
                    </div>
                    <div className="stats__label">Acres Developed</div>
                </div>
            </div>
        </section>
    );
};

export default Stats;
