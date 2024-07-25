import React from "react";
import styles from "./index.module.scss";
import { Button, Modal } from "antd";

export default function SilcoModal(props: any) {
  let {
    title,
    open,
    onConfirm,
    footer,
    children,
    onCancel,
    getContainer,
    ...arg
  } = props;
  return (
    <div>
      <Modal
        {...arg}
        getContainer={getContainer}
        title={title}
        className={styles.silcoModal}
        centered
        open={open}
        onCancel={() => onCancel?.()}
        footer={
          footer ? (
            <div>
              <Button onClick={() => onCancel?.()}>取消</Button>
              <Button
                onClick={() => onConfirm?.()}
                style={{
                  background: "#008A16",
                  color: "#FFF",
                  border: "none",
                  marginLeft: 20,
                }}
                type="primary"
              >
                确定
              </Button>
            </div>
          ) : null
        }
      >
        {children}
      </Modal>
    </div>
  );
}
