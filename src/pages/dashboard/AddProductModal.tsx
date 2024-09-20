/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

interface ProductFormProps {
  setCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (product: any) => void;
  isUpdating: boolean;
  product?: any;
}

const ProductForm: React.FC<ProductFormProps> = ({
  setCloseModal,
  onSubmit,
  isUpdating,
  product,
}) => {
  const [formData, setFormData] = useState({
    id: product?.id || Date.now(),
    name: product?.name || "",
    price: product?.price || "",
    brand: product?.brand || "",
    description: product?.description || "",
    stock_quantity: product?.stock_quantity || "",
    rating: product?.rating || 0,
    img_url: product?.img_url || "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Ensure stock quantity is a non-fractional number
    if (name === "stock_quantity" && !Number.isInteger(Number(value))) {
      setErrorMessage("Stock quantity must be a whole number");
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
    setErrorMessage("");
  };

  const handleStarClick = (rating: number) => {
    setFormData({
      ...formData,
      rating,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.rating < 1 || formData.rating > 5) {
      setErrorMessage("Rating must be between 1 and 5 stars");
      return;
    }

    onSubmit(formData);
    setCloseModal(false);
  };

  //   console.log("formData", formData);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-7 w-[500px] max-h-[75vh] overflow-y-auto rounded-none relative">
        <button
          onClick={() => setCloseModal(false)}
          className="absolute right-2 top-2 text-white bg-black hover:bg-gray-700 px-2 py-1"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold text-black text-center mb-6">
          {isUpdating ? "Update Product" : "Add Product"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full p-3 mb-4 border border-gray-300 rounded-none"
            required
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-3 mb-4 border border-gray-300 rounded-none"
            required
            min="0"
          />
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="w-full p-3 mb-4 border border-gray-300 rounded-none"
            required
          />

          <input
            type="text"
            name="img_url"
            value={formData.img_url}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full p-3 mb-4 border border-gray-300 rounded-none"
            required
          />
          <input
            type="number"
            name="stock_quantity"
            value={formData.stock_quantity || ""}
            onChange={handleChange}
            placeholder="Available Quantity"
            className="w-full p-3 mb-4 border border-gray-300 rounded-none"
            required
            step="1"
            min="0"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-3 mb-4 border border-gray-300 rounded-none"
            required
          />
          <div className="w-full p-3 mb-6">
            <p className="mb-2">Rating:</p>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer text-2xl ${
                    formData.rating >= star
                      ? "text-yellow-500"
                      : "text-gray-400"
                  }`}
                  onClick={() => handleStarClick(star)}
                />
              ))}
            </div>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded-none hover:bg-gray-700 transition"
            disabled={
              !formData.name ||
              !formData.price ||
              !formData.brand ||
              !formData.description ||
              !formData.img_url ||
              !formData.stock_quantity ||
              formData.rating === 0 ||
              errorMessage !== ""
            }
          >
            {isUpdating ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
