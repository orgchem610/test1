import { Button, Flex, Table } from 'antd';
import type { TableProps } from 'antd';
import { useContext } from 'react';
import { ContestContext, ClassType } from '../../contexts/Contest';


interface DataType {
    key: string;
    name: string,
    place: string,
    host: string,
    rounds?: ClassType,
}

const yyyy = ("0000" + new Date().getFullYear()).slice(-4);
const mm = ("00" + (new Date().getMonth() + 1)).slice(-2);
const dd = ("00" + new Date().getDate()).slice(-2);

const getKeys = <T extends { [key: string]: unknown }>(obj: T): (keyof T)[] => {
    return Object.keys(obj)
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: '大会名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '場所',
        dataIndex: 'place',
        key: 'place',
    },
    {
        title: '主催',
        dataIndex: 'host',
        key: 'host',
    },
];

export const ContestList = () => {
    const contestContext = useContext(ContestContext)
    const data: () => DataType[] = () => {
        let result: DataType[] = [];
        for (const contest of contestContext.contestList) {
            result.push({
                key: contest.id.toString(),
                name: contest.nameDisplay,
                place: contest.place,
                host: contest.host,
                rounds: contest.rounds,
            })
        }
        return result;
    };
    const roundsList = (rounds: ClassType | undefined) => {
        if (!rounds) {
            return
        }
        const keys = getKeys(rounds).sort();
        return <Flex vertical gap="small">
            {keys.map((key) => {
                return (
                    <Flex gap="large" align="center">
                        <div />
                        <div>{key}</div>
                        {rounds[key].map((item) => {
                            return (
                                <Button type="primary" ghost>
                                    {item.name}
                                </Button>
                            )
                        })}
                    </Flex>
                )
            })}
        </Flex>
    }
    return (
        <Table scroll={{x: true, y: "50%"}}
            columns={columns}
            dataSource={data()}
            pagination={false}
            tableLayout='auto'
            expandable={{
                expandedRowRender: (record) => roundsList(record.rounds),
                expandRowByClick: true,
            }}
        />
    );
};