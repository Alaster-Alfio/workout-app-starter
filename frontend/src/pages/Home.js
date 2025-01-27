import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext();

    useEffect(() => {
        const fetchWorkouts = async () => {
            const token = localStorage.getItem("jwt");
            if (!token) {
                console.error("No token found.");
                return;
            }

            try {
                const response = await fetch("/api/workouts", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    dispatch({ type: "SET_WORKOUTS", payload: data });
                } else {
                    console.error("Failed to fetch workouts.");
                }
            } catch (error) {
                console.error("Error fetching workouts:", error.message);
            }
        };

        fetchWorkouts();
    }, [dispatch]);

    console.log("Rendering Home Page");
    console.log("Workouts: ", workouts);

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
