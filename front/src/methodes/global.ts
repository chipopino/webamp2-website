import classNames from 'classnames';

export const isT =
    //@ts-ignore
    ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0);

export function cn(...args: (string | undefined | boolean)[]) {
    return classNames(...args);
}

export function jcompare(elm1: any, elm2: any) {
    return JSON.stringify(elm1) === JSON.stringify(elm2);
}

export function uploadFile() {
    return new Promise((resolve, reject) => {
        try {
            const input = document.createElement('input');
            input.type = 'file';
            input.onchange = async (e) => {
                //@ts-ignore
                const file = e.target.files[0];
                const contents = await file.text();
                resolve(contents);
            };
            input.click();
        } catch {
            reject('bummer');
        }
    })
}