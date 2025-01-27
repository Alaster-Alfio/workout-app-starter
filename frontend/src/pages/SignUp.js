import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/api/user/signup`,
            {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        } else {
            localStorage.setItem("jwt", json.token);
            navigate("/");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button>Sign Up</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default SignUp;
