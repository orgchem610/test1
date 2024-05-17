import { createContext, useCallback, useState } from "react";

type RoundType = {
    round: number,
    name: string,
}
export type ClassType = {[key: string]: RoundType[]};
export type ContestType = {
    id: number,
    name: string,
    nameDisplay: string,
    startDate: Date,
    endDate: Date,
    place: string,
    host: string,
    rounds: ClassType,
};

export const defaultContestList:{
    contestList: ContestType[];
    setContestList: (value: ContestType[]) => void;
} = {
    contestList: [{
        id: 1,
        name: "東大かるた会400周年記念大会",
        nameDisplay: "東大かるた会400周年記念大会",
        startDate: new Date(),
        endDate: new Date(),
        place: "安田講堂",
        host: "東大かるた会",
        rounds: {
            A: [{round: 1, name: "1回戦"}, {round: 2, name: "2回戦"}, {round: 3, name: "3回戦"}],
            B: [{round: 1, name: "1回戦"}, {round: 2, name: "2回戦"}, {round: 3, name: "3回戦"}, {round: 4, name: "4回戦"}],
        },
    },{
        id: 2,
        name: "東大かるた会500周年記念大会",
        nameDisplay: "東大かるた会500周年記念大会",
        startDate: new Date(),
        endDate: new Date(),
        place: "安田講堂",
        host: "東大かるた会",
        rounds: {
            A: [{round: 1, name: "1回戦"}, {round: 2, name: "2回戦"}],
            B: [{round: 1, name: "1回戦"}, {round: 2, name: "2回戦"}, {round: 3, name: "3回戦"}],
            C: [{round: 1, name: "1回戦"}, {round: 2, name: "2回戦"}, {round: 3, name: "3回戦"}, {round: 4, name: "4回戦"}],
        },
    }],
    setContestList: (value: ContestType[]) => {},
};

export const ContestContext:
React.Context<{
    contestList: ContestType[];
    setContestList: (value: ContestType[]) => void;
}> = createContext(defaultContestList);

export const useContestContext: () => {
    contestList: ContestType[];
    setContestList: (value: ContestType[]) => void;
} = () => {
    const [contestList, _setContestList] = useState(defaultContestList.contestList);
    const setContestList = useCallback((value: ContestType[]) => {_setContestList(value)}, []);
    return {
        contestList,
        setContestList,
    }
};