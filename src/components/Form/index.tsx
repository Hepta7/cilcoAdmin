import styles from "./index.module.scss"
import { Button, Checkbox, Form, Input, Radio, Select, DatePicker, Upload, Modal, message } from 'antd';
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import TextArea from "antd/lib/input/TextArea";
import React from "react";

const { Option } = Select;
const { RangePicker } = DatePicker;

interface SelectItem {
    id: number | string,
    name: string
}

interface ItemType {
    key?: string,               // 表单返回的字段
    type: string,               // 表单类型
    title?: string,              // 表单标题·
    placeholder?: string;       // 表单提示文字
    isRequired?: boolean;       // 是否必填
    DoesNotNeedToEnd?: boolean; // 是否需要结束时间
    selectList?: SelectItem[];  // 下拉框数据            
    initValue?: any;            // 表单默认值
    tipText?: string;           // 表单提示文字
    inputType?: any;            // 输入框类型
    pattern?: RegExp;           // 输入框正则
    maxLength?: number;         // 输入框最大长度
    minLength?: number;         // 输入框最小长度
    render?: (item: any, fieldsValue: any, form: any) => any;         // 自定义渲染
    onSelect?: (value: any) => void; // 下拉框改变时回调
    mode?: "multiple" | "tags" | any // 下拉框模式
    disabled?: boolean;              // 是否禁用
    valuePropName?: string | boolean;  // 表单值字段类型
    onChange?: (value: any, fieldsValue: any) => any;    // 表单值改变时回调 (它)
    disabledDate?: (date: any) => any;  // 禁用日期
    isHide?: boolean;                  // 是否显示
    suffix?: any;                      // input 后缀 追加内容
    dateType?: "YYYY-MM-DD HH:mm:ss" | "YYYY-MM-DD" | any;// 日期类型
    onDropdownVisibleChange?: (value: any) => void; // 下拉框展开收起是触发
}

interface PropsType {
    formList: ItemType[]                   // from 表单的配置
    bottomClass?: string                   // from 表单底部的样式
    cancelText?: string                    // 取消按钮的文字
    confirmText?: string                   // 确认按钮的文字
    fieldsValue?: any                      // from 表单的默认值
    onCancel?: (value: any) => void        // 取消按钮的回调
    onFinishFailed?: (value: any) => void  // 确认按钮的回调
    onFinish: (value: any) => void         // 确认按钮保单错误的回调
    validator?: (rule: any, value: any, callback: any) => any;   // 自定义校验
    useForm?: any                          // 是否使用form
    bottomIsShow?: boolean                 // 是否显示底部
    arrangement?: "column" | "row"         // 排列方式
}


function MyForm(props: PropsType, ref: any) {

    const [form] = Form.useForm();  // 获取form表单实例
    let { formList, onFinish, onFinishFailed, onCancel, validator, cancelText, bottomClass, confirmText, fieldsValue, bottomIsShow = true, arrangement = "column" } = props

    // 设置表单的默认值
    useEffect(() => {
        form.setFieldsValue(fieldsValue)
    }, [fieldsValue])

    /**渲染from表单中的每一项*/
    function renderFromItem(item: any) {

        switch (item.type) {
            case "input":
                return (
                    <Input
                        type={item.inputType || "text"}
                        suffix={item.suffix || ''}
                        maxLength={item.maxLength}
                        minLength={item.minLength}
                        disabled={item.disabled}
                        placeholder={item.placeholder}
                        // onPressEnter={(e) => e.preventDefault()}
                        autoComplete="off" // 取消inpput 的默认提示
                    />
                )

            case "radio":
                return (
                    <Radio.Group disabled={item.disabled} >
                        {
                            item?.radioList.map((item: any) => {
                                return <Radio key={item.name} value={item.value} >{item.name}</Radio>
                            })
                        }
                    </Radio.Group>
                )

            case "select":
                return (
                    <Select
                        disabled={item.disabled}
                        showSearch
                        mode={item.mode}
                        onChange={(value, option) => item?.onSelect?.(value, option)}
                        onDropdownVisibleChange={(e) => item?.onDropdownVisibleChange?.(e)}
                        placeholder={item.placeholder}
                        showArrow={true}
                        maxTagTextLength={6}
                        maxTagCount='responsive'
                        getPopupContainer={triggerNode => triggerNode.parentNode}
                    >
                        {
                            item.selectList?.map((item: any, idx: number) => {
                                if (!item.disabled)
                                    return <Option disabled={item.disabled} key={item.id} value={item.id}>{item.name}</Option>
                            })
                        }
                    </Select >
                )

            case "date":
                if (item.DoesNotNeedToEnd) {
                    return (
                        <DatePicker
                            disabledDate={item.disabledDate}
                            disabled={item.disable} placeholder={item.placeholder}
                        // showTime
                        />
                    )
                }
                return (
                    <RangePicker
                        disabledDate={item.disabledDate}
                        disabled={[item.disabled, item.disabled]}
                        showTime={item.dateType ? false : true}
                        format={item.dateType || "YYYY-MM-DD HH:mm:ss"}
                    />)


            case "textarea":
                return (
                    <TextArea
                        maxLength={item.maxLength}
                        minLength={item.minLength}
                        placeholder={item.placeholder} style={{ height: 94, }} />
                )

            case "file":
                return (<Upload>选择文件</Upload>)


            case "text":
                return (
                    <div className={styles.visualText}>
                        {item?.render?.(fieldsValue, item)}
                    </div>
                )

            case "textAreaRead":
                return (
                    <div className={styles.visualTextAreaRead}>
                        {item?.render?.(fieldsValue, item)}
                    </div>
                )

            case "else":  // 自定义
                return item?.render?.(fieldsValue, item)

            default:
                break;
        }
    }

    return (
        <div className={styles.myform}>
            <Form
                onFinish={(fields) => {
                    let err = [undefined, null]
                    // 追加默认值 ""
                    for (const key in fields) {
                        if (err.includes(fields[key])) fields[key] = ""
                    }
                    onFinish(fields)
                }}
                onFinishFailed={onFinishFailed}
                form={form}
                ref={ref}
            >
                <div className={arrangement === "column" ? styles.formContColumn : styles.formContRow}>
                    {
                        formList.map((item: any, index: number) => {
                            if (item?.isHide === undefined || item.isHide === false)
                                return (
                                    <Form.Item
                                        label={item.title}
                                        name={item.key}
                                        initialValue={item.initValue}
                                        key={index}
                                        getValueFromEvent={
                                            item.onChange && ((e) => item?.onChange?.(e, form.getFieldsValue())) ||
                                            item.type === "input" && ((e) => e.target.value.replace(/\s*/g, "")) ||
                                            undefined
                                        }
                                        rules={[
                                            {
                                                validator: validator,
                                                required: item.isRequired,
                                                message: item.tipText || "请选择/输入 " + item.title,
                                                pattern: item.pattern || /[\s\S]*/
                                            }
                                        ]}
                                    >
                                        {renderFromItem(item)}
                                    </Form.Item>
                                )
                        })
                    }
                    {
                        arrangement === "row" && (
                            <div className={`${styles.bottomRow} ${bottomClass || ""}`}>
                                {
                                    bottomIsShow && (
                                        <div>
                                            <Button onClick={() => onCancel?.(form)}>{cancelText || "取消"} </Button>
                                            <Button type="primary" htmlType="submit">{confirmText || "提交"} </Button>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }

                </div>
                {
                    arrangement === "column" && (
                        <div className={`${styles.bottomCloumn} ${bottomClass || ""}`}>
                            {
                                bottomIsShow && (
                                    <div>
                                        <Button onClick={() => onCancel?.(form)}>{cancelText || "取消"} </Button>
                                        <Button type="primary" htmlType="submit">{confirmText || "提交"} </Button>
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </Form >


        </div >
    )
}

export default forwardRef(MyForm)