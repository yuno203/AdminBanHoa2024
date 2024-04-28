import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Modal, Select, Switch, Upload, notification } from "antd";
import { apiCreate, apiUpdate } from "../services/user.services";



type NotificationType = 'success' | 'info' | 'warning' | 'error';
const UserModel = (props: any) => {

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
                if (props.userid) {
                    props.handleCancelIUModal();
                    await apiUpdate(dataPost);
                    props.fetchData();
                    openNotificationWithIcon('success', "Cập nhật khách hàng thành công!");
                } else {
                    props.handleCancelIUModal();
                    await apiCreate(dataPost);
                    props.fetchData();
                    openNotificationWithIcon('success', "Thêm khách hàng thành công!");
                }
            })
            .catch(() => {
                openNotificationWithIcon('warning', "Thông tin khách hàng chưa đủ!");
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
                title="Thêm Mới Khách Hàng"
                visible={props.isOpenIUModal}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form}>
                      <Form.Item
                        label="Mã khách hàng"
                        name="id"
                        style={{display: "none"}}
                      >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Tên khách hàng"
                        name="tenKH"
                        rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng!' }]}
                    >
                        <Input />
                    </Form.Item>
            
                    <Form.Item
                        label="Địa chỉ"
                        name="diaChi"
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Giới tính"
                        name="gioiTinh"
                        valuePropName="checked" // This is important to ensure the Switch works correctly with form values
                        rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
                    >
                        <Switch checkedChildren="Nam" unCheckedChildren="Nữ" />
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="sdt"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                    >
                        <Input />
                    </Form.Item>
                  
                
                  

                </Form>
            </Modal>
        </>
    )
};

export default UserModel;

