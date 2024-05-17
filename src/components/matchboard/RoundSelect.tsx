import { Col, Flex, Row, Select, Space } from 'antd';
import { useContext, useState } from 'react';
import { ContestContext } from '../../contexts/Contest';

export const RoundSelect = () => {
    const contestContext = useContext(ContestContext)

    const [selectedId, setSelectedId] = useState(-1);
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedRound, setSelectedRound] = useState(0);

    const handleChangeContest = (value: string) => {
        console.log(`selected ${value}`);
    };
    const handleChangeClass = (value: string) => {
        console.log(`selected ${value}`);
    };
    const handleChangeRound = (value: string) => {
        console.log(`selected ${value}`);
    };

    return (
        <Flex gap="small" wrap>
            <Select size='large' placeholder="大会名"
                defaultValue="1"
                style={{ width: 480, }}
                onChange={handleChangeContest}
                options={[
                    { value: '1', label: '東大かるた会400周年記念大会' },
                    { value: '2', label: '東大かるた会500周年記念大会' },
                ]}
            />
            <Select size='large'
                defaultValue="A"
                style={{ width: 240 }}
                onChange={handleChangeClass}
                options={[
                    { value: 'A', label: 'A' },
                ]}
            />
            <Select size='large'
                defaultValue="1"
                style={{ width: 240 }}
                onChange={handleChangeRound}
                options={[
                    { value: '1', label: '1回戦' },
                    { value: '2', label: '2回戦' },
                    { value: '3', label: '3回戦' },
                ]}
            />
        </Flex>
    );
};