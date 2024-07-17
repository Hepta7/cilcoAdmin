import { useRef, useState } from "react";
import MyForm from "./components/Form/index";
import HeadTitle from "./components/headTitle";
import { Button, message, Modal } from "antd";
import styles from "./App.module.scss";
import { randomInt } from "./utils";
import Device from "./static/device.png";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

let formList = [
  {
    key: "meshingBlock1",
    type: "input",
    title: "1号桶（%）",
    placeholder: "请输入调整参数",
  },
  {
    key: "meshingBlock2",
    type: "input",
    title: "2号桶（%）",
    placeholder: "请输入调整参数",
  },
  {
    key: "meshingBlock3",
    type: "input",
    title: "3号桶（%）",
    placeholder: "请输入调整参数",
  },
  {
    key: "meshingBlock4",
    type: "input",
    title: "4号桶（%）",
    placeholder: "请输入调整参数",
  },
  {
    key: "meshingBlock5",
    type: "input",
    title: "5号桶（%）",
    placeholder: "请输入调整参数",
  },
  {
    key: "meshingBlock6",
    type: "input",
    title: "6号桶（%）",
    placeholder: "请输入调整参数",
  },
  {
    key: "meshingBlock7",
    type: "input",
    title: "7号桶（%）",
    placeholder: "请输入调整参数",
  },
  {
    key: "meshingBlock8",
    type: "input",
    title: "8号桶（%）",
    placeholder: "请输入调整参数",
  },
];

export default function ProcessParams() {
  const useForm = useRef() as any; // 存储头部form表单的实例
  //   const timer = useRef(null) as any;
  //   const [loadChange, setLoadChange] = useState(false);
  //   const [progress, setProgress] = useState(0);
  //   const [modalShow, setModalShow] = useState(false);
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

    if (valarr.length == 0) {
      message.warning("请输入调整参数");
    } else {
      message.loading("请求发送中...", 2, () => {
        message.success("参数发送成功");
      });
    }
  };

  const reset = () => {
    console.log("first", useForm.current.getFieldsValue());
    useForm.current.resetFields();
  };

  //   const clacTime = (suspend?: any) => {
  //     clearInterval(timer.current);

  //     timer.current = setInterval(() => {
  //       setProgress((value) => {
  //         if (value >= 100) {
  //           clearInterval(timer.current);
  //           setLoadChange(true);
  //           return 100;
  //         } else if (value >= suspend) {
  //           clearInterval(timer.current);

  //           setTimeout(() => {
  //             clacTime();
  //           }, randomInt(2000, 3000));

  //           return value;
  //         }

  //         return value + randomInt(1, 10);
  //       });
  //     }, 500);
  //   };

  return (
    <div id={styles.devParams}>
      <HeadTitle title="调整设备参数" />

      <div className={styles.content}>
        <img src={Device} style={{ marginBottom: 40 }} />
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

      {/* <Modal
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
      </Modal> */}
    </div>
  );
}
