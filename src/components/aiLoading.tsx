import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import styles from "../App.module.scss";
import { useEffect, useRef, useState } from "react";
import { randomInt } from "../utils";

export default function AiLoading(props: any) {
  let { callBack } = props;
  const [progress, setProgress] = useState(0);
  const timer = useRef(null) as any;

  const clacTime = (suspend?: any) => {
    clearInterval(timer.current);

    timer.current = setInterval(() => {
      setProgress((value) => {
        if (value >= 100) {
          clearInterval(timer.current);
          callBack?.(true);
          return 0;
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

  useEffect(() => {
    setTimeout(() => {
      clacTime(randomInt(40, 60));
    }, randomInt(800, 1500));
  }, []);

  useEffect(() => {
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  return (
    <div
      className={styles.aiLoading}
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
  );
}
