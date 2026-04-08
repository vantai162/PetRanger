import mongoose from "mongoose";

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

const orderItemSchema = new mongoose.Schema(
  {
    // một item có thể là product hoặc pet — không bắt buộc cả hai
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    pet_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
    },
    name:       { type: String, required: true }, // snapshot tên lúc mua
    qty:        { type: Number, required: true, min: 1, default: 1 },
    unit_price: { type: Number, required: true }, // snapshot giá lúc mua
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    items: {
      type: [orderItemSchema],
      validate: {
        validator: (arr) => arr.length > 0,
        message: "Order phải có ít nhất 1 sản phẩm",
      },
    },
    total_amount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "paid", "delivered", "cancelled"],
      default: "pending",
    },
    payment_method: { type: String }, // "cash", "momo", "banking"
    shipping_address: {
      type: addressSchema
    },
    notes: { type: String },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

orderSchema.index({ customer_id: 1, status: 1 });

export default mongoose.model("Order", orderSchema);