import React, {useState} from "react";
import {Post, PostFormValues} from "../../../common/data-types/post";
import {Card, Col} from "antd";
import {EditPostModal} from "./EditPostModal";
import {DeletePostModal} from "./DeletePostModal";
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';

type SinglePostItemProps = {
    post: Post,
    editPost: (id: string, updatedData: { title?: string, body?: string }) => Promise<void>
    deletePost: (id: string) => Promise<void>
}

const editIconStyles = {
    color: "#007BFF",
    fontSize: "20px"
};

const deleteIconStyles = {
    color: "red",
    fontSize: "20px"
};

export const SinglePostItem = (props: SinglePostItemProps) => {
    const {post, editPost, deletePost} = props;
    const {id, title, body} = post;

    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

    const onEdit = async (values: PostFormValues) => {
        await editPost(id, {title: values.title, body: values.body})
    };

    const onDelete = async () => {
        await deletePost(id)
    }

    return (
        <>
            <Col span={8}>
                <Card
                    title={title}
                    className={"card-wrapper"}
                    actions={[
                        <EditOutlined key="edit" onClick={() => setOpenEditModal(true)} style={editIconStyles}/>,
                        <DeleteOutlined key="delete" onClick={() => setOpenDeleteModal(true)}
                                        style={deleteIconStyles}/>,
                    ]}
                >
                    <p className={"body-paragraph"}>{body}</p>
                </Card>
            </Col>
            {openEditModal &&
            <EditPostModal post={post} open={openEditModal} onSave={onEdit} onCancel={() => setOpenEditModal(false)}/>}
            {openDeleteModal &&
            <DeletePostModal post={post} open={openDeleteModal} onDelete={onDelete}
                             onCancel={() => setOpenDeleteModal(false)}/>}
        </>
    );
}