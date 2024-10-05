import React, { useEffect, useState } from "react";
import { List, Card, Spin, message, Button, Modal, Form, Input, Select, InputNumber, Upload } from "antd";
import axios from 'axios';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const MyHotels = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [currentHotel, setCurrentHotel] = useState(null);
    const [form] = Form.useForm();
    const [uploading, setUploading] = useState(false);
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        const fetchMyHotels = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setError('No token found, please log in.');
                setLoading(false);
                message.error('No token found, please log in.');
                return;
            }

            try {
                const response = await axios.get('http://localhost:8081/api/hotels/owner', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    setHotels(response.data || []);
                } else {
                    setError(`Failed to fetch your hotels: ${response.data.message}`);
                    message.error(`Failed to fetch your hotels: ${response.data.message}`);
                }
            } catch (err) {
                console.error(err);
                setError('An error occurred while fetching your hotels.');
                message.error('An error occurred while fetching your hotels.');
            } finally {
                setLoading(false);
            }
        };

        fetchMyHotels();
    }, []);

    const showUpdateModal = (hotel) => {
        setCurrentHotel(hotel);
        form.setFieldsValue({
            name: hotel.name,
            location: hotel.location,
            description: hotel.description,
            amenities: hotel.amenities.join(', '),
            // Rooms can be handled separately
        });
        // Load existing images into fileList if needed
        setFileList([]);
        setIsUpdateModalVisible(true);
    };

    const handleUpdateCancel = () => {
        setIsUpdateModalVisible(false);
        setCurrentHotel(null);
        form.resetFields();
        setFileList([]);
    };

    const handleDelete = async (hotelId) => {
        const confirm = window.confirm('Are you sure you want to delete this hotel?');
        if (!confirm) return;

        const token = localStorage.getItem('token');
        if (!token) {
            message.error('No token found, please log in.');
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:8081/api/hotels/${hotelId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                message.success('Hotel deleted successfully.');
                setHotels(prevHotels => prevHotels.filter(hotel => hotel._id !== hotelId));
            } else {
                message.error(`Failed to delete hotel: ${response.data.message}`);
            }
        } catch (err) {
            console.error(err);
            message.error('An error occurred while deleting the hotel.');
        }
    };

    const handleUpdateSubmit = async (values) => {
        const token = localStorage.getItem('token');
        if (!token) {
            message.error('No token found, please log in.');
            return;
        }

        setUploading(true);

        try {
            // Prepare form data
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('location', values.location);
            formData.append('description', values.description);
            formData.append('amenities', values.amenities);
            // Handle rooms if included

            // Append new images
            fileList.forEach((file) => {
                formData.append('images', file.originFileObj);
            });

            const response = await axios.put(`http://localhost:8081/api/hotels/${currentHotel._id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                message.success('Hotel updated successfully.');
                // Update the hotel in the local state
                setHotels(prevHotels => prevHotels.map(hotel => hotel._id === currentHotel._id ? response.data : hotel));
                setIsUpdateModalVisible(false);
                setCurrentHotel(null);
                form.resetFields();
                setFileList([]);
            } else {
                message.error(`Failed to update hotel: ${response.data.message}`);
            }
        } catch (err) {
            console.error(err);
            message.error('An error occurred while updating the hotel.');
        } finally {
            setUploading(false);
        }
    };

    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList);
    };

    if (loading) {
        return <Spin tip="Loading your hotels..." />;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (hotels.length === 0) {
        return <p>You have not added any hotels yet.</p>;
    }

    return (
        <div>
            <List
                grid={{ gutter: 16, column: 3 }}
                dataSource={hotels}
                renderItem={hotel => (
                    <List.Item key={hotel._id}>
                        <Card
                            title={hotel.name}
                            extra={
                                <>
                                    <Button type="link" onClick={() => showUpdateModal(hotel)}>Update</Button>
                                    <Button type="link" danger onClick={() => handleDelete(hotel._id)}>Delete</Button>
                                </>
                            }
                        >
                            <p><strong>Location:</strong> {hotel.location}</p>
                            <p><strong>Description:</strong> {hotel.description}</p>
                            <p><strong>Amenities:</strong> {hotel.amenities.join(', ')}</p>
                            <p><strong>Status:</strong> {hotel.status}</p>
                            <p><strong>Rooms:</strong></p>
                            <ul>
                                {hotel.rooms.map((room, index) => (
                                    <li key={index}>{room.roomType} - ${room.price} per night ({room.availableRooms} available)</li>
                                ))}
                            </ul>
                            <p><strong>Images:</strong></p>
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {hotel.images && hotel.images.length > 0 ? (
                                    hotel.images.map((img, idx) => (
                                        <img
                                            key={idx}
                                            src={`http://localhost:8081/hotel-uploads/${img}`} // Adjust if necessary
                                            alt={`Hotel ${hotel.name}`}
                                            style={{ width: '100px', marginRight: '10px', marginBottom: '10px' }}
                                        />
                                    ))
                                ) : (
                                    <p>No images available for this hotel.</p>
                                )}
                            </div>
                        </Card>
                    </List.Item>
                )}
            />

            {/* Update Hotel Modal */}
            <Modal
                title="Update Hotel"
                visible={isUpdateModalVisible}
                onCancel={handleUpdateCancel}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleUpdateSubmit}
                >
                    <Form.Item
                        label="Hotel Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the hotel name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Location"
                        name="location"
                        rules={[{ required: true, message: 'Please input the location!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                        label="Amenities (comma separated)"
                        name="amenities"
                    >
                        <Input />
                    </Form.Item>
                    {/* Optionally, handle rooms here */}

                    <Form.Item
                        label="Add Images"
                        name="images"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => {
                            if (Array.isArray(e)) {
                                return e;
                            }
                            return e && e.fileList;
                        }}
                    >
                        <Upload
                            listType="picture"
                            beforeUpload={() => false} // Prevent automatic upload
                            onChange={handleUploadChange}
                            multiple
                        >
                            <Button icon={<UploadOutlined />}>Upload Images</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={uploading}>
                            Update Hotel
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );

};

export default MyHotels;
