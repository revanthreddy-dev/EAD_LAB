import { useState } from "react";
import "./PasswordStrength.css";

const getStrength = (password) => {
    if (!password) return "Enter a password";
    if (password.length < 8) return "Weak";

    if (/[A-Z]/.test(password) && /\d/.test(password) && /[^A-Za-z0-9]/.test(password)) {
        return "Strong";
    }

    return "Medium";
};

const PasswordStrength = () => {
    const [password, setPassword] = useState("");

    const handleChange = (e) => {
        setPassword(e.target.value);
    };

    const strength = getStrength(password);
    const strengthClass = strength === "Enter a password" ? "enter-password" : strength.toLowerCase();

    return (
        <div className="password-container">
            <div className="password-card">
                <h1>Password Strength Checker</h1>
                <div className="input-wrapper">
                    <input
                        type="password"
                        placeholder="Enter a password"
                        value={password}
                        onChange={handleChange}
                    />
                </div>
                <div className={`strength-result ${strengthClass}`}>
                    {strength}
                </div>
                <p className="strength-hint">
                    {password ? (
                        <>
                            <strong>Requirements:</strong> 8+ characters, 1 uppercase, 1 number, 1 special character
                        </>
                    ) : (
                        "Create a strong password to keep your account secure"
                    )}
                </p>
            </div>
        </div>
    );
};

export default PasswordStrength;