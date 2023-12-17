// SignUp.js
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../redux/slices/authSlice";
import { useEffect } from "react";
import authApi from "../../api/authApi";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const SignUp = () => {
  const dispatch = useDispatch();
  const router = useNavigate();
  const isAuth = Boolean(useSelector((state) => state?.auth?.token));

  const initialValues = {
    email: "",
    username: "",
    password: "",
  };

  useEffect(() => {
    isAuth ? router("/") : router("/signup");
  }, [isAuth]);

  const handleSubmit = async (values) => {
    try {
      const { message, token, user } = await authApi.signup(values);
      dispatch(
        setLogin({
          user: user,
          token: token,
        })
      );
      toast.success(message);
    } catch (err) {
        toast.error("Please Sign Up first");
    }
  };

  return (
    <div>
      <section className="min-h-screen flex items-stretch text-white bg-slate-50 ">
        <div className="lg:flex w-1/2 hidden bg-sky-950 bg-no-repeat bg-cover relative items-center">
          <div className="w-full px-24 z-10">
            <h1 className="text-5xl font-bold text-left tracking-wide">
              Welcome Back!
            </h1>
            <p className="text-xl my-4">To keep connected with us </p>
            <p className="text-xl">please login with your personal info</p>
            <button
              type="submit"
              className="mt-2 block px-5 py-2 text-lg rounded-full bg-orange-400 hover:bg-orange-500 focus:outline-none uppercase"
            >
              <Link to={"/login"}> sign in</Link>
            </button>
          </div>
        </div>
        <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0">
          <div className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"></div>

          <div className="w-full py-6 z-20">
            <h1 className="text-orange-400 font-extrabold text-3xl">
              Create Your Account
            </h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form action="" className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
                <div className="pt-4">
                  <Field
                    type="email"
                    autoComplete="off"
                    name="email"
                    placeholder="Email"
                    className="block w-full p-2 text-base text-black rounded-sm bg-slate-100"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="pt-4">
                  <Field
                    type="text"
                    autoComplete="off"
                    name="username"
                    placeholder="Username"
                    className="block w-full p-2 text-base text-black rounded-sm bg-slate-100"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="pt-4">
                  <Field
                    type="password"
                    autoComplete="off"
                    name="password"
                    placeholder="Password"
                    className="block w-full p-2 text-base text-black rounded-sm bg-slate-100"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="px-4 pb-2 pt-4">
                  <button
                    type="submit"
                    className="block w-full px-4 py-2 text-md rounded-full bg-orange-400 hover:bg-orange-500 focus:outline-none"
                  >
                    Sign Up
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
