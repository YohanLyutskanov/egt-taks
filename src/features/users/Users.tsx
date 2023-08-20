import {Collapse, CollapseProps} from "antd";
import {User} from "../../common/data-types/user";
import {UserFormItem} from "../../common/components/UserFormItem";
import {Loader} from "../../common/components/common/Loader";
import {NoData} from "../../common/components/common/NoData";
import {useAppSelector} from "../../app/store";
import "./styles/users.css"
import {useEffect} from "react";
import {notify} from "../../common/utils/notify";

export const Users = (): React.ReactNode => {
    const users = useAppSelector((state) => state.user.users);
    const status = useAppSelector((state) => state.user.status);
    const error = useAppSelector((state) => state.user.error);

    useEffect(() => {
        if (status === "failed" && error) {
            notify("error", error)
        }
    }, [status, error])

    if (status === "pending") return <Loader/>

    if (!users.length) return <NoData/>


    const items: CollapseProps['items'] = users.map((user: User) => ({
        key: user.id.toString(),
        label: user.name,
        children: <UserFormItem user={user}/>,
    }));


    return (
        <div className={"main-wrapper"}>
            <Collapse items={items}/>
        </div>
    );
}