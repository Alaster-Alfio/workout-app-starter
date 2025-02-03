const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// get all workouts for this user
const getWorkouts = async (req, res) => {
    const userId = req.user._id;

    const workouts = await Workout.find({ user_id: userId }).sort({ createdAt: -1 });

    res.status(200).json(workouts);
};

// get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such workout' });
    }

    const workout = await Workout.findById(id);

    if (!workout) {
        return res.status(404).json({ error: 'no such workout' });
    }

    res.status(200).json(workout);
};

// create a workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body;
    const missingFields = [];

    if (!title) missingFields.push('title');
    if (!load) missingFields.push('load');
    if (!reps) missingFields.push('reps');

    if (missingFields.length > 0) {
        return res.status(400).json({ error: 'fill in all fields', missingFields });
    }

    try {
        const userId = req.user._id;
        const newWorkout = await Workout.create({ title, load, reps, user_id: userId });

        res.status(200).json(newWorkout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such workout' });
    }

    const deletedWorkout = await Workout.findOneAndDelete({ _id: id });

    if (!deletedWorkout) {
        return res.status(400).json({ error: 'no such workout' });
    }

    res.status(200).json(deletedWorkout);
};

// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such workout' });
    }

    const updatedWorkout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });

    if (!updatedWorkout) {
        return res.status(400).json({ error: 'no such workout' });
    }

    res.status(200).json(updatedWorkout);
};

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout,
};
