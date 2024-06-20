
import { Button } from "antd";
import React from "react";
import styles from "./index.module.scss";



interface ButtonProps {
  onClick?: () => void;
  text?: string;
  icon?: React.ReactNode;
  type?: "primary" | "danger" | "ghost" | "dashed" | "link" | "default";
  size?: "small" | "large" | "default";
  disabled?: boolean;
  className?: string;

}

interface HeadTitleProps {
  title?: string;
  boottoms?: ButtonProps[];
}

export default function HeadTitle(HeadTitleProps: HeadTitleProps) {
  const { title, boottoms } = HeadTitleProps;


  return (

    <div className={styles.headTitle}>
      <span className={styles.title}>{title}</span>
      <div className={styles.boottom}>
        {
          boottoms?.map((item: any, index: number) => {
            return (
              <Button
                onClick={item.onClick}
                className={item.className}
                disabled={item.disabled}
                icon={item.icon}
                key={index}
                type={item.type || "primary"}
                size={item.size}>
                {item.text}
              </Button>
            )
          })
        }
      </div>
    </div>
  );

}

