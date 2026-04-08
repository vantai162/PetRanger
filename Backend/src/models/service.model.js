import mongoose, {Schema} from "mongoose";

const serviceSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {  
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    duration_minutes: {
        type: Number,
        required: true,
        min: 0
    },
    type: {
        type: String,
        enum: ['grooming', 'training', 'boarding', 'vet'],
        required: true
    },
    images:       [{ type: String }]
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

serviceSchema.index({ type: 1});

export default mongoose.model("Service", serviceSchema);