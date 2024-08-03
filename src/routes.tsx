import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import { Auth, Home, WebCam } from "./pages";

class RouteHandler {
  static homePage: string = "/";
  static authPage: string = "/auth";
  static camPage: string = "/web-cam";
  static notFoundPage: string = "*";
}

export const routes = createBrowserRouter([
  {
    path: RouteHandler.homePage,
    element: <Layout />,
    errorElement: <div>Error Page</div>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: RouteHandler.authPage,
        element: <Auth />,
      },
      {
        path: RouteHandler.camPage,
        element: <WebCam />,
      },
      {
        path: RouteHandler.notFoundPage,
        element: <div>Not Found Page</div>,
      },
    ],
  },
]);
