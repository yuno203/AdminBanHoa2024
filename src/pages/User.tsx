import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Flex, Form, Input, InputNumber, Modal, Switch, Table, UploadFile, UploadProps, notification } from "antd";
import { apiSearch } from "../services/user.services";
import UserType from "../models/user.model";
import { ColumnsType, TableProps } from "antd/es/table";
import { TableParams } from "../models/config.model";
import UserModel from "../components/UserModel";
import UserModelDelete from "../components/UserModelDelete";


const User: React.FC = () => {
  const [userid, setUserid] = useState("");
  const [isOpenIUModal, setIsOpenIUModal] = useState(false);
  const [isOpenDeleteModal, setisOpenDeleteModal] = useState(false);
  const [data, setData] = useState<UserType[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });
 
   
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
     
        console.log(data)
      const columns: ColumnsType<UserType> = [
        {
          title: "STT",
          render: (_,__,index) => index +1,
        },
        {
          title: "Mã người dùng",
          dataIndex: "id",
        },
        {
          title: "Tên khách hàng",
          dataIndex: "tenKH",
          width: "200px",

        },
    
        {
          title: "Địa chỉ ",
          dataIndex: "diaChi",
          
        },
        {
            title: "Số điện thoại",
            dataIndex: "sdt",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
          title: "Hạnh động",
          width: "120px",
          render: (_, record) => (
            <Flex justify="center" >
              <Button onClick= {()=> {setIsOpenIUModal(true);setUserid(record.id)}} 
              >
                Sửa
              </Button >  
              <Button style={{marginLeft:'5px'}}
              onClick={() => {setisOpenDeleteModal(true); setUserid(record.id)}}
              >
                Xóa
              </Button>
            </Flex>
          ),
        },
      ];

      useEffect(() => {
        fetchData();
      }, [JSON.stringify(tableParams)]);

      const handleTableChange: TableProps["onChange"] = (
        pagination,
        filters,
        sorter
      ) => {
        setTableParams({
          pagination,
          filters,
          ...sorter,
        });
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
          setData([]);
        }
      };
      const handleCancelIUModal = () => {
        setIsOpenIUModal(false);
      };
      const handleCancelDeleteModal = () => {
        setisOpenDeleteModal(false);
      };
      return (
        <>
          <Flex justify="space-between" align="center">
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
              <Breadcrumb.Item>Quản lý sản phẩm</Breadcrumb.Item>
            </Breadcrumb>
            <Button type="primary" onClick={() => {setIsOpenIUModal(true); setUserid("")}}>
            Thêm Mới
          </Button >
        
          </Flex>

          <Table
            columns={columns}
            dataSource={data}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange} 
          />
       <UserModel isOpenIUModal={isOpenIUModal} fetchData={fetchData} handleCancelIUModal={handleCancelIUModal} userid={userid} 
        initialValues={data?.find(item => item.id === userid)}
        />
        <UserModelDelete isOpenDeleteModal={isOpenDeleteModal} fetchData={fetchData} handleCancelDeleteModal={handleCancelDeleteModal} userid={userid} 
        initialValues={data?.find(item => item.id === userid)}
        />
        </>
      );
};


export default User;
