import { createBrowserRouter } from "react-router-dom";
import { BILL_PATH, HOME_PATH, LOGIN_URL, PRODUCT_PATH ,CATEGORY_PATH, USER_PATH} from "./urls";
import AppLayout from "./shared/AppLayout";
import Login from "./shared/Login";
import Product from "./pages/Product";
import Home from "./pages/Home";
import Bill from "./pages/Bill";
import Category from "./pages/Category";
import User from "./pages/User";


const routers = createBrowserRouter([
    {
      path: "",
      element: (
        <>
          {" "}
          <AppLayout />
        </>
      ),
      children: [
          {
            path: HOME_PATH,
            element: (
                <Home />
            ),
          },
          {
            path: BILL_PATH,
            element: (
                <Bill />
            ),
          },
          {
          path: PRODUCT_PATH,
          element: (
              <Product />
          ),
          },
          {
            path: CATEGORY_PATH,
            element: (
                <Category />
            ),
            },
            {
              path: USER_PATH,
              element: (
                  <User />
              ),
              },
      ],
    },
    {
      path: LOGIN_URL,
      element: <Login />,
    },
  ]);
  
  export default routers;