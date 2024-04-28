import React, { useEffect, useState } from "react";
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Modal, Select, Switch, Upload, notification } from "antd";
import { apiDelete} from "../services/category.services";
type NotificationType = 'success' | 'info' | 'warning' | 'error';
const CategoryModelDelete = (props : any) => {
    const [api, contextHolder] = notification.useNotification();
    const handleOk = async () => {
        try {
            props.handleCancelDeleteModal();
            await apiDelete({ MaChuyenMuc: props.categoryid });
            props.fetchData();
            openNotificationWithIcon('success');
        } catch (error) {
            console.error('Error deleting product:', error);
            openNotificationWithIcon('error');
        }
    };
    
    const handleCancel = () => {
        props.handleCancelDeleteModal();
      };

      function openNotificationWithIcon(type: NotificationType) {
        notification[type]({
            message: type === 'success' ? 'Thành công' : 'Lỗi',
            description: type === 'success' ? 'Xóa sản phẩm thành công!' : 'Xóa sản phẩm thất bại!',
        });
    }
    
    return (
        <>
         {contextHolder}
        <Modal title="Bạn có muốn xóa nó?"
        open = {props.isOpenDeleteModal}
        onOk={handleOk}
        onCancel={handleCancel}>

        </Modal>
        </>
    )
}

export default CategoryModelDelete
