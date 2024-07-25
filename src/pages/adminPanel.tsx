import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import HeadTitle from "../components/headTitle";
import styles from "../App.module.scss";
import IconFont from "../components/iconfont";
import rboot from "../static/robot.png";
import { Button, message, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddProductModal from "../components/addProductModal";
import ResultModal from "../components/resultModal";
import SilcoModal from "../components/silcoModal";
import MyForm from "../components/Form";
import { technologyData } from "./processParams";
import Process from "../static/process.png";
import { screwData } from "./processView";
import ProductInfo from "../components/productInfo";
import AiLoading from "../components/aiLoading";
import { Bus, randomInt } from "../utils";

let list = [] as any;
export default function AdminPanel() {
  const [title, setTitle] = useState("");
  const [addModal, setAddModal] = useState(false);
  const [loadModal, setLoadModal] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [technologyModal, setTechnologyModal] = useState(false);
  const [technologyFields, setTechnologyFields] = useState({});
  const [screwModal, setScrewModal] = useState(false);
  const [resultModal, setResuleModal] = useState(false);
  const technologyRef = useRef() as any; // 存储头部form表单的实例
  const technologyModalRef = useRef() as any; // 存储头部form表单的实例
  const screwRef = useRef() as any; // 存储头部form表单的实例
  const [status, setStatus] = useState(0);
  const [data, setData] = useState([]) as any;

  const addCancel = () => {
    setAddModal(false);
  };

  useEffect(() => {
    let num = randomInt(1, 9);
    let arr = [];
    for (let i = 0; i < num; i++) {
      arr.push({
        id: list.length + 1,
        name: `产品${i + 1}`,
        density: `${randomInt(1, 5)}`,
        viscosity: `${randomInt(0.3, 1)}`,
        temperature: `${randomInt(10, 50)}`,
        rate: `${randomInt(0, 1.5)}`,
        bendstrength: `${randomInt(100, 500)}`,
        strength: `${randomInt(100, 500)}`,
      });
    }
    list = arr;
    setData(arr);
  }, []);

  useEffect(() => {
    Bus.on("headSearch", (value) => {
      // 使用filter方法来更新filteredItems
      const filtered = list.filter((item: any) => {
        return item.name.toLowerCase().includes(value.toLowerCase());
      });

      setData(filtered);
    });
  }, []);

  const addConfirm = (values: any) => {
    let {
      density,
      viscosity,
      temperature,
      rate,
      bendstrength,
      strength,
      name,
    } = values;

    list.push({
      id: list.length + 1,
      name,
      density: `${density}`,
      viscosity: `${viscosity}`,
      temperature: `${temperature}`,
      rate: `${rate}`,
      bendstrength: `${bendstrength}`,
      strength: `${strength}`,
    });
    setData(list);
    setAddModal(false);
  };

  const resultCancel = () => {
    setResuleModal(false);
  };

  const onFinish = (values: any, type: string) => {
    console.log("first", values);
  };

  const onFinishFailed = (values: any, type: string) => {};

  const openScrewModal = () => {
    if (status == 0) return message.warning("请先填写工艺参数");
    else if (status == 2) return message.warning("结果已呈现，可点击重置重新预测");

    technologyRef.current.validateFields();
    let formData = technologyRef.current.getFieldsValue();

    let keyLen = Object.values(formData).filter((i) => !i).length;
    console.log("formData", technologyRef.current);
    if (keyLen === 0) {
      setScrewModal(true);
    } else {
      message.warning("请检查你的输入");
    }
  };

  useEffect(() => {
    if (status == 1) {
      technologyRef.current.setFieldsValue(technologyFields);
    }
  }, [status]);

  return (
    <div id={styles.adminPanel}>
      <HeadTitle />
      <div className={styles.content}>
        <div className={styles.formInfo}>
          <div className={styles.title}>
            <IconFont
              style={{ fontSize: 48 }}
              type="icon-yucechanpinxingneng"
            />
            <h4>预测产品性能</h4>
          </div>

          {(status == 1 && (
            <div style={{ height: "68.555vh", overflowY: "auto" }}>
              <MyForm
                bottomIsShow={false}
                onFinish={(e: any) => onFinish(e, "technology")}
                onFinishFailed={(e) => onFinishFailed(e, "technology")}
                formList={technologyData}
                ref={technologyRef}
                onCancel={(e: any) => {
                  e.resetFields();
                }}
              />
            </div>
          )) ||
            (status == 2 && (
              <ProductInfo
                style={{ flex: 1 }}
                listStyle={{ display: "block" }}
              />
            )) || (
              <div className={styles.rboot}>
                <img src={rboot} />
                <div
                  className={styles.text}
                  onClick={() => {
                    setTechnologyModal(true);
                    technologyModalRef.current?.resetFields();
                  }}
                >
                  <span>填写工艺参数</span>
                  <IconFont
                    style={{ fontSize: 15, marginLeft: 12 }}
                    type="icon-jiantou"
                  />
                </div>
              </div>
            )}

          <div className={styles.footer}>
            <div
              onClick={() => setStatus(0)}
              style={{
                background: status > 0 ? "#E2F4E5" : "#E1E1E1",
                color: status > 0 ? "#008A16" : "#B6B6B6",
              }}
            >
              重置
            </div>
            <div onClick={openScrewModal}>预测</div>
          </div>
        </div>

        {/* 右侧 */}
        <div className={styles.table}>
          <div className={styles.title}>
            <IconFont style={{ fontSize: 48 }} type="icon-yuanquwenzhang1" />
            <h4>预测配方比</h4>
            <Button
              style={{
                background: "#008A16",
                color: "#FFF",
                border: "none",
              }}
              icon={<PlusOutlined />}
              size="large"
              onClick={() => setAddModal(true)}
            >
              新增产品
            </Button>
          </div>

          <div className={styles.productList}>
            {data.map((item: any) => (
              <div className={styles.item} key={item.name}>
                <div className={styles.info}>
                  <div>
                    <span>产品名称</span>
                    <span>{item.name}</span>
                  </div>
                  <div>
                    <span>密度</span>
                    <span>{item.density}g/cm³</span>
                  </div>
                  <div>
                    <span>粘度</span>
                    <span>{item.density}Pa·s</span>
                  </div>
                  <div>
                    <span>拉伸强度</span>
                    <span>{item.density} MPa</span>
                  </div>
                </div>
                <p
                  className={styles.examine}
                  onClick={() => setInfoModal(true)}
                >
                  查看详情
                </p>
                <div className={styles.prediction}>
                  <img src={rboot} width={40} height={40} />
                  <p>AI为您提供数据预测 · · ·</p>
                  <Button
                    onClick={() => setResuleModal(true)}
                    style={{
                      background: "#008A16",
                      color: "#FFF",
                      border: "none",
                    }}
                    size="large"
                  >
                    预测配方
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AddProductModal
        open={addModal}
        onCancel={addCancel}
        onConfirm={addConfirm}
      />

      <SilcoModal
        open={infoModal}
        onCancel={() => setInfoModal(false)}
        onConfirm={() => setInfoModal(false)}
        footer={true}
      >
        <ProductInfo />
      </SilcoModal>

      <SilcoModal
        open={loadModal}
        onCancel={() => message.warning("Ai，预测中 . . .")}
        footer={false}
      >
        <AiLoading
          callBack={() => {
            setLoadModal(false);
            setStatus(2);
          }}
        />
      </SilcoModal>

      <ResultModal title={title} open={resultModal} onCancel={resultCancel} />

      <SilcoModal
        width={765}
        title={"工艺参数"}
        open={technologyModal}
        getContainer={() => document.getElementById(styles.adminPanel)}
        onCancel={() => {
          setTechnologyModal(false);
          technologyModalRef.current.resetFields();
        }}
        onConfirm={() => {
          technologyModalRef.current.validateFields();
          let formData = technologyModalRef.current.getFieldsValue();

          let keyLen = Object.values(formData).filter((i) => !i).length;

          if (keyLen === 0) {
            setStatus(1);
            setTechnologyModal(false);
            setTechnologyFields(formData);
          }
        }}
        footer={true}
      >
        <div className={styles.technologyForm}>
          <MyForm
            bottomIsShow={false}
            onFinish={(e: any) => onFinish(e, "technology")}
            onFinishFailed={(e) => onFinishFailed(e, "technology")}
            formList={technologyData}
            ref={technologyModalRef}
            onCancel={(e: any) => e.resetFields()}
          />
        </div>
      </SilcoModal>

      <SilcoModal
        width={806}
        title={"设置螺杆组合参数"}
        open={screwModal}
        getContainer={() => document.getElementById(styles.adminPanel)}
        footer={true}
        onCancel={() => {
          setScrewModal(false);
          screwRef.current.resetFields();
        }}
        onConfirm={() => {
          screwRef.current.validateFields();

          let formData = screwRef.current.getFieldsValue();
          let keyLen = Object.values(formData).filter((i) => !i).length;

          if (keyLen === 0) {
            setScrewModal(false);
            setLoadModal(true);
          }
        }}
      >
        <div className={styles.screwForm}>
          <img
            src={Process}
            style={{ marginBottom: 40, width: "100%", height: 122 }}
          />
          <MyForm
            bottomIsShow={false}
            onFinish={(e: any) => onFinish(e, "screw")}
            onFinishFailed={(e) => onFinishFailed(e, "screw")}
            formList={screwData}
            ref={screwRef}
            onCancel={(e: any) => {
              e.resetFields();
            }}
          />
        </div>
      </SilcoModal>
    </div>
  );
}
