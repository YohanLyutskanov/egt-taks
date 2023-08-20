import React, {useEffect, useState} from "react";
import {Button, Col, Form, Input, Row, Space} from "antd";
import {useNavigate} from "react-router-dom";
import {User, UserFormValues} from "../data-types/user";
import {editUser} from "../../features/users/usersSlice";
import {useAppDispatch} from "../../app/store";
import {mapUserFormDataToUser} from "../utils/mapUserFormDataToUser";

type UserFormItemProps = {
    user: User,
    isSingleUserView?: boolean
}

export const UserFormItem = ({user, isSingleUserView = false}: UserFormItemProps): React.ReactNode => {
    const {name, username, id, phone, email, address} = user
    const {street, city, suite} = address

    const [form] = Form.useForm();
    const [disableEdit, setDisableEdit] = useState(false);
    const [formDataChanged, setFormDataChanged] = useState(false);
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    const initialValues: UserFormValues = {
        name,
        phone,
        email,
        street,
        suite,
        city,
        username,
    }

    useEffect(() => {
        form.setFieldsValue(initialValues);
    }, [])

    const values = Form.useWatch([], form);

    useEffect(() => {
        form.validateFields({validateOnly: true}).then(
            () => {
                setDisableEdit(true);
            },
            () => {
                setDisableEdit(false);
            },
        );
    }, [values]);

    const onEdit = (data: UserFormValues) => {
        const updatedUser = mapUserFormDataToUser(data, user)
        dispatch(editUser(updatedUser));
        setFormDataChanged(false)
    };

    const onReset = () => {
        form.setFieldsValue(initialValues);
        setFormDataChanged(false)
    }


    return <Form
        name={`form-user-${id}`}
        labelCol={isSingleUserView ? undefined : {flex: '80px'}}
        labelAlign="left"
        labelWrap
        layout={isSingleUserView ? "vertical" : "horizontal"}
        wrapperCol={{flex: 1}}
        colon={false}
        style={isSingleUserView ? {maxWidth: '100%'} : {maxWidth: 600}}
        form={form}
        onFinish={onEdit}
        onValuesChange={() => setFormDataChanged(true)}
    >
        <Row gutter={32}>
            <Col span={isSingleUserView ? 6 : 24}>
                <Form.Item label="Name" name="name" rules={[{required: true, whitespace: true}]}>
                    <Input/>
                </Form.Item>

                <Form.Item label="Username" name="username">
                    <Input/>
                </Form.Item>
            </Col>
            <Col span={isSingleUserView ? 6 : 24}>
                <Form.Item label="Email" name="email" rules={[{type: "email"}]}>
                    <Input/>
                </Form.Item>

                <Form.Item label="Phone" name="phone">
                    <Input/>
                </Form.Item>
            </Col>
            <Col span={isSingleUserView ? 6 : 24}>
                <Form.Item label="City" name="city" rules={[{required: true, whitespace: true}]}>
                    <Input/>
                </Form.Item>

                <Form.Item label="Street" name="street" rules={[{required: true, whitespace: true}]}>
                    <Input/>
                </Form.Item>
            </Col>
            <Col span={isSingleUserView ? 6 : 24}>

                <Form.Item label="Suite" name="suite" rules={[{required: true, whitespace: true}]}>
                    <Input/>
                </Form.Item>
            </Col>
        </Row>

        <Form.Item>
            <Space>
                <Button type="primary" htmlType="submit" disabled={!disableEdit || !formDataChanged}>
                    Edit
                </Button>
                <Button type="default" htmlType="button" onClick={onReset} disabled={!formDataChanged}>
                    Reset Form
                </Button>
                {!isSingleUserView &&
                <Button type="default" htmlType="button" onClick={() => navigate(`user/${id}`)}>
                    See All Post of This User
                </Button>}
            </Space>
        </Form.Item>
    </Form>

}