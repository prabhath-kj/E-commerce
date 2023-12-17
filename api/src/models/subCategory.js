import { Schema, model } from "mongoose";

const subCategory = new Schema({
  subcategoryName: {
    type: String,
    required: true,
    unique: true,
    lowercase:true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
});

const SubCategorySchema = model('SubCategory', subCategory);

export default SubCategorySchema;
