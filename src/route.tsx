import React, { useEffect } from "react";
import { useRoutes, useNavigate, useSearchParams } from "react-router-dom";
import Home from "./home";
import MaterialInfo from "./pages/materialInfo";
import Performance from "./pages/performance";
// import Material from "./material";
import ProcessParams from "./pages/processParams";
import ProcessView from "./pages/processView";
import DevParams from "./pages/devParams";
import AdminPanel from "./pages/adminPanel";

function Routes() {
  // const [searchParams, setSearchParams] = useSearchParams();
  // let navigate = useNavigate();

  // function Redirect({ to }: any) {
  //   useEffect(() => {
  //     navigate(to);
  //   });
  //   return null;
  // }

  const routes = useRoutes([
    {
      path: "/",
      element: <Home/> ,
      children: [
        {
          path: '/adminPanel', //  
          element: <AdminPanel />,
        },
        {
          path: '/materialInfo',//  
          element: <MaterialInfo />,
        },
        {
          path: '/performance', //  
          element: <Performance />,
        },
        {
          path: '/ProcessParams', //  
          element: <ProcessParams />,
        },
        {
          path: '/ProcessView', //  
          element: <ProcessView />,
        },
        {
          path: '/DevParams', //  
          element: <DevParams />,
        },
      ]
    },
 
  ]);
  return routes;
}
export default Routes;
