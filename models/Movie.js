import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: {
        type: String, // Corrected from "string" to String
        required: true,
        maxLength: 100, // Increased maximum length to 100
        set: (value) => value.toLowerCase()
    },
    description: {
        type: String,
        required: true,
        maxLength: 500 // Increased maximum length to 500
    },
    actors: [{
        type: String,
        required: true
    }],
    releaseDate: {
        type: Date,
        required: true
    },
    posterUrl: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean // Corrected from "boolean" to Boolean
    },
    bookings: [{
        type: mongoose.Types.ObjectId,
        ref: "Bookings"
    }],
    admin: {
        type: mongoose.Types.ObjectId,
        ref: "Admin",
        required: true
    }
});

export default mongoose.model('Movie', movieSchema);
