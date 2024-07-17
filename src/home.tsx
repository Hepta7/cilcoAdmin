import { useState, useEffect, Children, useRef } from "react";
import {
  // BrowserRouter, //创建路由所有的路由操作都得包含在BrowserRouter组件里面
  // Routes, //所有对应路由需要展示的组件都得包含在Routes组件
  // Route, //配置对应路由地址显示的组件
  // Link, //跳转路由的组件 to属性 设置跳转的地址
  useNavigate, //跳转路由的Api方法
  // useParams, //获取动态路由后面的参数
  // useSearchParams, //获取url地址后面的参数
  Outlet, //嵌套路由子路由的出口
  // Navigate,
  // useRoutes,
  useLocation, // 路由信息
} from "react-router-dom";
import { Breadcrumb, Dropdown, Layout, Menu, Space, Select } from "antd";
// import {
//   DownOutlined,
//   LogoutOutlined,
//   createFromIconfontCN,
// } from "@ant-design/icons";
import styles from "./App.module.scss";
// import Logo from "../../static/icon/logo.png"
// import { useMount, useSetState } from "ahooks";
// import { outLogin, placeList } from "./api";
// import { getLoalStorage, setLoalStorage } from "./utils/index";
import logo1 from "./static/logo2.jpg";
import icon1 from "./static/icon1.png";
import icon2 from "./static/icon2.png";
import icon3 from "./static/icon3.png";
import icon from "./static/icon.png";

const { Option } = Select;

const { Header, Content, Footer, Sider } = Layout;

// 添加菜单方法
function getItem(label: any, key: any, icon?: any, children?: any) {
  return {
    key,
    icon,
    children,
    label: typeof label == "function" ? label?.() : label,
  };
}

// // 自定义icon
// const IconFont = createFromIconfontCN({
//   scriptUrl: ["//at.alicdn.com/t/c/font_3573489_gw6pz65pxyw.js"],
// });

// side 侧边栏 配置
const items = [
  getItem("原材料信息", "/materialInfo", <img src={icon1} width={25}/>),
  getItem("产品性能", "/performance", <img src={icon} width={25} />),
  getItem("工艺参数", "/processParams", <img src={icon2} width={25} />),
  getItem("设备参数", "/DevParams", <img src={icon3} width={25} />),
  //   getItem('输出配比', '/area', <IconFont style={{ fontSize: 18 }} type="icon-quyuguanli" />),
  //   getItem('泊位管理', '/berthage', <IconFont style={{ fontSize: 18 }} type="icon-boweibangding" />),
  //   getItem('车辆登记', '/register', <IconFont style={{ fontSize: 18 }} type="icon-qiche" />),
  //   getItem('出入查询', '/query', <IconFont style={{ fontSize: 18 }} type="icon-ico_xibaoyinhang_xibaochurukuchaxun" />),
  //   getItem('外屏管理', '/subLCD', <IconFont style={{ fontSize: 18 }} type="icon-pingmuquanping" />),
  //   getItem('内屏管理', '/inner', <IconFont style={{ fontSize: 18 }} type="icon-JC_011" />),
  //   getItem('故障警告', '/warning', <IconFont style={{ fontSize: 18 }} type="icon-jinggao" />),
  //   getItem('出入快照', '/video', <IconFont style={{ fontSize: 18 }} type="icon-shipin" />),
  //   getItem(
  //     '运维管理',
  //     '/operations',
  //     <IconFont style={{ fontSize: 18 }} type="icon-a-zu5825" />,

  //     [
  //       getItem('地磁管理', '/magnetic', <IconFont style={{ fontSize: 18 }} type="icon-dici" />),
  //       getItem('相机管理', '/camera', <IconFont style={{ fontSize: 18 }} type="icon-xiangji" />),
  //     ]

  //   ),
  //   getItem('周边停车场', '/nearbyPark', <IconFont style={{ fontSize: 18 }} type="icon-fujin" />),
];

// 退出登录
// function exitLogin() {
//   outLogin()
//   localStorage.clear()
//   location.replace('#/login') // 跳转后清除当前页
// }

// 头部右侧 设置
// const menu = (
//   <Menu
//     items={
//       [
//         //   getItem(() => <span onClick={exitLogin}>退出登录</span>, '0', <LogoutOutlined rotate={-90} />),
//       ]
//     }
//   />
// );

// 路径匹配面包屑
// const routerBreadcrumb = {
//   '/place': '场地管理',
//   '/area': '区域管理',
//   '/berthage': '泊位管理',
//   '/register': '车辆登记',
//   '/query': '出入查询',
//   '/subLCD': '外屏管理',
//   '/inner': '内屏管理',
//   '/analyse': '数据分析',
//   '/operations': '运维管理',
//   '/magnetic': '地磁管理',
//   '/camera': '相机管理',
//   '/warning': '故障警告',
//   '/video': '出入快照',
//   '/nearbyPark': '周边停车场',
// } as any

let timer: any;
function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false); //side 收 展开
  const [pathname, setPathname] = useState<any>(["/place"]); // 面包屑
  const [openKeys, setOpenKeys] = useState<any>([]); // 当前展开
  const [animationFlag, setAnimationFlag] = useState(false);
  //   const [placeSelect, setPlaceSelect] = useSetState<any>({  // 停车场下拉
  //     list: [],
  //     placeId: 1
  //   })

  //   useMount(async () => {
  //     let isLogin = getLoalStorage("isLogin")

  //     if (isLogin) {
  //       let { data } = await placeList()
  //       setPlaceSelect({ list: data })
  //       // 获取本地存储的停车场id
  //       let placeId = parseInt(getLoalStorage("placeId") as any)

  //       if (placeId) {
  //         return setPlaceSelect({ placeId })
  //       }
  //       setLoalStorage("placeId", 1)
  //       setPlaceSelect({ placeId: 1 })
  //     }

  //   })

  useEffect(() => {
    let list = location.pathname
      .substring(1, location.pathname.length)
      .split("/")
      .reverse();
    list.forEach((item, idx) => (list[idx] = "/" + item)); // 添加 /
    list.reverse(); // 反转

    setPathname(list); // 设置面包屑

    // 恢复当前展开
    if (list.length > 1) setOpenKeys(list);
  }, [location]);

  // 菜单点击事件
  function menuClick(e: any) {
    clearTimeout(timer);

    setAnimationFlag(true); // 开启 出场动画

    timer = setTimeout(() => {
      //   // 点击其他关闭 子菜单
      if (e.keyPath.length <= 1) setOpenKeys(e.keyPath);
      setPathname(e.keyPath); // 设置 side
      navigate(e.keyPath.reverse().join("")); // 路由跳转

      setAnimationFlag(false); // 开启 入场动画
    }, 300);
  }

  return (
    <div id={styles.home}>
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          className={styles.header}
          // style={{ padding: "0 20px ", }}
        >
          <div className={styles.title}>
            <img src={logo1} alt="" />
            <h1> 无溶剂型有机硅功能涂层材料配方分析系统</h1>
          </div>
        </Header>

        <Layout>
          <Sider
            theme="light"
            width={200}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <Menu
              mode="inline"
              selectedKeys={pathname}
              openKeys={openKeys}
              style={{ height: "100%" }}
              items={items}
              onOpenChange={(keys) => setOpenKeys(keys)}
              onClick={menuClick}
            />
          </Sider>

          <Content
            style={{ padding: "0 24px 24px" }}
            className={styles.content}
          >
            {/* 面包屑 */}
            {
              // !['/analyse', '/video'].includes(pathname[0]) &&
              // <div className={styles.breadcrumb} style={{ margin: '16px 0' }}>
              //   <span className={styles.breadcrumbHead}>当前位置：</span>
              //   <Breadcrumb >
              //     {
              //       pathname?.map((item:any) => <Breadcrumb.Item key={item} className={styles.item}>{routerBreadcrumb[item]}</Breadcrumb.Item>)
              //     }
              //   </Breadcrumb>
              // </div>
            }

            {/* 页面展示 */}

            <div style={{ minHeight: 360, marginTop: 20 }}>
              <div
                className={`${
                  animationFlag ? styles.pageAppear : styles.pageDisAppear
                }`}
              >
                <Outlet />
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default Home;
