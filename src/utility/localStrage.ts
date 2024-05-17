import { useCallback, useState } from "react";

// https://qiita.com/KokiSakano/items/1ed32588a9e45773a30c から拝借

const getLocalStorageValue = (key: string, initValue: any) => {
    const item = localStorage.getItem(key);
    console.log(key, item)

    if(!item){
        localStorage.setItem(key, initValue)
    }
    return item ? item : initValue;
};

export const useLocalStorage = (key: string, initValue: any) => {
    const [value, setValue] = useState(() =>
        getLocalStorageValue(key, initValue)
    );

    const setLocalStorageValue = useCallback(
        (setStateAction: any | ((prevState: any) => any)) => {
            const newValue =
                setStateAction instanceof Function
                    ? setStateAction(value)
                    : setStateAction;

            localStorage.setItem(key, newValue);
            setValue(() => newValue);
        },
        [key, value]
    );

    return [value, setLocalStorageValue] as const;
};

// boolean型だとうまく動かないので修正

export const useLocalBool = (key: string, initValue: boolean) => {
    const [value, setValue] = useState(() =>
        getLocalStorageValue(key, initValue) === "true"
    );

    const setLocalStorageValue = useCallback(
        (setStateAction: boolean | ((prevState: boolean) => boolean)) => {
            const newValue =
                setStateAction instanceof Function
                    ? setStateAction(value)
                    : setStateAction;

            localStorage.setItem(key, newValue.toString());
            setValue(() => newValue);
        },
        [key, value]
    );

    return [value, setLocalStorageValue] as const;
};