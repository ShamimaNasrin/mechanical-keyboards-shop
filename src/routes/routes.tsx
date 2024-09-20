import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/about/About";
import ContactMain from "../pages/contact/ContactMain";
import HomeMain from "../pages/homePage/HomeMain";
import ProductsMain from "../pages/productsPage/ProductsMain";
import CartMain from "../pages/cartPage/CartMain";
import CheckOutMain from "../pages/checkoutPage/CheckOutMain";
import DashboardMain from "../pages/dashboard/DashboardMain";
import NotFound from "../pages/notFound/NotFound";
import FaqsMain from "../pages/faqs/FaqsMain";
import ProductDetails from "../pages/productDetails/ProductDetails";

type TProduct = {
  name: string;
  img_url: string;
  brand: string;
  stock_quantity: number;
  price: number;
  rating: number;
  description: string;
};

const sampleProduct: TProduct = {
  name: "Awekeys Mechanical Keyboard Moon Landing [GB]",
  img_url: "https://i.ibb.co.com/BP8BKZf/moon-landing-15.webp",
  brand: "Awekeys",
  stock_quantity: 4,
  price: 2800,
  rating: 3,
  description:
    "A limited edition mechanical keyboard inspired by the moon landing. Features tactile switches, customizable RGB lighting, and a unique design.",
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomeMain />,
      },
      {
        path: "home",
        element: <HomeMain />,
      },
      {
        path: "products",
        element: <ProductsMain />,
      },
      {
        path: "productDetails",
        element: (
          <div>
            <ProductDetails product={sampleProduct} />
          </div>
        ),
      },
      // {
      //   path: '/servicedetails/:serviceid',
      //   element: <ServiceDetails></ServiceDetails>,
      //   loader: ({ params }) => fetch(`https://dentist-server.vercel.app/services/${params.serviceid}`)
      // },
      {
        path: "cart",
        element: <CartMain />,
      },
      {
        path: "checkout",
        element: <CheckOutMain />,
      },
      {
        path: "dashboard",
        element: <DashboardMain />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <ContactMain />,
      },
      {
        path: "faqs",
        element: <FaqsMain />,
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
