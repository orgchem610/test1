import { SettingOutlined, TeamOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";

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

const items: MenuItem[] = [
    getItem('対戦確認', '1', <TeamOutlined style={{fontSize: fSize}} />),
];


export const TopTab = () => {
    return (
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={items}
            style={{ flex: 1, minWidth: 0, fontSize: fSize }}
        />
    )
}