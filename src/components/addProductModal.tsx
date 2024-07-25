import { Modal } from "antd";
import MyForm from "./Form";
import styles from "../App.module.scss";
import { useRef } from "react";

let formList = [
  {
    key: "name",
    type: "input",
    isRequired: true,
    title: "产品名称",
    placeholder: "请输入",
  },
  {
    key: "density",
    type: "input",
    inputType: "number",
    isRequired: true,
    title: "密度（cm³）",
    placeholder: "请输入",
  },
  {
    key: "viscosity",
    type: "input",
    inputType: "number",
    isRequired: true,
    title: "粘度（Pa·s）",
    placeholder: "请输入",
  },
  {
    key: "temperature",
    type: "input",
    inputType: "number",
    isRequired: true,
    title: "玻璃化转变温度（°C）",
    placeholder: "请输入",
  },
  {
    key: "rate",
    type: "input",
    inputType: "number",
    isRequired: true,
    title: "熔体质量流动速率（m/s）",
    placeholder: "请输入",
  },
  {
    key: "bendstrength",
    type: "input",
    inputType: "number",
    isRequired: true,
    title: "弯曲强度（MPa）",
    placeholder: "请输入",
  },
  {
    key: "strength",
    type: "input",
    inputType: "number",
    isRequired: true,
    title: "拉伸强度（MPa）",
    placeholder: "请输入",
  },
];


export default function AddProductModal(props: any) {
  let { open, onCancel, onConfirm } = props;
  const useForm = useRef() as any; // 存储头部form表单的实例

  /** from 验证成功 点击确定后的回调*/
  const onFinish = (values: any, type: string) => {
    console.log("Success:", values);

    onConfirm?.(values);
    useForm.current.resetFields();
  };

  /** from 表单提交时错误 */
  const onFinishFailed = (errorInfo: any, type: string) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Modal
        centered
        footer={null}
        title="新增产品"
        open={open}
        onCancel={() => {
          useForm.current.resetFields();
          onCancel?.();
        }}
        wrapClassName={styles.formDataMoadl}
      >
        <MyForm
          cancelText="重置"
          confirmText="添加"
          onFinish={(e: any) => onFinish(e, "search")}
          onFinishFailed={(e) => onFinishFailed(e, "search")}
          formList={formList}
          ref={useForm}
          onCancel={(e: any) => {
            e.resetFields();
          }}
        />
      </Modal>
    </div>
  );
}
