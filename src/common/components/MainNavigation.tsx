import React, {useState} from 'react';
import {CheckSquareOutlined, TeamOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Menu} from 'antd';
import {useNavigate} from "react-router-dom";

export const MainNavigation = () => {
    const [current, setCurrent] = useState('users');
    const navigate = useNavigate()

    const items: MenuProps['items'] = [
        {
            label: 'Users',
            key: 'users',
            onClick: () => {
                navigate("/")
            },
            icon: <TeamOutlined />,
        },
        {
            label: 'Tasks',
            key: 'tasks',
            onClick: () => {
                navigate("/tasks")
            },
            icon: <CheckSquareOutlined />,
        },
    ]

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}/>;
};