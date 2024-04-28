  import React, { useEffect, useState } from "react";
  import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
  import { Button, Form, Input, InputNumber, Modal, Select, Switch, Upload, notification } from "antd";
  import { apiCreate, apiUpdate } from "../services/product.services";
  import { apiSearchCategory } from "../services/category.services";
  import CategorytType from "../models/category.model";


  type NotificationType = 'success' | 'info' | 'warning' | 'error';
  const { Option } = Select;

  const ProductModel = (props: any) => {
    const [categories, setCategories] = useState<CategorytType[]>([]);// State để lưu trữ danh sách chuyên mục
      const [categoryName, setCategoryName] = useState("");
      const [form] = Form.useForm();
      const [api, contextHolder] = notification.useNotification();

      // Sử dụng useEffect để lấy danh sách chuyên mục khi component được render
      useEffect(() => {
          const fetchData = async () => {
              try {
                  const categoriesData = await apiSearchCategory({});
                  setCategories(categoriesData);
              } catch (error) {
                  console.error('Error fetching categories:', error);
              }
          };
          fetchData();
      }, []);

      const upload_props = {
          name: 'file',
          action: 'https://localhost:44366/api/SanPham/upload',
          headers: {
              authorization: "Bearer",
          },
          onChange(info: any) {
              if (info.file.status === 'done') {
                  form.setFieldValue("anhDaiDien", info.fileList[0].response.filePath);
              }
          },
      };

      const openNotificationWithIcon = (type: NotificationType, content: string) => {
          api[type]({
              message: 'Thông báo',
              description: content,
          });
      };
      useEffect(() => {
        if (props.initialValues) {
            form.setFieldsValue(props.initialValues);
            // Lấy tên chuyên mục từ danh sách chuyên mục và lưu vào state khi initialValues thay đổi
            const selectedCategory = categories.find((category: any) => category.maChuyenMuc === props.initialValues.machuyenMuc);
            if (selectedCategory) {
                setCategoryName(selectedCategory.tenChuyenMuc);
            }
        }
    }, [props.initialValues, form, categories]);
    
      const handleOk = () => {
          form.validateFields()
              .then(async (values: any) => {
                  const dataPost = {
                      ...values,
                      anhDaiDien: `../anhhoa/${values.anhDaiDien}`
                  };
                  if (props.productid) {
                      props.handleCancelIUModal();
                      await apiUpdate(dataPost);
                      props.fetchData();
                      openNotificationWithIcon('success', "Cập nhật sản phẩm thành công!");
                  } else {
                      props.handleCancelIUModal();
                      await apiCreate(dataPost);
                      props.fetchData();
                      openNotificationWithIcon('success', "Thêm sản phẩm thành công!");
                  }
              })
              .catch(() => {
                  openNotificationWithIcon('warning', "Thông tin sản phẩm chưa đủ!");
              });
      };

      const handleCancel = () => {
          props.handleCancelIUModal();
      };

      return (
          <>
              {contextHolder}
              <Modal
                  title="Thêm Mới Sản Phẩm"
                  visible={props.isOpenIUModal}
                  onOk={handleOk}
                  onCancel={handleCancel}
              >
                  <Form form={form}>
                        <Form.Item
                          label="Mã Sản Phẩm"
                          name="maSanPham"
                        //   style={{visibility : "hidden"}}
                        >
                          <Input />
                      </Form.Item>
                      <Form.Item
                          label="Tên sản phẩm"
                          name="tenSanPham"
                          rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
                      >
                          <Input />
                      </Form.Item>
                      <Form.Item
                          label="Hình ảnh"
                          name="anhDaiDien"
                          rules={[{ required: true, message: 'Vui lòng chọn hình ảnh!' }]}
                      >
                          <Upload {...upload_props} >
                              <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
                          </Upload>
                      </Form.Item>
                      <Form.Item
                        label="Chuyên mục"
                        name="machuyenMuc"
                        rules={[{ required: true, message: 'Vui lòng chọn chuyên mục!' }]}
                    >
                        {/* Hiển thị tên chuyên mục nếu đã lấy được từ state */}
                        {categoryName ? (
                            <Input value={categoryName} disabled />
                        ) : (
                            <Select>
                                {categories.map((category: any) => (
                                    <Option key={category.maChuyenMuc} value={category.maChuyenMuc}>
                                        {category.tenChuyenMuc}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    </Form.Item>
                      <Form.Item
                          label="Giá"
                          name="gia"
                          rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
                      >
                          <InputNumber />
                      </Form.Item>
                      <Form.Item
                          label="Giảm giá"
                          name="giaGiam"
                          rules={[{ required: true, message: 'Vui lòng nhập giảm giá!' }]}
                      >
                          <InputNumber />
                      </Form.Item>
                      <Form.Item
                          label="Số lượng"
                          name="soLuong"
                          rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                      >
                          <InputNumber />
                      </Form.Item>
                      <Form.Item
                          label="Lượt xem"
                          name="luotXem"
                          rules={[{ required: true, message: 'Vui lòng nhập lượt xem!' }]}
                      >
                          <InputNumber />
                      </Form.Item>
                      <Form.Item
                          label="Đặc biệt"
                          name="dacBiet"
                          rules={[{ required: true, message: 'Vui lòng chọn đặc biệt!' }]}
                      >
                          <Switch />
                      </Form.Item>
                      <Form.Item
                        label="Chi tiết sản phẩm"
                      >
                        <Input.Group compact>
                          <Form.Item
                            name={['list_json_chitietsanpham', 0, 'moTa']}
                            noStyle
                            rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                          >
                            <Input placeholder="Mô tả" style={{ width: '50%' }} />
                          </Form.Item>
                          <Form.Item
                            name={['list_json_chitietsanpham', 0, 'chiTiet']}
                            noStyle
                            rules={[{ required: true, message: 'Vui lòng nhập chi tiết!' }]}
                          >
                            <Input placeholder="Chi tiết" style={{ width: '30%' }} />
                          </Form.Item>
                          <Form.Item
                            name={['list_json_chitietsanpham', 0, 'maNhaSanXuat']}
                            noStyle
                            rules={[{ required: true, message: 'Vui lòng nhập mã nhà sản xuất!' }]}
                          >
                            <Input placeholder="Mã nhà sản xuất" style={{ width: '20%' }} />
                          </Form.Item>
                        </Input.Group>
                      </Form.Item>

                  </Form>
              </Modal>
          </>
      )
  };

  export default ProductModel;

