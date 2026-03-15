import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { _id: false }, // impede criação de _id para cada imagem
);

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    neighborhood: { type: String, trim: true },
    address: { type: String, trim: true },

    images: {
      type: [imageSchema],
      default: [],
    },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model("Property", propertySchema);
