import { Button, FloatButton, Form, Input, Modal, Space, Typography } from "antd";
import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { useLocalStorage } from "../utility/localStrage";

const { Text } = Typography;

const style = { right: 94, top: 12 };

const userIdKey = "userId";

export const UserFab = () => {
    const [userId, setUserId] = useLocalStorage(userIdKey, 0);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = (id: number) => {
        setUserId(id)
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const SetUserModal = () => {
        return (
            <Modal title="対戦を確認したい人のIDを入力してください" open={isModalOpen} onCancel={handleCancel} footer>
                <Form onFinish={(value) => {
                    handleOk(parseInt(value.userId));
                }}>
                    <Form.Item name="userId" initialValue={parseInt(userId) ? userId : ""}>
                        <Input
                            placeholder="IDを入力してください"
                            prefix={<UserOutlined />}
                        />
                    </Form.Item>
                    <Form.Item style={{ textAlign: "right" }}>
                        <Space>
                            <Button type="primary" htmlType="submit" >OK</Button>
                            <Button type="default" onClick={handleCancel} >Cancel</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }

    if (parseInt(userId)) {
        return (
            <>
                <FloatButton
                    description={<Text style={{ fontSize: 16 }}>{userId}</Text>}
                    style={style}
                    type="primary"
                    onClick={showModal}
                />
                <SetUserModal />
            </>
        )
    } else {
        return (
            <>
                <FloatButton
                    icon={<UserOutlined />}
                    style={style}
                    type="default"
                    onClick={showModal}
                />
                <SetUserModal />
            </>
        )
    }
};