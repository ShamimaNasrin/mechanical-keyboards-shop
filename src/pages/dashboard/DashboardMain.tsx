import { useState } from "react";
import toast from "react-hot-toast";
import ProductForm from "./AddProductModal";
import { AiOutlineEdit } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import ConfirmationModal from "./ConfirmationModal";

type TProduct = {
  id: number;
  name: string;
  price: number;
  brand: string;
  description: string;
  stock_quantity: number;
  rating: number;
  img_url: string;
};

const DashboardMain: React.FC = () => {
  const [products, setProducts] = useState<TProduct[]>([
    // Example product
    {
      id: 1,
      name: "Mechanical Keyboard",
      price: 99,
      brand: "Keychron",
      description: "A great mechanical keyboard.",
      stock_quantity: 10,
      rating: 4,
      img_url: "https://example.com/image.jpg",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);

  const handleAddProduct = (newProduct: TProduct) => {
    setProducts([...products, newProduct]);
    setShowAddModal(false);
    toast.success("Product added successfully!");
    console.log("Product added:", newProduct);
  };

  const handleUpdateProduct = (updatedProduct: TProduct) => {
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setShowUpdateModal(false);
    toast.success("Product updated successfully!");
    console.log("Product added:", updatedProduct);
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
    setShowDeleteModal(false);
    toast.success("Product deleted successfully!");
  };

  // console.log("Product all", products);

  return (
    <div className="min-h-[70vh] xl:py-12 lg:py-10 py-7 xl:px-16 lg:px-16 md:px-10 px-7 bg-zinc-100">
      <h1 className="text-3xl font-bold mb-6">Product Dashboard</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-black text-white px-4 py-2 rounded-none hover:bg-gray-700 transition"
        >
          Add Product
        </button>
      </div>
      <table className="mx-auto xl:w-[80%] lg:w-[80%] md:w-[70%] w-full text-left table-auto border-collapse">
        <thead>
          <tr>
            <th className="border-b border-gray-700 px-2 py-4">Name</th>
            <th className="border-b border-gray-700 px-2 py-4">Price</th>
            <th className="border-b border-gray-700 px-2 py-4">Brand</th>
            <th className="border-b border-gray-700 px-2 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border-b border-gray-800 px-2 py-4">
                {product.name}
              </td>
              <td className="border-b border-gray-800 px-2 py-4">
                TK.{product.price}
              </td>
              <td className="border-b border-gray-800 px-2 py-4">
                {product.brand}
              </td>
              <td className="border-b border-gray-800 px-2 py-4">
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowUpdateModal(true);
                  }}
                  className="mr-2 text-lg"
                >
                  <AiOutlineEdit />
                </button>
                <button
                  onClick={() => {
                    // setSelectedProduct(product);
                    setShowDeleteModal(true);
                  }}
                  className="text-lg text-red-600"
                >
                  <FiTrash2 />
                </button>

                <ConfirmationModal
                  isOpen={showDeleteModal}
                  onClose={() => setShowDeleteModal(false)}
                  onConfirm={() => handleDeleteProduct(product.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddModal && (
        <ProductForm
          setCloseModal={setShowAddModal}
          onSubmit={handleAddProduct}
          isUpdating={false}
        />
      )}

      {showUpdateModal && selectedProduct && (
        <ProductForm
          setCloseModal={setShowUpdateModal}
          onSubmit={handleUpdateProduct}
          isUpdating={true}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default DashboardMain;
