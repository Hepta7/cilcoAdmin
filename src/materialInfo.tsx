import React from "react";
import MyTable from "./components/table";
import { useSetState } from "ahooks";
import HeadTitle from "./components/headTitle";

const columns = [
  {
    title: "名称",
    dataIndex: "name",
    align: "center",
    // sorter: (a: any, b: any) => new Date(a.createDate).getTime() - new Date(b.createDate).getTime()
  },
  {
    title: "类别",
    dataIndex: "type",
    align: "center",
    // onCell: () => ellipsis(120),
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
    title: "拉伸强度",
    dataIndex: "strength",
    align: "center",
  },
];

function random(min: any, max: any) {
  return Math.random() * (max - min) + min;
}

function generateMaterialData() {
  const dataArray = [];
  for (let i = 0; i < 10; i++) {
    const name = String.fromCharCode(65 + i); // A到J的ASCII码
    let range, type;
    if (i < 3) {
      // A到C

      type = "主料";
    } else if (i >= 3 && i < 8) {
      // D到H

      type = "辅料";
    } else {
      // I到J

      type = "填料";
    }

    const density = `${random(0.2, 2.0).toFixed(1)}g/cm³`;
    const viscosity = `${random(0.2, 2.0).toFixed(2)} Pa·s`;
    const temperature = `${Math.floor(random(0, 30))}°C`;
    const rate = `${random(0, 1).toFixed(1)} m/s`;
    const strength = `${Math.round(random(100, 500))} MPa`;

    dataArray.push({
      id: i,
      name,
      type,

      density,
      viscosity,
      temperature,
      rate,
      strength,
    });
  }
  console.log("dataArray", dataArray);
  return dataArray;
}

// 调用函数并打印结果
// const materials = ;
// console.log(materials);

export default function MaterialInfo() {
  const [tableData, setTableData] = useSetState({
    list: generateMaterialData() as any,
    pageNum: 1,
    pageSize: 10,
    total: 10,
  });

  return (
    <div>
      <HeadTitle title="原材料信息" />

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
