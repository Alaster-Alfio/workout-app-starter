const fetchWorkouts = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
        console.error("User not authenticated.");
        return;
    }

    try {
        const response = await fetch("/api/workouts", {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
            const data = await response.json();
            context.setWorkouts(data);
        } else {
            console.error("Failed to fetch workouts:", response.statusText);
        }
    } catch (err) {
        console.error("Error fetching workouts:", err);
    }
};
