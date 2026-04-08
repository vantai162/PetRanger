import mongoose, {Schema} from "mongoose";

const vaccinationSchema = new Schema({
    vaccine_name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    due: {
        type: Date,
        required: true
    }
}, { _id: false });

const petSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 0
    },
    gender: {
        type: String,
        enum: ['male', 'female','binary'],
        required: true
    },
    color: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    arrived_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'sold', 'pending'],
        default: 'available'
    },
    vaccinations: [vaccinationSchema],
    images:       [{ type: String }],
    description:  { type: String },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

// Index để filter nhanh theo species và status
petSchema.index({ species: 1, status: 1 });

export default mongoose.model("Pet", petSchema);