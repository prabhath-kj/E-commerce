import { Schema, model } from "mongoose";

const productSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  subcategoryId: {
    type: Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    default: [
      "https://t3.ftcdn.net/jpg/03/45/05/92/240_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg",
      "https://t3.ftcdn.net/jpg/03/45/05/92/240_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg",
      "https://t3.ftcdn.net/jpg/03/45/05/92/240_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg",
    ],
  },
});

const Product = model("Product", productSchema);

export default Product;
