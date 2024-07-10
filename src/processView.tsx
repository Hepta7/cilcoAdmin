import { useEffect, useRef, useState } from "react";
import MyForm from "./components/Form/index";
import HeadTitle from "./components/headTitle";
import { Button, Table } from "antd";
import styles from "./App.module.scss";
import { LeftOutlined } from "@ant-design/icons";
import { urlParamsToObject } from "./utils";

export default function ProcessView() {
  const [anim, setAnim] = useState(false);
  const [anim1, setAnim1] = useState(false);
  const [anim2, setAnim2] = useState(false);
  const [state, setState] = useState({}) as any;

  useEffect(() => {
    console.log("localtion");

    setState(urlParamsToObject(window.location.href));

    setTimeout(() => {
      setAnim(true);
    }, 1000);

    setTimeout(() => {
      setAnim1(true);
    }, 2500);

    setTimeout(() => {
      setAnim2(true);
    }, 3200);
  }, []);

  return (
    <div id={styles.processView}>
      <HeadTitle title="工艺参数" />
      <Button
        onClick={() => window.history.go(-1)}
        type="default"
        icon={<LeftOutlined />}
        size="large"
      >
        返回
      </Button>

      <div className={styles.loading}>
        <div className={`${styles.item} ${anim && styles.txtAnimation}`}>
          正在计算产品性能...
        </div>
        <div className={`${styles.item} ${anim1 && styles.txtAnimation}`}>
          正在生成数据...
        </div>
      </div>
      {anim2 && (
        <div className={styles.params}>
          <div style={{ flexShrink: 0 }}>
            <div className={styles.item}>
              主电机转速：{state.electrical} RPM
            </div>
            <div className={styles.item}>主喂料转速：{state.masterFeed} HZ</div>
            <div className={styles.item}>侧喂料转速：{state.speedFeed} HZ</div>
            <div className={styles.item}>
              机头温度：{state.noseTemperature} ℃
            </div>
            <div className={styles.item}>熔体压力：{state.pressure} MPa</div>
            <div className={styles.item}>
              切粒机转速：{state.pelletizer} RPM
            </div>
          </div>
          <div style={{ marginLeft: 50 }} className={styles.box}>
            <div className={styles.temperature}>
              <div className={styles.title}>1区温度（°C）</div>
              <div className={styles.value}>{state.temperature1}</div>
            </div>
            <div className={styles.temperature}>
              <div className={styles.title}>2区温度（°C）</div>
              <div className={styles.value}>{state.temperature2}</div>
            </div>
            <div className={styles.temperature}>
              <div className={styles.title}>3区温度（°C）</div>
              <div className={styles.value}>{state.temperature3}</div>
            </div>
            <div className={styles.temperature}>
              <div className={styles.title}>4区温度（°C）</div>
              <div className={styles.value}>{state.temperature4}</div>
            </div>
            <div className={styles.temperature}>
              <div className={styles.title}>5区温度（°C）</div>
              <div className={styles.value}>{state.temperature5}</div>
            </div>
            <div className={styles.temperature}>
              <div className={styles.title}>6区温度（°C）</div>
              <div className={styles.value}>{state.temperature6}</div>
            </div>
            <div className={styles.temperature}>
              <div className={styles.title}>7区温度（°C）</div>
              <div className={styles.value}>{state.temperature7}</div>
            </div>
            <div className={styles.temperature}>
              <div className={styles.title}>8区温度（°C）</div>
              <div className={styles.value}>{state.temperature8}</div>
            </div>
            <div className={styles.temperature}>
              <div className={styles.title}>9区温度（°C）</div>
              <div className={styles.value}>{state.temperature9}</div>
            </div>
            <div className={styles.temperature}>
              <div className={styles.title}>10区温度（°C）</div>
              <div className={styles.value}>{state.temperature10}</div>
            </div>
            <div className={styles.temperature}>
              <div className={styles.title}>11区温度（°C）</div>
              <div className={styles.value}>{state.temperature11}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
