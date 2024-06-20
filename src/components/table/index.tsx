

import styles from "./index.module.scss";
import { Pagination, Table, ConfigProvider } from "antd";
import { ExpandableConfig } from "antd/lib/table/interface";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import React from "react";


interface MyTableProps {
  columns: any[];                                                                   // 表格列配置 
  dataSource: any[];                                                                // 表格数据
  pagination?: any;                                                                 // 分页配置
  className?: any;                                                                  // 表格类名
  rowSelection?: any;                                                               // 表格行选择配置
  expandable?: ExpandableConfig<any>;                                               // 表格展开配置
  scroll?: any;                                                                     // 表格滚动配置
  defaultExpandAllRows?: boolean;                                                   // 默认展开所有行
  expandIconColumnIndex?: number;                                                   // 展开图标所在列索引
  indentSize?: number;                                                              // 展开图标缩进大小
  rowKey?: string | ((record: any) => string);                                      // 行key
  size?: SizeType;                                                                  // 表格尺寸  "default" | "middle" | "small"
  onChange?: (pagination: any, filters: any, sorter: any, extra: any) => void;      // 分页、排序、筛选变化时触发

  isTableOutsideClass?: boolean;                                                    // 是否是table外层的class

  page?: number;                                                                    // 当前页码
  pageSize?: number;                                                                // 每页显示条数
  total?: number;                                                                   // 总条数
  disabled?: boolean;                                                               // 是否禁用
  onPChange?: (page: number, pageSize: number) => void;                             // 分页变化时触发
  exceptionBarKey?: any[];                                                          // 是否显示为异常的列表数据
}

export default function MyTable(props: MyTableProps) {

  const { page, pageSize, total, columns, dataSource, disabled, rowSelection, className, rowKey, isTableOutsideClass, expandable, onChange, onPChange, exceptionBarKey } = props;


  // // 行样式设置
  // const setRowClassName = (record: any, index: number) => {

  //   let rowColor = (index % 2 === 0) ? styles.defaultRowStyl : styles.evenRowStyl;//判断单双行，赋予不同样式
  //   exceptionBarKey?.map((key: any) => {
  //     console.log(key);

  //     if (record.key === key) {
  //       rowColor = styles.exceptionRowStyl;
  //     }
  //   })

  //   return rowColor;
  // }

  return (
    <div className={styles.myTable}>
      <div className={`${isTableOutsideClass ? styles.myTableContent : ''}`}>
        <Table expandable={expandable}
          expandIconColumnIndex={props.expandIconColumnIndex}
          scroll={props.scroll}
          rowSelection={rowSelection}
          pagination={false}
          className={className}
          defaultExpandAllRows={props.defaultExpandAllRows}
          size={props.size}
          // rowClassName={setRowClassName}
          // expandedRowClassName={setRowClassName}
          onChange={onChange}
          indentSize={props.indentSize}
          dataSource={dataSource}
          columns={columns}
          rowKey={rowKey}
        />

        {
          pageSize && <div className={styles.pagination}>
            <Pagination disabled={disabled} showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`} showQuickJumper
              current={page}
              total={total}
              pageSize={pageSize}
              onChange={onPChange} />
          </div>
        }

      </div>
    </div>
  );

}

