import React, { useEffect, useRef, useState } from "react";
import MyTable from "../components/table";
import { useSetState, useTitle } from "ahooks";
import { PlusOutlined, DownloadOutlined } from "@ant-design/icons";
// import MyForm from "../components/Form/index";
import { Button, Modal, Table, message } from "antd";
import styles from "../App.module.scss";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
import { Bus, randomInt } from "../utils";
import AddProductModal from "../components/addProductModal";
import ResultModal from "../components/resultModal";

let list = [] as any;

export default function Performance() {
  const [title, setTitle] = useState("");
  const [delModal, setDelModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [resultModal, setResuleModal] = useState(false);
  const [itemIdx, setItemIdx] = useState(null) as any;
  const [hint, setHint] = useState(false);
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

  useEffect(() => {
    let num = randomInt(1, 10);
    let arr = [];
    for (let i = 0; i < num; i++) {
      arr.push({
        id: i + 1,
        name: `产品${i + 1}`,
        density: `${randomInt(1, 5)}g/cm³`,
        viscosity: `${randomInt(0.3, 1)} Pa·s`,
        temperature: `${randomInt(10, 50)}° C`,
        rate: `${randomInt(0, 1.5)} m/s`,
        bendstrength: `${randomInt(100, 500)} MPa`,
        strength: `${randomInt(100, 500)} MPa`,
      });
    }
    list = arr;
    setTableData({ list:list  });
  }, []);

  useEffect(() => {
    Bus.on("headSearch", (value) => {
      // 使用filter方法来更新filteredItems
      const filtered = list.filter((item: any) => {
        return item.name.toLowerCase().includes(value.toLowerCase());
      });
      setTableData({ list: filtered });
    });
  }, []);

  const openModal = (record: any) => {
    console.log("record", record);
    setHint(false);
    setResuleModal(true);
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
            style={{ color: "#008A16" }}
            onClick={() => {
              setHint(true);
              setTitle(record.name);
            }}
          >
            输出配比
          </div>
          <div
            style={{ color: "#008A16", marginLeft: 15, cursor: "pointer" }}
            onClick={() => {
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

  const delItem = () => {
    let list = tableData.list.slice();
    list.splice(itemIdx, 1);
    setTableData({ list });
    setDelModal(false);
  };

  const addCancel = () => {
    setAddModal(false);
  };

  const addConfirm = (values: any) => {
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
    setAddModal(false);
  };

  const resultCancel = () => {
    setResuleModal(false);
  };

  return (
    <div id={styles.Performance}>
      <div className={styles.tableContent}>
        <div className={styles.tableTitle}>
          <div className={styles.title}>产品信息 </div>
          <Button
            style={{
              background: "#008A16",
              color: "#FFF",
              border: "none",
            }}
            icon={<PlusOutlined />}
            size="large"
            onClick={() => setAddModal(true)}
          >
            新增产品
          </Button>
        </div>

        <MyTable
          columns={columns}
          dataSource={tableData.list}
          page={tableData.pageNum}
          pageSize={tableData.pageSize}
          total={tableData.list.length}
          rowKey={(record) => record.id}
          scroll={{ x: "max-content" }}
          onPChange={(pageNum, pageSize) => {
            // setTableData({ list: list.splice(pageNum * 10, 10) });
            // let values = objDefault(headUseForm.current.getFieldsValue())
            // requerList({
            //   ...values,
            //   pageNum,
            //   pageSize,
            // })
          }}
        />
      </div>

      <AddProductModal
        open={addModal}
        onCancel={addCancel}
        onConfirm={addConfirm}
      />

      <ResultModal title={title} open={resultModal} onCancel={resultCancel} />

      <Modal
        title="提示"
        open={hint}
        onOk={openModal}
        onCancel={() => setHint(false)}
        okText="确认"
        centered
        cancelText="取消"
      >
        <div>计算配比需要消耗1-2分钟，期间不能退出</div>
      </Modal>

      <Modal
        title="提示"
        open={delModal}
        centered
        onOk={delItem}
        onCancel={() => setDelModal(false)}
        okText="确认"
        cancelText="取消"
      >
        <div>你确定要删除这条数据吗</div>
      </Modal>
    </div>
  );
}
