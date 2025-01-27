import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("jwt");
        navigate("/login");
    };

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Workout Buddy</h1>
                </Link>
                <nav>
                    {localStorage.getItem("jwt") ? (
                        <button onClick={handleLogout}>Logout</button>
                    ) : (
                        <>
                            <Link to="/signup">Sign Up</Link>
                            <Link to="/login">Login</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
