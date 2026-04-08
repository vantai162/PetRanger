import mongoose, {Schema} from "mongoose";

const addressSchema = new Schema({
    street:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    }}, { _id: false }// không tạo _id riêng cho embedded object
);

const customerSchema = new Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // 1 user chỉ có 1 customer profile
    },
    address: {
        type: addressSchema
    },
    owned_pets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet",
      },
    ],
    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
    loyalty_points: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model("Customer", customerSchema);
