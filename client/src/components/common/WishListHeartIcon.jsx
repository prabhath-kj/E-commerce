import { HeartIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { updateWishlist } from "../../redux/slices/authSlice";
import productApi from "../../api/productApi";
import { toast } from "react-toastify";

const WishlistHeartIcon = ({ id }) => {
  const dispatch = useDispatch();

  const productInWishlist = Boolean(
    useSelector((state) =>
      state?.auth?.user?.wishlist.find((product) => product._id === id)
    )
  );
                    

  const handleClick = async () => {
    try {
      const { user, message } = await productApi.modifyWishlist(id);
      dispatch(updateWishlist(user));
      toast.success(message);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <HeartIcon
        className={`w-6 h-6 px-1 bg-blue-300 rounded-full ${
            productInWishlist ? "text-red-600" : "text-base"
        }`}
      />
    </div>
  );
};

export default WishlistHeartIcon;
