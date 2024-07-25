import { Button, message, Modal, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styles from "../App.module.scss";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { DownloadOutlined } from "@ant-design/icons";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { randomInt } from "../utils";

const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

// 生成随机配方数量（1到5个）
const numFormulas = Math.floor(Math.random() * 5) + 1;
const numRows = 10;

// 定义各个范围
const ranges = [
  [0, 100],
  [0, 100],
  [0, 100], // A-C
  [0, 50],
  [0, 50],
  [0, 50],
  [0, 50],
  [0, 50], // D-H
  [0, 80],
  [0, 80], // I-J
] as any;

export default function ResultModal(props: any) {
  let { open, onCancel, title = "" } = props;
  const [change, setChange] = useState(false);
  const [progress, setProgress] = useState(0);
  const timer = useRef(null) as any;

  // 生成随机百分比数组，保证总和为100，并满足不同范围的要求
  const generateRandomPercentages = (
    num: number,
    ranges: Array<[number, number]>
  ) => {
    let percentages = Array(num)
      .fill(0)
      .map((_, index) => {
        const [min, max] = ranges[index];
        return Math.random() * (max - min) + min;
      });
    const sum = percentages.reduce((a, b) => a + b, 0);
    return percentages.map((p) => ((p / sum) * 100).toFixed(2));
  };

  const formulaData = Array.from({ length: numFormulas }, () =>
    generateRandomPercentages(numRows, ranges)
  );

  // 生成数据源
  const dataSource = Array.from({ length: numRows }, (_, index) => {
    const data = {
      key: (index + 1).toString(),
      composition: String.fromCharCode(65 + index), // A, B, C, ..., J
    } as any;

    if (index < 3) {
      // A到C
      data.type = "主料";
    } else if (index >= 3 && index < 8) {
      // D到H
      data.type = "辅料";
    } else {
      // I到J
      data.type = "填料";
    }

    formulaData.forEach((formula, i) => {
      data[`formula${i + 1}`] = formula[index] + "%";
    });
    return data;
  });

  // 导出表格数据为Excel文件
  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheetData = [
      [
        "类别",
        "组分",
        ...Array.from({ length: numFormulas }, (_, i) => `配方${i + 1}`),
      ],
      ...dataSource.map((row) => [
        row.type,
        row.composition,
        ...Array.from(
          { length: numFormulas },
          (_, i) => row[`formula${i + 1}`]
        ),
      ]),
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], { type: EXCEL_TYPE });

    saveAs(data, "table_data.xlsx");
  };

  // 动态生成列
  const materialColumns = [
    {
      title: "类别",
      dataIndex: "type",
      align: "center",
      onCell: (_: any, index: any) => {
        if (index === 0) {
          return { rowSpan: 3 };
        } else if (index === 3) {
          return { rowSpan: 5 };
        } else if (index === 8) {
          return { rowSpan: 2 };
        } else {
          return { rowSpan: 0 };
        }
      },
    },
    {
      title: "组分",
      dataIndex: "composition",
      align: "center",
    },
    ...Array.from({ length: numFormulas }, (_, i) => ({
      title: `配方${i + 1}`,
      dataIndex: `formula${i + 1}`,
      align: "center",
    })),
  ] as any;

  const clacTime = (suspend?: any) => {
    clearInterval(timer.current);

    timer.current = setInterval(() => {
      setProgress((value) => {
        if (value >= 100) {
          clearInterval(timer.current);
          setChange(true);
          return 100;
        } else if (value >= suspend) {
          clearInterval(timer.current);

          setTimeout(() => {
            clacTime();
          }, randomInt(2000, 3000));

          return value;
        }

        return value + randomInt(1, 15);
      });
    }, 500);
  };

  useEffect(() => {
    if (open) {
      clearInterval(timer.current);
      setChange(false);
      clacTime(randomInt(40, 70));
    } else {
      clearInterval(timer.current);
    }
  }, [open]);

  useEffect(() => {
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  return (
    <div>
      <Modal
        centered
        footer={null}
        open={open}
        closeIcon={null}
        title={null}
        onCancel={() => {
          if (!change) return message.warning("计算中...");
          clearInterval(timer.current);
          setProgress(0);
          setChange(false);
          onCancel?.();
        }}
        wrapClassName={styles.materialMoadl}
        destroyOnClose={true}
      >
        <div className={`${change ? styles.enter : ""}`}>
          {change ? (
            <div className={styles.material}>
              <div className={styles.title}>
                <h3>{title} - 配比表</h3>
                <Button
                  type="primary"
                  shape="round"
                  icon={<DownloadOutlined />}
                  size="large"
                  onClick={exportToExcel}
                  style={{
                    background: "#008A16",
                    color: "#FFF",
                    border: "none",
                  }}
                >
                  导出配方
                </Button>
              </div>
              <Table
                bordered
                dataSource={dataSource}
                pagination={false}
                columns={materialColumns}
              />
            </div>
          ) : (
            <div className={styles.loading}>
              <DotLottieReact
                src="https://lottie.host/f8244797-6fb4-4ab6-addb-e9b50864ad43/jCnwI0cuD9.json"
                loop
                autoplay
              />
              <h3>正在为您计算配比...{progress > 100 ? 100 : progress}% </h3>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
