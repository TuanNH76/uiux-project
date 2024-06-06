import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import kpiImage from '../../images/KPI.webp'; // Adjust the path as necessary
import googleImage from '../../images/Google__G__logo.svg.png';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        // Handle login logic here
        navigate('/app/dashboard');
    };

    return (
        <div className="landing-page">
            <div className="image-section">
                <img src={kpiImage} alt="KPI" />
            </div>
            <div className="form-section">
                <h1>Nice to see you again</h1>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <div className="form-options">
                        <div>
                            <input type="checkbox" id="remember" name="remember" />
                            <label clasName="checkbox" htmlFor="remember">Remember me</label>
                        </div>
                        <a href="#forgot-password" className="link">Forgot password?</a>
                    </div>
                    <button type="submit" className="cta-button">Sign In</button>
                    <div className="separator"></div> {/* Separator line */}
                    <button type="button" className="google-button">
                        <img src={googleImage} alt="Google Icon" />
                        Or sign in with Google
                    </button>
                    <p style={{ textAlign: "center" }}>Don't have an account? <a href="#signup" className="link">Sign up now</a></p>
                </form>
            </div>
        </div>
    );
};

export default LandingPage;
