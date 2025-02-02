import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useNavigate } from "react-router-dom";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("jwt");

        if (!token) {
            navigate("/login"); // Redirect to login page if no token
            return;
        }

        const fetchWorkouts = async () => {
            try {
                const response = await fetch("/api/workouts", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const json = await response.json();
                    dispatch({ type: "SET_WORKOUTS", payload: json });
                } else {
                    throw new Error("Failed to fetch workouts");
                }
            } catch (error) {
                console.error("Error fetching workouts:", error);
            }
        };

        fetchWorkouts();
    }, [dispatch, navigate]);

    return (
        <div className="home">
            <div className="workouts">
                {workouts &&
                    workouts.map((workout) => (
                        <WorkoutDetails key={workout._id} workout={workout} />
                    ))}
            </div>
            <WorkoutForm />
        </div>
    );
};

export default Home;
