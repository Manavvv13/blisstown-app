import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
    const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Auto-close mobile menu on route change
        setMobileMenuOpen(false);
    }, [location]);

    const isHome = location.pathname === '/';

    const handleHomeClick = (e) => {
        if (isHome) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* Floating Logo - Top Left */}
            <div className="floating-logo">
                <Link to="/" onClick={handleHomeClick} style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="/logo.png" alt="Blisstown Logo" className="floating-logo-img" />
                </Link>
            </div>

            {/* Floating Navbar Pill - Centered */}
            <header className={`header ${scrolled ? 'header--scrolled' : ''} ${mobileMenuOpen ? 'header--mobile-open' : ''}`}>
                <nav className="header__nav">
                    {/* Hamburger menu for mobile */}
                    <button 
                        className="header__hamburger" 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className="material-symbols-outlined">
                            {mobileMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>

                    <div className="header__links">
                        <Link 
                            className={`header__link ${isHome ? 'header__link--active' : ''}`} 
                            to="/" 
                            onClick={handleHomeClick}
                        >
                            Home
                        </Link>
                        
                        {/* About Us Dropdown */}
                        <div 
                            className="header__dropdown-container"
                            onMouseEnter={() => setAboutDropdownOpen(true)}
                            onMouseLeave={() => setAboutDropdownOpen(false)}
                        >
                            <button 
                                className={`header__link header__dropdown-trigger ${
                                    ['/about-us', '/chairman-message', '/management-team', '/quality-policy', '/safety-policy'].includes(location.pathname) 
                                    ? 'header__link--active' 
                                    : ''
                                }`}
                            >
                                About Bliss Town <span className="dropdown-arrow">▼</span>
                            </button>
                            
                            {aboutDropdownOpen && (
                                <div className="header__dropdown-menu glass-panel-heavy">
                                    <Link className="header__dropdown-item" to="/about-us">
                                        About Us
                                    </Link>
                                    <Link className="header__dropdown-item" to="/chairman-message">
                                        Chairman Message
                                    </Link>
                                    <Link className="header__dropdown-item" to="/management-team">
                                        Management Team
                                    </Link>
                                    <Link className="header__dropdown-item" to="/quality-policy">
                                        Quality Policy
                                    </Link>
                                    <Link className="header__dropdown-item" to="/safety-policy">
                                        Safety Policy
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Projects Dropdown */}
                        <div 
                            className="header__dropdown-container"
                            onMouseEnter={() => setProjectDropdownOpen(true)}
                            onMouseLeave={() => setProjectDropdownOpen(false)}
                        >
                            <button 
                                className={`header__link header__dropdown-trigger ${
                                    location.pathname === '/project' ? 'header__link--active' : ''
                                }`}
                            >
                                Projects <span className="dropdown-arrow">▼</span>
                            </button>
                            
                            {projectDropdownOpen && (
                                <div className="header__dropdown-menu glass-panel-heavy">
                                    <Link className="header__dropdown-item" to="/project">
                                        JMDR Arihant Green
                                    </Link>
                                </div>
                            )}
                        </div>

                        <Link 
                            className={`header__link header__link--mobile-only ${location.pathname === '/contact' ? 'header__link--active' : ''}`} 
                            to="/contact"
                        >
                            Contact
                        </Link>
                    </div>
                </nav>
            </header>

            {/* Floating CTA - Top Right */}
            <div className="floating-action">
                <Link className="floating-button" to="/contact" style={{ display: 'inline-block', textDecoration: 'none', textAlign: 'center' }}>
                    Contact
                </Link>
            </div>
        </>
    );
};

export default Header;
