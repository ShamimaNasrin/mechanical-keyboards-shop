import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/about/About";
import ContactMain from "../pages/contact/ContactMain";
import HomeMain from "../pages/homePage/HomeMain";
import ProductsMain from "../pages/productsPage/ProductsMain";
import CartMain from "../pages/cartPage/CartMain";
import CheckOutMain from "../pages/checkoutPage/CheckOutMain";
import DashboardMain from "../pages/dashboard/DashboardMain";

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
    ],
  },
]);

export default router;
