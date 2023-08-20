import React, {useEffect, useMemo, useState} from "react";
import {Row, Space, Typography} from "antd";
import {UserFormItem} from "../../common/components/UserFormItem";
import {useParams} from 'react-router-dom';
import {useAppSelector} from "../../app/store";
import {User} from "../../common/data-types/user";
import {NoData} from "../../common/components/common/NoData";
import {Post} from "../../common/data-types/post";
import {SinglePostItem} from "./components/SinglePostItem";
import axios from "axios";
import {Loader} from "../../common/components/common/Loader";
import {notify} from "../../common/utils/notify";
import "./styles/card-style.css"

const {Title} = Typography;

export const UserPosts = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(false)
    const users = useAppSelector((state) => state.user.users);
    const {userId} = useParams();

    const fetchPosts = async () => {
        try {
            setIsLoadingPosts(true)
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
            setPosts(response.data);
            setIsLoadingPosts(false)
        } catch (err: any) {
            notify("error", err.message)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])


    //Simulate editing post using the API. (No real data is edited)
    const editPost = async (id: string, updatedData: { title?: string, body?: string }) => {
        try {
            await axios.patch(`https://jsonplaceholder.typicode.com/posts/${id}`, updatedData);
            notify("success", `Post "${updatedData.title}" was successfully updated using the API`);
            fetchPosts()

        } catch (error: any) {
            notify("error", `Oops, something went wrong. Error:  ${error.message}`)
        }
    }

    //Simulate deleting post using the API. (No real data is deleted)
    const deletePost = async (id: string) => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
            notify("success", `The post was successfully deleted using the API`);
            fetchPosts()
        } catch (error: any) {
            notify("error", `Oops, something went wrong. Error:  ${error.message}`)
        }
    }

    const user = users.find((u: User) => u.id.toString() === userId);

    let postItems = useMemo(() => {
        const items = posts.map((p: Post) => <SinglePostItem key={p.id} post={p} editPost={editPost} deletePost={deletePost}/>);

        return <Row gutter={32}> {items}</Row>
    }, [posts])

    if (!user) {
        return <NoData/>
    }

    const postsComponent = () => {
        if (isLoadingPosts) {
            return <Loader/>
        }
        return posts.length ? postItems : <NoData/>
    }


    return (
        <div className={"main-wrapper"}>
            <Space direction={"vertical"}>
                <div>
                    <Title level={2}>User Info</Title>
                    <UserFormItem user={user} isSingleUserView/>
                </div>
                <div>
                    <Title level={3}>User Posts</Title>
                    {postsComponent()}
                </div>
            </Space>
        </div>
    )
}