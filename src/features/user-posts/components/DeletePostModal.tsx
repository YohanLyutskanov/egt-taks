import React, {useState} from "react";
import {Modal} from "antd";
import {Post} from "../../../common/data-types/post";


type DeletePostModalProps = {
    post: Post;
    open: boolean;
    onDelete: () => Promise<void>
    onCancel: () => void;
}

export const DeletePostModal = (props: DeletePostModalProps) => {
    const {post, open, onDelete, onCancel} = props

    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

    const onOk = async () => {
        setConfirmLoading(true)
        await onDelete();
        setConfirmLoading(false)

    }


    return <Modal
        title="Delete Post"
        open={open}
        onOk={onOk}
        confirmLoading={confirmLoading}
        onCancel={onCancel}
        okText={"Delete Post"}
        width={800}
    >
        {`Are you sure you want to delete post with title "${post.title}"?`}
    </Modal>
}