const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
    {
        title: { type: String, required: true },
        reps: { type: Number, required: true },
        load: { type: Number, required: true },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        }, // Link to user
    },
    { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);
