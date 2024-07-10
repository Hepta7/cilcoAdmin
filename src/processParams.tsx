import { useRef } from "react";
import MyForm from "./components/Form/index";
import HeadTitle from "./components/headTitle";
import { Button } from "antd";
import styles from "./App.module.scss";
import { useNavigate } from "react-router-dom";
import { jsonToUrlParam } from "./utils";

let formList = [
  {
    key: "electrical",
    type: "input",
    isRequired: true,
    title: "主电机转速（RPM）",
    placeholder: "请输入",
  },
  {
    key: "masterFeed",
    type: "input",
    inputType: "number",
    isRequired: true,
    title: "主喂料转速（HZ）",
    placeholder: "请输入",
  },
  {
    key: "speedFeed",
    type: "input",
    inputType: "number",
    isRequired: true,
    title: "侧喂料转速（HZ）",
    placeholder: "请输入",
  },
  {
    key: "temperature1",
    type: "input",
    inputType: "number",
    isRequired: true,
    title: "1区温度（°C）",
    placeholder: "请输入",
  },

  {
    key: "temperature2",
    type: "input",
    inputType: "number",
    isRequired: true,
    title: "2区温度（°C）",
    placeholder: "请输入",
  },
  {
    key: "temperature3",
    type: "input",
    inputType: "number",
    isRequired: true,
    title: "3区温度（°C）",
    placeholder: "请输入",
  },
  {
    key: "temperature4",
    type: "input",
    inputType: "number",
    isRequired: true,
    title: "4区温度（°C）",
    placeholder: "请输入",
  },
  {
    key: "temperature5",
    type: "input",
    inputType: "number",
    isRequired: true,
    title: "5区温度（°C）",
    placeholder: "请输入",
  },
  {
    key: "temperature6",
    type: "input",
    inputType: "number",
    isRequired: true,
    title: "6区温度（°C）",
    placeholder: "请输入",
  },
  {
    key: "temperature7",
    type: "input",
    inputType: "number",
    isRequired: true,
    title: "7区温度（°C）",
    placeholder: "请输入",
  },
  {
    key: "temperature8",
    type: "input",
    inputType: "number",
    isRequired: true,
    title: "8区温度（°C）",
    placeholder: "请输入",
  },
  {
    key: "temperature9",
    type: "input",
    inputType: "number",
    isRequired: true,
    title: "9区温度（°C）",
    placeholder: "请输入",
  },
  {
    key: "temperature10",
    type: "input",
    inputType: "number",
    isRequired: true,
    title: "10区温度（°C）",
    placeholder: "请输入",
  },
  {
    key: "temperature11",
    type: "input",
    inputType: "number",
    isRequired: true,
    title: "11区温度（°C）",
    placeholder: "请输入",
  },
  {
    key: "noseTemperature",
    type: "input",
    inputType: "number",
    isRequired: true,
    title: "机头温度（°C）",
    placeholder: "请输入",
  },
  {
    key: "pressure",
    type: "input",
    inputType: "number",
    isRequired: true,
    title: "熔体压力（MPa）",
    placeholder: "请输入",
  },
  {
    key: "pelletizer",
    type: "input",
    inputType: "number",
    isRequired: true,
    title: "切粒机转速（RPM）",
    placeholder: "请输入",
  },
];
export default function ProcessParams() {
  const navigate = useNavigate();

  const useForm = useRef() as any; // 存储头部form表单的实例

  const onFinish = (values: any, type: string) => {
    console.log("first", values);
  };

  const onFinishFailed = (values: any, type: string) => {};

  const generate = () => {
    let obj = useForm.current.getFieldsValue();

    useForm.current.validateFields();

    let valarr = Object.values(obj).filter((item) => item != undefined);

    if (valarr.length == Object.keys(obj).length) {
      navigate("/processView"); // 路由跳转
    }

  };

  const reset = () => {
    console.log("first", useForm.current.getFieldsValue());
    // useForm.current.resetFields();
  };

  return (
    <div id={styles.processParams}>
      <HeadTitle title="工艺参数" />

      <div className={styles.content}>
        <MyForm
          bottomIsShow={false}
          onFinish={(e: any) => onFinish(e, "search")}
          onFinishFailed={(e) => onFinishFailed(e, "search")}
          formList={formList}
          // arrangement="row"
          ref={useForm}
          onCancel={(e: any) => {
            e.resetFields();
          }}
        />
        <div style={{ marginTop: 10 }}>
          <Button
            type="primary"
            size="large"
            style={{ marginRight: 50 }}
            onClick={reset}
          >
            重置
          </Button>
          <Button type="primary" size="large" onClick={generate}>
            下一步
          </Button>
        </div>
      </div>
    </div>
  );
}
