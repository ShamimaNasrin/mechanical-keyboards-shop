import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductForm from "./AddProductModal";
import { AiOutlineEdit } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import ConfirmationModal from "./ConfirmationModal";
import useTitle from "../../customHooks/useTitle";
import { IProduct, TProduct } from "../../types";
import {
  useFetchAllProductsQuery,
  useAddProductMutation,
  useRemoveProductMutation,
  useUpdateProductMutation,
} from "../../redux/api/baseApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import NoDataFound from "../../components/NoDataFound";

const headings = ["Name", "Price", "Brand", "Actions"];

const DashboardMain: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);

  const { data, isLoading } = useFetchAllProductsQuery({});
  const [addProduct] = useAddProductMutation();
  const [deleteProduct] = useRemoveProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  // console.log("dashboard data:", data);

  const handleAddProduct = async (newProduct: TProduct) => {
    // console.log("Product added:", newProduct);

    try {
      const res = await addProduct(newProduct).unwrap();
      if (res?.success) {
        console.log("add res:", res?.message);
        toast.success("Product added successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to Add product");
    }

    setShowAddModal(false);
  };

  const handleUpdateProduct = async (updatedProduct: IProduct) => {
    // console.log("Product updated:", updatedProduct);
    const productId = updatedProduct._id;
    try {
      const res = await updateProduct({
        productId,
        data: updatedProduct,
      }).unwrap();
      if (res?.success) {
        console.log("update res:", res?.message);
        toast.success("Product updated successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product");
    }
    setShowUpdateModal(false);
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const res = await deleteProduct(id).unwrap();
      if (res?.success) {
        console.log("delete res:", res?.message);
        toast.success("Product deleted successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to Delete product");
    }
    setShowDeleteModal(false);
  };

  //scrolltop
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useTitle("Dashboard");

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
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <table className="mx-auto xl:w-[80%] lg:w-[80%] md:w-[70%] w-full text-left table-auto border-collapse">
          <thead>
            <tr>
              {headings.map((h, i) => (
                <th key={i} className="border-b border-gray-700 px-2 py-4">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.data?.length ? (
              data?.data?.map((product: TProduct) => (
                <tr key={product._id}>
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
                      onConfirm={() => handleDeleteProduct(product._id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <NoDataFound />
            )}
          </tbody>
        </table>
      )}

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
