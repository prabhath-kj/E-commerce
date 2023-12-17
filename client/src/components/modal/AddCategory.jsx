import React from "react";
import { useFormik } from "formik";
import productApi from "../../api/productApi";
import { toast } from "react-toastify";
import {useDispatch} from "react-redux"
import { addCategory } from "../../redux/slices/categorySlice";
import * as Yup from "yup";

const AddCategoryModal = ({ onClose }) => {
  const dispatch =useDispatch()

  const validationSchema = Yup.object().shape({
    categoryName: Yup.string().required("Category Name is required"),
  });

  const onSubmit = async (values) => {
    try {
      const {data,message} = await productApi.addCategory(values);
      dispatch(addCategory(data))
      toast.success(message);
      onClose();
    } catch (error) {
      toast.error("Failed to add category. Please try again.");
      console.error("API error:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      categoryName: "",
      // Add initial values for other form fields if needed
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
              Add Category
            </div>
            {/*body*/}
            <form onSubmit={formik.handleSubmit}>
              <div className="relative p-6 flex-auto">
                <div className="mb-4">
                  <label
                    htmlFor="categoryName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category Name
                  </label>
                  <input
                    type="text"
                    id="categoryName"
                    name="categoryName"
                    className="mt-1 p-2 border rounded-md w-full"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.categoryName}
                  />
                  {formik.touched.categoryName &&
                    formik.errors.categoryName && (
                      <div className="text-red-500">
                        {formik.errors.categoryName}
                      </div>
                    )}
                </div>
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
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default AddCategoryModal;
