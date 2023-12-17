import { useRouteError, Link } from "react-router-dom";
import OrangeButton from "../components/common/OrangeButton";

const ErrorElement = () => {
  const { error, isError, message } = useRouteError();
  return (
    <section className="">
      <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
        <div className="wf-ull lg:w-1/2">
          <p className="text-sm font-medium text-blue-500 dark:text-blue-400">
            {404}
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            {message}
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Sorry, the page you are looking for doesn't exist.Here are some
            helpful links:
          </p>

          <div className="flex items-center mt-6 gap-x-3">
            <OrangeButton setModalType={false}>
              <Link to={"/"}>Take me home</Link>
            </OrangeButton>
          </div>
        </div>

        <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
          <img
            className="w-full max-w-lg lg:mx-auto"
            src="https://merakiui.com/images/components/illustration.svg"
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default ErrorElement;
