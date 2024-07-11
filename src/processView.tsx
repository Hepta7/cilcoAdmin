import { useEffect, useRef, useState } from "react";
import MyForm from "./components/Form/index";
import HeadTitle from "./components/headTitle";
import { Button, Modal } from "antd";
import styles from "./App.module.scss";
import { useNavigate } from "react-router-dom";
import { jsonToUrlParam, randomInt } from "./utils";
import Process from "./static/process.png";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

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

let formList = [
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
  // {
  //   key: "temperature1",
  //   type: "input",
  //   inputType: "number",
  //   isRequired: true,
  //   title: "1区温度（°C）",
  //   placeholder: "请输入",
  // },

  // {
  //   key: "temperature2",
  //   type: "input",
  //   inputType: "number",
  //   isRequired: true,
  //   title: "2区温度（°C）",
  //   placeholder: "请输入",
  // },
  // {
  //   key: "temperature3",
  //   type: "input",
  //   inputType: "number",
  //   isRequired: true,
  //   title: "3区温度（°C）",
  //   placeholder: "请输入",
  // },
  // {
  //   key: "temperature4",
  //   type: "input",
  //   inputType: "number",
  //   isRequired: true,
  //   title: "4区温度（°C）",
  //   placeholder: "请输入",
  // },
  // {
  //   key: "temperature5",
  //   type: "input",
  //   inputType: "number",
  //   isRequired: true,
  //   title: "5区温度（°C）",
  //   placeholder: "请输入",
  // },
  // {
  //   key: "temperature6",
  //   type: "input",
  //   inputType: "number",
  //   isRequired: true,
  //   title: "6区温度（°C）",
  //   placeholder: "请输入",
  // },
  // {
  //   key: "temperature7",
  //   type: "input",
  //   inputType: "number",
  //   isRequired: true,
  //   title: "7区温度（°C）",
  //   placeholder: "请输入",
  // },
  // {
  //   key: "temperature8",
  //   type: "input",
  //   inputType: "number",
  //   isRequired: true,
  //   title: "8区温度（°C）",
  //   placeholder: "请输入",
  // },
  // {
  //   key: "temperature9",
  //   type: "input",
  //   inputType: "number",
  //   isRequired: true,
  //   title: "9区温度（°C）",
  //   placeholder: "请输入",
  // },
  // {
  //   key: "temperature10",
  //   type: "input",
  //   inputType: "number",
  //   isRequired: true,
  //   title: "10区温度（°C）",
  //   placeholder: "请输入",
  // },
  // {
  //   key: "temperature11",
  //   type: "input",
  //   inputType: "number",
  //   isRequired: true,
  //   title: "11区温度（°C）",
  //   placeholder: "请输入",
  // },
  // {
  //   key: "noseTemperature",
  //   type: "input",
  //   inputType: "number",
  //   isRequired: true,
  //   title: "机头温度（°C）",
  //   placeholder: "请输入",
  // },
  // {
  //   key: "pressure",
  //   type: "input",
  //   inputType: "number",
  //   isRequired: true,
  //   title: "熔体压力（MPa）",
  //   placeholder: "请输入",
  // },
  // {
  //   key: "pelletizer",
  //   type: "input",
  //   inputType: "number",
  //   isRequired: true,
  //   title: "切粒机转速（RPM）",
  //   placeholder: "请输入",
  // },
];

export default function ProcessParams() {
  const useForm = useRef() as any; // 存储头部form表单的实例
  const timer = useRef(null) as any;
  const [loadChange, setLoadChange] = useState(false);
  const [progress, setProgress] = useState(0);
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
      setModalShow(true);
      
      setTimeout(() => {
        clacTime(randomInt(40, 60));
      }, randomInt(800, 1500));
    }

    // navigate("/processView?" + str); // 路由跳转
  };

  const reset = () => {
    console.log("first", useForm.current.getFieldsValue());
    useForm.current.resetFields();
  };

  const clacTime = (suspend?: any) => {
    clearInterval(timer.current);

    timer.current = setInterval(() => {
      setProgress((value) => {
        if (value >= 100) {
          clearInterval(timer.current);
          setLoadChange(true);
          return 100;
        } else if (value >= suspend) {
          clearInterval(timer.current);

          setTimeout(() => {
            clacTime();
          }, randomInt(2000, 3000));

          return value;
        }

        return value + randomInt(1, 10);
      });
    }, 500);
  };

  return (
    <div id={styles.processView}>
      <HeadTitle title="设置螺杆组合参数" />

      <div className={styles.content}>
        <img src={Process} style={{ marginBottom: 40 }} />
        <MyForm
          bottomIsShow={false}
          onFinish={(e: any) => onFinish(e, "search")}
          onFinishFailed={(e) => onFinishFailed(e, "search")}
          formList={formList}
          arrangement="row"
          ref={useForm}
          onCancel={(e: any) => {
            e.resetFields();
          }}
        />
        <div style={{ marginTop: 20 }}>
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

      <Modal
        title={loadChange ? "产品性能" : null}
        className={styles.loadingModal}
        centered
        open={modalShow}
        onCancel={() => {
          setLoadChange(false);
          setProgress(0);
          setModalShow(false);
        }}
        footer={
          loadChange ? (
            <div>
              <Button
                onClick={() => {
                  setLoadChange(false);
                  setProgress(0);
                  setModalShow(false);
                }}
              >
                取消
              </Button>
              <Button
                onClick={() => {
                  setLoadChange(false);
                  setProgress(0);
                  setModalShow(false);
                }}
                style={{ marginLeft: 20 }}
                type="primary"
              >
                确定
              </Button>
            </div>
          ) : null
        }
      >
        {loadChange ? (
          <div className={styles.info}>
            <div className={styles.item + " " + styles.name}>
              <div className={styles.label}>产品名称</div>
              <span>产品{randomInt(1, 10)}</span>
            </div>
            <div className={styles.list}>
              <div className={styles.item}>
                <div className={styles.label}>密度</div>
                <span>{randomInt(1, 5)}g/cm³</span>
              </div>
              <div className={styles.item}>
                <div className={styles.label}>粘度</div>
                <span>{randomInt(0.3, 1)} Pa·s</span>
              </div>
              <div className={styles.item}>
                <div className={styles.label}>玻璃化转变温度</div>
                <span>{randomInt(10, 40)}°C</span>
              </div>
              <div className={styles.item}>
                <div className={styles.label}>熔体质量流动速率</div>
                <span>{randomInt(0, 1.5)} m/s</span>
              </div>
              <div className={styles.item}>
                <div className={styles.label}>弯曲强度</div>
                <span>{randomInt(100, 500)} MPa</span>
              </div>
              <div className={styles.item}>
                <div className={styles.label}>拉伸强度</div>
                <span>{randomInt(100, 500)} MPa</span>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={styles.loading}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ width: 192, height: 192 }}>
              <DotLottieReact
                src="https://lottie.host/bdf9b302-81e6-4d6a-930b-c46628212f48/cCmTJ2DTwU.json"
                loop
                autoplay
              />
            </div>
            <div className={styles.hintText}>Ai正在预测中...</div>

            <div className={styles.scrollContainer}>
              <div
                className={styles.bar}
                style={{
                  width: `${progress}%`,
                }}
              ></div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
