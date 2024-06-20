import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import styles from "./App.module.scss";

export default function Material() {
  return (
    <div id={styles.material}>
      <div className={styles.loading}>
        <DotLottieReact
          src="https://lottie.host/f8244797-6fb4-4ab6-addb-e9b50864ad43/jCnwI0cuD9.json"
          loop
          autoplay
        />
      </div>
    </div>
  );
}
