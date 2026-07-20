import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css";

const Login = () => {

    const navigate = useNavigate();

    const {
        login,
        isAuthenticated
    } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {

        if (isAuthenticated) {
            navigate("/");
        }

    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setError("");

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.email.trim()) {
            setError("Email is required.");
            return;
        }

        if (!formData.password.trim()) {
            setError("Password is required.");
            return;
        }

        try {

            setLoading(true);

            await login(formData);

            navigate("/");

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Invalid email or password."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-container">

            <div className="login-card">

                <h1>Fleet Tracker</h1>

                <p>Sign in to your account</p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <div className="password-container">

                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            name="password"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                        >

                            {showPassword ? "Hide" : "Show"}

                        </button>

                    </div>

                    {error && (

                        <div className="login-error">

                            {error}

                        </div>

                    )}

                    <button
                        className="login-btn"
                        type="submit"
                        disabled={loading}
                    >

                        {

                            loading
                                ? "Signing In..."
                                : "Login"

                        }

                    </button>

                </form>

                <div className="register-link">

                    Don't have an account?

                    <Link to="/register">

                        Register

                    </Link>

                </div>

            </div>

        </div>

    );

};

export default Login;