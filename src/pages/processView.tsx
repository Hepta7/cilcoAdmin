import { useEffect, useRef, useState } from "react";
import MyForm from "../components/Form/index";

import { Button, Modal } from "antd";
import styles from "../App.module.scss";
import { randomInt } from "../utils";
import Process from "../static/process.png";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import SilcoModal from "../components/silcoModal";
import ProductInfo from "../components/productInfo";
import AiLoading from "../components/aiLoading";

const selectList = [
  {
    name: "22/22",
    id: 1,
  },
  {
    name: "32/32",
    id: 2,
  },
  {
    name: "48/48",
    id: 3,
  },
  {
    name: "64/32",
    id: 4,
  },
  {
    name: "32/32A",
    id: 5,
  },
  {
    name: "SK64/32N",
    id: 6,
  },
];

export let screwData = [
  {
    key: "meshingBlock1",
    type: "select",
    isRequired: true,
    title: "啮合块1",
    placeholder: "请选择啮合块型号",
    selectList,
  },
  {
    key: "meshingBlock2",
    type: "select",
    isRequired: true,
    title: "啮合块2",
    placeholder: "请选择啮合块型号",
    selectList,
  },
  {
    key: "meshingBlock3",
    type: "select",
    isRequired: true,
    title: "啮合块3",
    placeholder: "请选择啮合块型号",
    selectList,
  },
  {
    key: "meshingBlock4",
    type: "select",
    isRequired: true,
    title: "啮合块4",
    placeholder: "请选择啮合块型号",
    selectList,
  },
  {
    key: "meshingBlock5",
    type: "select",
    isRequired: true,
    title: "啮合块5",
    placeholder: "请选择啮合块型号",
    selectList,
  },
  {
    key: "meshingBlock6",
    type: "select",
    isRequired: true,
    title: "啮合块6",
    placeholder: "请选择啮合块型号",
    selectList,
  },
];

export default function ProcessParams() {
  const useForm = useRef() as any; // 存储头部form表单的实例
  const [loadChange, setLoadChange] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const onFinish = (values: any, type: string) => {
    console.log("type", type);
  };

  const onFinishFailed = (values: any, type: string) => {
    console.log("err", values);
  };

  const save = () => {
    let obj = useForm.current.getFieldsValue();

    useForm.current.validateFields();

    let valarr = Object.values(obj).filter((item) => item != undefined);

    if (valarr.length == Object.keys(obj).length) {
      setLoadChange(false);
      setModalShow(true);
    }
  };

  const reset = () => {
    console.log("first", useForm.current.getFieldsValue());
    useForm.current.resetFields();
  };

  return (
    <div id={styles.processView}>
      <div className={styles.content}>
        <img src={Process} style={{ marginBottom: 40, minWidth: 1500 }} />
        <MyForm
          bottomIsShow={false}
          onFinish={(e: any) => onFinish(e, "search")}
          onFinishFailed={(e) => onFinishFailed(e, "search")}
          formList={screwData}
          ref={useForm}
          onCancel={(e: any) => {
            e.resetFields();
          }}
        />
        <div style={{ marginTop: 20 }} className={styles.footer}>
          <Button
            type="primary"
            size="large"
            style={{ marginRight: 50 }}
            onClick={save}
          >
            保存
          </Button>
          <Button size="large" onClick={reset}>
            取消
          </Button>
        </div>
      </div>

      <SilcoModal
        title={loadChange ? "产品性能" : null}
        open={modalShow}
        onCancel={() => {
          setModalShow(false);
        }}
        onConfirm={() => {
          setModalShow(false);
        }}
        footer={loadChange}
      >
        <div className={styles.modalContent}>
          {loadChange ? (
            <ProductInfo />
          ) : (
            <AiLoading callBack={() => setLoadChange(true)} />
          )}
        </div>
      </SilcoModal>
    </div>
  );
}
