import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("jwt"); // Check if user is logged in

    const handleLogout = () => {
        localStorage.removeItem("jwt"); // Remove token
        navigate("/login"); // Redirect to login page
    };

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Workout Buddy</h1>
                </Link>
                <nav>
                    {!token ? (
                        <>
                            <Link to="/signup">Sign Up</Link>
                            <Link to="/login">Login</Link>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="btn btn-outline-danger"
                        >
                            Logout
                        </button>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
