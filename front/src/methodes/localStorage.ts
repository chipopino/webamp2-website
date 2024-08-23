
type localStorageKeyType = 'saveSkin' | 'currentSkin' | 'skins';

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
        const arr = lget(key) || [];
        
        lset(key, arr.reduce((acc: any, elm: any) => {
            if (!acc.includes(elm)) {
                acc.push(elm);
            }
            return acc;
        }, []))

    }
}


