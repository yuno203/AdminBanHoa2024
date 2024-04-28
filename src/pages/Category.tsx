import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Flex, Form, Input, InputNumber, Modal, Switch, Table, UploadFile, UploadProps, notification } from "antd";
import { apiSearch } from "../services/category.services";
import CategoryType from "../models/category.model";
import { ColumnsType, TableProps } from "antd/es/table";
import { TableParams } from "../models/config.model";
import { Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ProductModel from "../components/ProductModel";
import ProductModelDelete from "../components/ProductModelDelete";
import CategoryModel from "../components/CategoryModel";
import CategoryModelDelete from "../components/CategoryModelDelete";


const Category: React.FC = () => {
  const [categoryid, setCategoryid] = useState("");
  const [isOpenIUModal, setIsOpenIUModal] = useState(false);
  const [isOpenDeleteModal, setisOpenDeleteModal] = useState(false);
  const [data, setData] = useState<CategoryType[]>();
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
      const columns: ColumnsType<CategoryType> = [
        {
          title: "STT",
          render: (_,__,index) => index +1,
        },
        {
          title: "Mã chuyên mục",
          dataIndex: "maChuyenMuc",
        },
        {
          title: "Tên chuyên mục",
          dataIndex: "tenChuyenMuc",
          width: "200px",

        },
    
        {
          title: "Nội dung ",
          dataIndex: "noiDung",
          
        },
        {
            title: "Đặc biệt",
            dataIndex: "dacBiet",
        },
        {
          title: "Hạnh động",
          width: "120px",
          render: (_, record) => (
            <Flex justify="center" >
              <Button onClick= {()=> {setIsOpenIUModal(true);setCategoryid(record.maChuyenMuc)}} 
              >
                Sửa
              </Button >  
              <Button style={{marginLeft:'5px'}}
              onClick={() => {setisOpenDeleteModal(true); setCategoryid(record.maChuyenMuc)}}
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
            <Button type="primary" onClick={() => {setIsOpenIUModal(true); setCategoryid("")}}>
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
       <CategoryModel isOpenIUModal={isOpenIUModal} fetchData={fetchData} handleCancelIUModal={handleCancelIUModal} categoryid={categoryid} 
        initialValues={data?.find(item => item.maChuyenMuc === categoryid)}
        />
        <CategoryModelDelete isOpenDeleteModal={isOpenDeleteModal} fetchData={fetchData} handleCancelDeleteModal={handleCancelDeleteModal} categoryid={categoryid} 
        initialValues={data?.find(item => item.maChuyenMuc === categoryid)}
        />
        </>
      );
};


export default Category;
