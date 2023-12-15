import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quntity: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
});

const Product = model("Product", productSchema);

export default Product;
