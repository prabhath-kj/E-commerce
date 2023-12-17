import React, { useState } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import productApi from "../../api/productApi";
import { setSubCategory } from "../../redux/slices/categorySlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useEffect } from "react";

const AddProductModal = ({ onClose }) => {
  const dispatch =useDispatch()
  const [previewImages, setPreviewImages] = useState([]);
  const [images, setImages] = useState([]);
  const [imageError, setImageError] = useState(null);
  const Subcategories = useSelector((state) => state.categories.subCategory);
  const [isAddingProduct, setIsAddingProduct] = useState(false); // New state for loading

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive"),
    quantity: Yup.number()
      .required("Quantity is required")
      .positive("Quantity must be positive")
      .integer("Quantity must be an integer"),
    subcategoryId: Yup.string().required("Subcategory is required"),
    description: Yup.string().required("Description is required"),
    images: Yup.array()
      .required("Please provide image")
      .max(3, "Only up to 3 images allowed"),
  });

  const onSubmit = async (values) => {
    try {
      setIsAddingProduct(true);
      // Create a new FormData object
      const formData = new FormData();

      // Append form data to the FormData object
      formData.append("title", values.title);
      formData.append("price", values.price);
      formData.append("quantity", values.quantity);
      formData.append("subcategoryId", values.subcategoryId);
      formData.append("description", values.description);

      // Append each image file to the FormData object
      images.forEach((image) => {
        formData.append(`images`, image);
      });

      try {
        const response = await productApi.addProduct(formData);
        console.log(response);
        toast.success("Product added successfully");
        onClose();
      } catch (error) {
        toast.error("Failed to add Product. Please try again.");
        console.error("API error:", error);
      }

      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsAddingProduct(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      quantity: "",
      subcategoryId: "",
      description: "",
      images: [],
    },
    validationSchema,
    onSubmit,
  });

  const handleImageChange = (event) => {
    const files = event.target.files;

    if (files.length > 3) {
      setImageError("Only up to 3 images are allowed");
    } else {
      setImageError(null);

      setPreviewImages([]);

      Array.from(files).forEach((file) => {
        setImages((prev) => [...prev, file]);
        const reader = new FileReader();

        reader.onload = (e) => {
          setPreviewImages((prevImages) => [...prevImages, e.target.result]);
        };
        reader.readAsDataURL(file);
        formik.setFieldValue("images", [...formik.values.images, file]);
      });
    }
  };

  const fetchAllSubcategories = async () => {
    try {
      const response = await productApi.fetchAllSubCategories();
      dispatch(setSubCategory(response));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };


useEffect(() => {
  fetchAllSubcategories()
}, [])

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-center p-5 border-b border-solid border-blueGray-200 rounded-t">
              Add Product
            </div>
            {/*body*/}
            <form onSubmit={formik.handleSubmit}>
              <div className="relative p-6 flex-auto flex flex-wrap">
                <div className="w-full lg:w-1/2 pr-4">
                  <div className="mb-4">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.title}
                      className="mt-1 p-2 border rounded-md w-full"
                    />
                    {formik.touched.title && formik.errors.title && (
                      <div className="text-red-500">{formik.errors.title}</div>
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-1/4 pr-4">
                  <div className="mb-4">
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.price}
                      className="mt-1 p-2 border rounded-md w-full"
                    />
                    {formik.touched.price && formik.errors.price && (
                      <div className="text-red-500">{formik.errors.price}</div>
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-1/4">
                  <div className="mb-4">
                    <label
                      htmlFor="quantity"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Quantity
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.quantity}
                      className="mt-1 p-2 border rounded-md w-full"
                    />
                    {formik.touched.quantity && formik.errors.quantity && (
                      <div className="text-red-500">
                        {formik.errors.quantity}
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full mb-4">
                  <label
                    htmlFor="subcategoryId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Subcategory
                  </label>
                  <select
                    id="subcategoryId"
                    name="subcategoryId"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.subcategoryId}
                    className="mt-1 p-2 border rounded-md w-full"
                  >
                    <option value="" label="Select a subcategory" />
                    {Subcategories.map(({ subcategoryName, _id }) => (
                      <option key={_id} value={_id}>
                        {subcategoryName}
                      </option>
                    ))}
                  </select>
                  {formik.touched.subcategoryId &&
                    formik.errors.subcategoryId && (
                      <div className="text-red-500">
                        {formik.errors.subcategoryId}
                      </div>
                    )}
                </div>
                <div className="w-full mb-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                  {formik.touched.description && formik.errors.description && (
                    <div className="text-red-500">
                      {formik.errors.description}
                    </div>
                  )}
                </div>
                <div className="w-full mb-4">
                  <label
                    htmlFor="images"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Images (Up to 3)
                  </label>
                  <input
                    type="file"
                    id="images"
                    name="images"
                    accept="image/*"
                    onChange={handleImageChange}
                    multiple
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                  {imageError && (
                    <div className="text-red-500">{imageError}</div>
                  )}
                </div>
                {previewImages.length > 0 && (
                  <div className="w-full mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Image Preview
                    </label>
                    <div className="flex space-x-2">
                      {previewImages.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Preview ${index + 1}`}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      ))}
                    </div>
                  </div>
                )}
                {/* Add more form fields as needed */}
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  type="submit"
                  className="bg-orange-400 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  {isAddingProduct ? "Adding..." : "Add"}
                </button>
                <button
                  type="button"
                  className="bg-gray-300  text-red-500 background-transparent font-bold uppercase rounded px-6 py-3 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  onClick={onClose}
                  disabled={isAddingProduct}
                >
                  Discard
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProductModal;
