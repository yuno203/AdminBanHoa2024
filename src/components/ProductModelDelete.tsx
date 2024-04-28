import React, { useEffect, useState } from "react";
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Modal, Select, Switch, Upload, notification } from "antd";
import { apiDelete} from "../services/product.services";
type NotificationType = 'success' | 'info' | 'warning' | 'error';
const ProductModelDelete = (props : any) => {
    const [api, contextHolder] = notification.useNotification();
    const handleOk = async () => {
        try {
            props.handleCancelDeleteModal();
            await apiDelete({ MaSanPham: props.productid });
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

export default ProductModelDelete
