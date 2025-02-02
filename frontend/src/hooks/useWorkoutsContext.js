const fetchWorkouts = async () => {
    const token = localStorage.getItem("jwt"); // Get JWT token
    if (!token) return;

    try {
        const response = await fetch("/api/workouts", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`, // Send JWT token in header
            },
        });

        if (response.ok) {
            const data = await response.json();
            context.setWorkouts(data);
        }
    } catch (error) {
        console.error("Error fetching workouts:", error);
    }
};
