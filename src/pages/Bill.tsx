import React, { useState, useEffect } from "react";
import { ColumnsType, TableParams } from "../models/config.model";
import { stringify } from "querystring";
import BillType from "../models/bill.models";
import { Breadcrumb, Button, DatePicker, Flex, Form, Input, Modal, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { apiSearch } from "../services/bill.services";
import moment from "moment";
const Bill: React.FC= ()=>{

    const [data, setData] = useState<BillType[]>();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
          current: 1,
          pageSize: 5,
        },
      });
      const [isModalVisible, setIsModalVisible] = useState(false);
      const fetchData = async () => {
        setLoading(true);
        let results = await apiSearch({
          page: tableParams.pagination?.current,
          pageSize: tableParams.pagination?.pageSize,
        });
        setData(results.data);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: results.totalItems,
          },
        });
      };
      const columns: ColumnsType<BillType> = [
        {
          title: "Mã hóa đơn",
          dataIndex: "maHoaDon",
        },
        {
          title: "Tên khách hàng",
          dataIndex: "tenKH",
          width: "200px",
    
        },
        {
          title: "Địa chỉ",
          dataIndex: "diachi",
        },
        {
          title: "Email",
          dataIndex: "email",
          
        },
        {
            title: "Số điện thoại",
            dataIndex: "sdt",
        },
        {
            title: "Địa chỉ giao hàng",
            dataIndex: "diaChiGiaoHang",
        },
        {
          title: "Hạnh động",
          width: "120px",
          render: (_, record) => (
            <Flex  >
              <Button
               
              >
                Sửa
              </Button>  
              <Button style={{marginLeft:'5px'}}
               
              >
                Xóa
              </Button>
            </Flex>
          ),
        },
      ];
      const showModal = () => {
        setIsModalVisible(true);
    };

    // Hàm xử lý sự kiện khi nhấn nút "Đóng" trên modal
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        fetchData();
    }, [JSON.stringify(tableParams)]);

    return(
        <>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
            <Breadcrumb.Item>Quản lý hóa đơn</Breadcrumb.Item>
        </Breadcrumb>
        <Button type="primary" onClick={showModal}>Thêm mới</Button>
        <Modal
            title="Thêm mới hóa đơn"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null} // Không hiển thị footer trên modal
          >  
            <Form >
              <Form.Item label="Tên khách hàng" name="tenKH">
                <Input />
              </Form.Item>
              <Form.Item label="Địa chỉ" name="diaChi">
                <Input/>
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input  />
              </Form.Item>
             <Form.Item label="Địa chỉ nhận hàng" name="diaChiNhanHang">
                <Input/>
             </Form.Item>
             <Form.Item label="Ngày Tạo" name="ngayTao">
              <DatePicker
                placeholder="Chọn ngày tạo"
                format="DD/MM/YYYY" // Định dạng hiển thị ngày
                defaultValue={moment()} // Giá trị mặc định (nếu cần)
              />
              </Form.Item>
              <Form.Item label="Ngày Duyệt" name="ngayDuyet">
              <DatePicker
                placeholder="Chọn ngày duyệt"
                format="DD/MM/YYYY" // Định dạng hiển thị ngày
                defaultValue={moment()} // Giá trị mặc định (nếu cần)
              />
              </Form.Item>
              <Form.Item label="Số điện thoại" name="sdt">
                <Input />
              </Form.Item>
             <Button type="primary">Lưu</Button>
            </Form>
          </Modal>
        <Table
        columns={columns}
        dataSource={data}
        pagination={tableParams.pagination}
        />
        </>
        
    );
};
export default Bill;