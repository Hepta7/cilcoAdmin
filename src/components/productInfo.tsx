import { Button, Modal } from "antd";
import styles from "../App.module.scss";
import { randomInt } from "../utils";

export default function ProductInfo(props: any) {
  let { listStyle, ...arg } = props;

  return (
    <div className={styles.productInfo} {...arg}>
      <div className={styles.item + " " + styles.name}>
        <div className={styles.label}>产品名称</div>
        <span>产品{randomInt(1, 10)}</span>
      </div>
      <div className={styles.list} style={listStyle}>
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
  );
}
