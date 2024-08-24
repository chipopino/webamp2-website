import { jcompare } from "methodes/global";

type localStorageKeyType = 'saveSkin' | 'currentSkin' | 'skins' | 'defaultSkin';

export function lget(key: localStorageKeyType) {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val || '') : null;
}
export function lset(
    key: localStorageKeyType,
    value: any
) {
    localStorage.setItem(key, JSON.stringify(value));
}

export const larr = {
    push: (key: localStorageKeyType, value: any) => {
        const arr = lget(key) || [];
        arr.push(value)
        lset(key, arr);
    },
    uniquefy: (key: localStorageKeyType) => {
        let arr = lget(key) || [];
        arr = arr.map((e: any) => JSON.stringify(e));

        const tmp = arr.reduce((acc: any, elm: any) => {
            if (!acc.includes(elm)) {
                acc.push(elm);
            }
            return acc;
        }, [])

        lset(key, tmp.map((e: any) => JSON.parse(e)));
    },
    delete: (key: localStorageKeyType, value: any) => {
        const arr = lget(key) || [];

        lset(key, arr.reduce((acc: any, elm: any) => {
            if (jcompare(elm, value)) {
                acc.push(elm);
            }
            return acc;
        }, []))
    }
}


