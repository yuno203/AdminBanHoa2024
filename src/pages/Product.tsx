import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Flex, Form, Input, InputNumber, Modal, Switch, Table, UploadFile, UploadProps, notification } from "antd";
import { apiSearch } from "../services/product.services";
import ProductType from "../models/product.model";
import { ColumnsType, TableProps } from "antd/es/table";
import { TableParams } from "../models/config.model";
import { Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ProductModel from "../components/ProductModel";
import ProductModelDelete from "../components/ProductModelDelete";
// import UserModel from "../components/UserModel";
// import UserDelete from "../components/UserDelete";


const Product: React.FC = () => {
  const [productid, setProductid] = useState("");
  const [isOpenIUModal, setIsOpenIUModal] = useState(false);
  const [isOpenDeleteModal, setisOpenDeleteModal] = useState(false);
  const [data, setData] = useState<ProductType[]>();
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
      const columns: ColumnsType<ProductType> = [
        {
          title: "STT",
          render: (_,__,index) => index +1,
        },
        {
          title: "Mã sản phẩm",
          dataIndex: "maSanPham",
        },
        {
          title: "Tên sản phẩm",
          dataIndex: "tenSanPham",
          width: "200px",

        },
        {
          title: "Hình ảnh",
          dataIndex: "anhDaiDien",
          render: (anhDaiDien: string) => <img src={anhDaiDien} alt="Hình ảnh" style={{ width: "50px", height: "auto" }} />,
          
        },
        {
          title: "Số Lượng",
          dataIndex: "soLuong",
          
        },
        {
            title: "Giá",
            dataIndex: "gia",
        },
        {
          title: "Hạnh động",
          width: "120px",
          render: (_, record) => (
            <Flex justify="center" >
              <Button onClick= {()=> {setIsOpenIUModal(true);setProductid(record.maSanPham)}} 
              >
                Sửa
              </Button >  
              <Button style={{marginLeft:'5px'}}
              onClick={() => {setisOpenDeleteModal(true); setProductid(record.maSanPham)}}
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
            <Button type="primary" onClick={() => {setIsOpenIUModal(true); setProductid("")}}>
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
       <ProductModel isOpenIUModal={isOpenIUModal} fetchData={fetchData} handleCancelIUModal={handleCancelIUModal} productid={productid} 
        initialValues={data?.find(item => item.maSanPham === productid)}
        />
        <ProductModelDelete isOpenDeleteModal={isOpenDeleteModal} fetchData={fetchData} handleCancelDeleteModal={handleCancelDeleteModal} productid={productid} 
        initialValues={data?.find(item => item.maSanPham === productid)}
        />
        </>
      );
};


export default Product;
