import { Schema, model,Types } from "mongoose";

const subCategorySchema = new Schema({
  subcategoryName: {
    type: String,
    required: true,
    unique: true,
    lowercase:true,
  },
  category: {
    type: Types.ObjectId,
    ref: 'Category',
    required: true,
  },
});

const SubCategory = model('SubCategory', subCategorySchema);

export default SubCategory;
