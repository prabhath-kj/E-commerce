import React from "react";

const ProductDetails = () => {
  return (
    <div className="container mx-auto  flex">
      {/* Left Side: Product Images */}
      <div className="w-1/2  px-5 py-5 ">
        {/* Main Product Image */}
        <img
          src="https://lh3.googleusercontent.com/spp/AE_ITi2W0_VkYNWZYTpGpMl6uPt7OZiyaErMVZzoGZ7trbWk3YOM4vWjUjh5OZZ7xI564uAMtAZSKsN_rW9UFZs7o7MKqS8MNxiL4dYyldYNmw3N87M_4DcaJc3vltuOAJDcNi14YgIy_JDqAVndUodZ41cO6D8H2EMZrvXD3dxTMzfvZHBg7__cen_pFJ_FHvAiPBfVhsYGVEo=s512-rw-pd-pc0x00ffffff"
          alt="Main Product"
          className="w-full h-64 object-contain border border-black mb-4"
        />

        {/* Small Product Images */}
        <div className="flex ">
          <img
            src="https://lh3.googleusercontent.com/spp/AE_ITi2W0_VkYNWZYTpGpMl6uPt7OZiyaErMVZzoGZ7trbWk3YOM4vWjUjh5OZZ7xI564uAMtAZSKsN_rW9UFZs7o7MKqS8MNxiL4dYyldYNmw3N87M_4DcaJc3vltuOAJDcNi14YgIy_JDqAVndUodZ41cO6D8H2EMZrvXD3dxTMzfvZHBg7__cen_pFJ_FHvAiPBfVhsYGVEo=s512-rw-pd-pc0x00ffffff"
            alt="Small Product 1"
            className="w-1/2 h-28 object-contain mr-2 border border-black"
          />
          <img
            src="https://lh3.googleusercontent.com/spp/AE_ITi2W0_VkYNWZYTpGpMl6uPt7OZiyaErMVZzoGZ7trbWk3YOM4vWjUjh5OZZ7xI564uAMtAZSKsN_rW9UFZs7o7MKqS8MNxiL4dYyldYNmw3N87M_4DcaJc3vltuOAJDcNi14YgIy_JDqAVndUodZ41cO6D8H2EMZrvXD3dxTMzfvZHBg7__cen_pFJ_FHvAiPBfVhsYGVEo=s512-rw-pd-pc0x00ffffff"
            alt="Small Product 2"
            className="w-1/2 h-28 object-contain ml-2 border border-black"
          />
        </div>
      </div>

      {/* Right Side: Product Details */}
      <div className="w-1/2 px-8 py-5">
        <h1 className="text-3xl font-bold mb-4">Product Name</h1>
        <p className="text-gray-600 mb-4">Product Description goes here.</p>
        <div className="pt-4">
          <p className="text-gray-700">
            <span className="font-bold">Price:</span> $100
          </p>
          <p className="text-gray-700">
            <span className="font-bold">Quantity Available:</span> 50
          </p>
          {/* Add more details as needed */}
        </div>
        <div className=" border-t flex  items-center justify-between mb-4">
          {/* Edit Button */}
          <button className="bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-orange-500 m-1">
            Edit Product
          </button>

          <button className="bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-orange-500 m-1">
            Buy It Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
