import React, { useEffect, useRef, useState } from "react";
import MyTable from "./components/table";
import { useSetState, useTitle } from "ahooks";
import HeadTitle from "./components/headTitle";
import { PlusOutlined, DownloadOutlined } from "@ant-design/icons";
import MyForm from "./components/Form/index";
import { Button, Modal, Table, message } from "antd";
import styles from "./App.module.scss";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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
const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

const randomInt = (min: any, max: any) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default function Performance() {
  // const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [change, setChange] = useState(false);
  const [progress, setProgress] = useState(0);
  const timer = useRef(null) as any;
  const [title, setTitle] = useState("");
  const [delModal, setDelModal] = useState(false);
  const [itemIdx, setItemIdx] = useState(null) as any;

  const [formData, setFormData] = useSetState({
    // 新增 编辑 form表单值
    clickItem: {} as any,
    flag: false,
    operation: "add",
  });

  const [hint, setHint] = useState(false);

  const useForm = useRef() as any; // 存储头部form表单的实例

  const [tableData, setTableData] = useSetState({
    list: [
      {
        id: 1,
        name: "产品1",
        density: "1.0g/cm³",
        viscosity: "0.57 Pa·s",
        temperature: "29°C",
        rate: "0.6 m/s",
        bendstrength: "325 MPa",
        strength: "468 MPa",
      },
    ] as any,
    pageNum: 1,
    pageSize: 10,
    total: 1,
  });

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

  const openModal = (record: any) => {
    setHint(false);
    clearInterval(timer.current);
    setChange(false);
    setOpen(true);
    clacTime(randomInt(40, 70));
  };

  const columns = [
    {
      title: "产品名称",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "密度",
      dataIndex: "density",
      align: "center",
    },
    {
      title: "粘度",
      dataIndex: "viscosity",
      align: "center",
    },
    {
      title: "玻璃化转变温度",
      dataIndex: "temperature",
      align: "center",
    },
    {
      title: "熔体质量流动速率",
      dataIndex: "rate",
      align: "center",
    },
    {
      title: "弯曲强度",
      dataIndex: "bendstrength",
      align: "center",
    },
    {
      title: "拉伸强度",
      dataIndex: "strength",
      align: "center",
    },
    {
      title: "操作",
      dataIndex: "operation",
      align: "center",
      width: 180,
      fixed: "right",
      render: (text: any, record: any, index: number) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className={styles.operation}
            style={{ color: "#005CF2FF" }}
            onClick={() => {
              setHint(true);
              setTitle(record.name);
            }}
          >
            输出配比
          </div>
          <div
            style={{ color: "red", marginLeft: 15, cursor: "pointer" }}
            onClick={() => {
              console.log("index", index);
              setItemIdx(index);
              setDelModal(true);
            }}
          >
            删除
          </div>
        </div>
      ),
    },
  ];

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

  // 生成随机配方数量（1到5个）
  const numFormulas = Math.floor(Math.random() * 5) + 1;
  const numRows = 10;
  const formulaData = Array.from({ length: numFormulas }, () =>
    generateRandomPercentages(numRows, ranges)
  );

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

  /** from 验证成功 点击确定后的回调*/
  const onFinish = (values: any, type: string) => {
    console.log("Success:", values);
    let list = tableData.list.slice();
    let {
      density,
      viscosity,
      temperature,
      rate,
      bendstrength,
      strength,
      name,
    } = values;

    list.push({
      id: list.length + 1,
      name,
      density: `${density}g/cm³`,
      viscosity: `${viscosity} Pa·s`,
      temperature: `${temperature}°C`,
      rate: `${rate} m/s`,
      bendstrength: `${bendstrength} MPa`,
      strength: `${strength} MPa`,
    });
    setTableData({ list });
    setFormData({ flag: false });
    useForm.current.resetFields();
  };

  /** from 表单提交时错误 */
  const onFinishFailed = (errorInfo: any, type: string) => {
    console.log("Failed:", errorInfo);
  };
  const delItem = () => {
    let list = tableData.list.slice();
    list.splice(itemIdx, 1);
    setTableData({ list });
    setDelModal(false);
  };
  return (
    <div id={styles.Performance}>
      <HeadTitle
        title="产品性能"
        boottoms={[
          {
            text: "新增产品",
            icon: <PlusOutlined />,
            onClick: async () => setFormData({ flag: true, operation: "add" }),
          },
        ]}
      />
      <Modal
        centered
        footer={null}
        title={formData.operation === "add" ? "新增产品" : "编辑区域信息"}
        open={formData.flag}
        onCancel={() => {
          useForm.current.resetFields();
          setFormData({ flag: false });
        }}
        wrapClassName={styles.formDataMoadl}
      >
        <MyForm
          cancelText="重置"
          confirmText="添加"
          onFinish={(e: any) => onFinish(e, "search")}
          onFinishFailed={(e) => onFinishFailed(e, "search")}
          formList={formList}
          // arrangement="row"
          ref={useForm}
          onCancel={(e: any) => {
            e.resetFields();
          }}
        />
      </Modal>

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
          setOpen(false);
          setChange(false);
        }}
        wrapClassName={styles.materialMoadl}
        destroyOnClose={true}
      >
        <div className={`${change ? styles.pageAppear : styles.pageDisAppear}`}>
          {change ? (
            <div className={styles.material}>
              <div className={styles.title}>
                <h3>{title} 配方表</h3>
                <Button
                  type="primary"
                  shape="round"
                  icon={<DownloadOutlined />}
                  size="large"
                  onClick={exportToExcel}
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

      <Modal
        title="Modal"
        open={hint}
        onOk={openModal}
        onCancel={() => setHint(false)}
        okText="确认"
        cancelText="取消"
      >
        <div>计算配比需要消耗1-2分钟，期间不能推出</div>
      </Modal>
      <Modal
        title="提示"
        open={delModal}
        onOk={delItem}
        onCancel={() => setDelModal(false)}
        okText="确认"
        cancelText="取消"
      >
        <div>你确定删除这条数据吗</div>
      </Modal>

      <MyTable
        columns={columns}
        dataSource={tableData.list}
        page={tableData.pageNum}
        pageSize={tableData.pageSize}
        total={tableData.list.length}
        rowKey={(record) => record.id}
        scroll={{ x: "max-content" }}

        // onPChange={(pageNum, pageSize) => {
        //   let values = objDefault(headUseForm.current.getFieldsValue())
        //   requerList({
        //     ...values,
        //     pageNum,
        //     pageSize,
        //   })
        // }}
      />
    </div>
  );
}
