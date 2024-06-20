import React, { useEffect } from "react";
import { useRoutes, useNavigate, useSearchParams } from "react-router-dom";
import Home from "./home";
import MaterialInfo from "./materialInfo";
import Performance from "./performance";
import Material from "./material";

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
          path: '/materialInfo',// 场地管理
          element: <MaterialInfo />,
        },
        {
          path: '/performance', // 区域管理
          element: <Performance />,
        },
        {
          path: '/material', // 区域管理
          element: <Material />,
        },
      ]
    },
 
  ]);
  return routes;
}
export default Routes;
