import mongoose, {Schema} from "mongoose";

const appointmentSchema = new Schema({  
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true
    },
    pet_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet",
        required: true
    },
    appointment_date: {
        type: Date,
        required: true
    },
    end_at:  { type: Date },
    status: {
        type: String,
        enum: ['scheduled','confirmed','completed', 'cancelled'],
        default: 'scheduled'
    }, 
    notes: { type: String }
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });


appointmentSchema.index({ customer_id: 1, status: 1 });
appointmentSchema.index({ appointment_date: 1, status: 1 });

export default mongoose.model("Appointment", appointmentSchema);