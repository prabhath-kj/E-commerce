import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddProductModal = ({ onClose }) => {
  const [previewImages, setPreviewImages] = useState([]);
  const [imageError, setImageError] = useState(null);
  const categories = ["Laptop", "Tablets", "HeadPhones"];

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
      .min(1, "At least one image is required")
      .max(3, "Only up to 3 images allowed"),
  });

  const onSubmit = (values) => {
    alert(values);
    console.log("Form submitted with values:", values);
    // Customize this function to make an API call to the backend with the form data
    // apiCall(values).then(() => {
    //   onClose();
    // });
  };

  const handleImageChange = (event) => {
    const files = event.target.files;

    if (files.length > 3) {
      setImageError("Only up to 3 images are allowed");
    } else {
      setImageError(null);

      setPreviewImages([]);
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewImages((prevImages) => [...prevImages, e.target.result]);
        };
        reader.readAsDataURL(file);
      });
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
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
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
                  Add
                </button>
                <button
                  type="button"
                  className="bg-gray-300  text-red-500 background-transparent font-bold uppercase rounded px-6 py-3 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  onClick={onClose}
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
