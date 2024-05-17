import { TeamOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];

const getItem: ((
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
) => MenuItem) = (label, key, icon?, children?) => {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const fSize = 18;

const yyyy = ("0000" + new Date().getFullYear()).slice(-4);
const mm = ("00" + (new Date().getMonth()+1)).slice(-2);
const dd = ("00" + new Date().getDate()).slice(-2);

const items: MenuItem[] = [
    getItem('本日の大会', "/matchboard/"+yyyy+"/"+mm+"/"+dd, <UnorderedListOutlined style={{fontSize: fSize}} />),
    getItem('対戦確認', "/matchboard/"+yyyy+"/"+mm+"/"+dd+"/A/1", <TeamOutlined style={{fontSize: fSize}} />),
];

export const SideMenu = () => {
    const navigate = useNavigate();
    const onClick = (e: any) => {
        navigate(e.key)
    };
    return (
        <Menu
            defaultSelectedKeys={['1']}
            mode="inline"
            items={items}
            style={{fontSize: fSize}}
            onClick={onClick}
        />
    )
}