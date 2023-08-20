import React, {useEffect, useState} from "react";
import {Form, Input, Modal} from "antd";
import {Post, PostFormValues} from "../../../common/data-types/post";

const {TextArea} = Input;

type EditPostModalProps = {
    post: Post;
    open: boolean;
    onSave: (values: PostFormValues) => Promise<void>
    onCancel: () => void;
}

export const EditPostModal = (props: EditPostModalProps) => {
    const {post, open, onSave, onCancel} = props
    const {title, body, id} = post

    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

    const [form] = Form.useForm();
    const [formDataChanged, setFormDataChanged] = useState(false);
    const [disableSave, setDisableSave] = useState(false);

    const initialValues: PostFormValues = {
        title,
        body,
    }

    useEffect(() => {
        form.setFieldsValue(initialValues);
    }, [])

    const values = Form.useWatch([], form);

    useEffect(() => {
        form.validateFields({validateOnly: true}).then(
            () => {
                setDisableSave(true);
            },
            () => {
                setDisableSave(false);
            },
        );
    }, [values]);

    const onOk = async () => {
        setConfirmLoading(true)
        await onSave({title: values.title, body: values.body});
        setConfirmLoading(false)

    }

    const onClose = () => {
        form.setFieldsValue(initialValues);
        setFormDataChanged(false);
        onCancel()
    }


    return <Modal
        title="Edit Post"
        open={open}
        onOk={onOk}
        confirmLoading={confirmLoading}
        onCancel={onClose}
        okButtonProps={{disabled: !disableSave || !formDataChanged}}
        okText={"Edit Post"}
        width={800}
    >
        <Form
            name={`form-post-${id}`}
            labelCol={{flex: '110px'}}
            labelAlign="left"
            labelWrap
            wrapperCol={{flex: 1}}
            colon={false}
            style={{width: "100%"}}
            form={form}
            onValuesChange={() => setFormDataChanged(true)}
        >
            <Form.Item label="Title" name="title" rules={[{required: true, whitespace: true}]}>
                <Input/>
            </Form.Item>

            <Form.Item label="Body" name="body" rules={[{required: true, whitespace: true}]}>
                <TextArea rows={7}/>
            </Form.Item>
        </Form>
    </Modal>
}