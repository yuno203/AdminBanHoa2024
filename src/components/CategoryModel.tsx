import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Modal, Select, Switch, Upload, notification } from "antd";
import { apiCreate, apiUpdate } from "../services/category.services";



type NotificationType = 'success' | 'info' | 'warning' | 'error';
const CategoryModel = (props: any) => {

    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();

   
    const openNotificationWithIcon = (type: NotificationType, content: string) => {
        api[type]({
            message: 'Thông báo',
            description: content,
        });
    };

    const handleOk = () => {
        form.validateFields()
            .then(async (values: any) => {
                const dataPost = {
                    ...values,
                };
                if (props.categoryid) {
                    props.handleCancelIUModal();
                    await apiUpdate(dataPost);
                    props.fetchData();
                    openNotificationWithIcon('success', "Cập nhật chuyên mục thành công!");
                } else {
                    props.handleCancelIUModal();
                    await apiCreate(dataPost);
                    props.fetchData();
                    openNotificationWithIcon('success', "Thêm chuyên mục thành công!");
                }
            })
            .catch(() => {
                openNotificationWithIcon('warning', "Thông tin sản phẩm chưa đủ!");
            });
    };
    useEffect(() => {
        if (props.initialValues) {
            form.setFieldsValue(props.initialValues);
           
        }
    }, [props.initialValues, form]);
    const handleCancel = () => {
        props.handleCancelIUModal();
    };

    return (
        <>
            {contextHolder}
            <Modal
                title="Thêm Mới Chuyên Mục"
                visible={props.isOpenIUModal}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form}>
                      <Form.Item
                        label="Mã chuyên mục"
                        name="maChuyenMuc"
                        style={{display: "none"}}
                      >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Tên chuyên mục"
                        name="tenChuyenMuc"
                        rules={[{ required: true, message: 'Vui lòng nhập tên chuyên mục!' }]}
                    >
                        <Input />
                    </Form.Item>
            
                    <Form.Item
                        label="Nội dung"
                        name="noiDung"
                        rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
                    >
                        <Input />
                    </Form.Item>
                  
                    <Form.Item
                        label="Đặc biệt"
                        name="dacBiet"
                        rules={[{ required: true, message: 'Vui lòng chọn đặc biệt!' }]}
                    >
                        <Switch />
                    </Form.Item>
                  

                </Form>
            </Modal>
        </>
    )
};

export default CategoryModel;

