import { Schema, model } from "mongoose";

const subCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
});

const SubCategory = model('SubCategory', subCategorySchema);

export default SubCategory;
