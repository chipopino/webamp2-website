import urlJoin from 'url-join';

function bas_fetch(endpoint: string, data?: any, method = 'POST', headers = {}) {
    return new Promise((resolve, reject) => {
        fetch(
            urlJoin(process.env.BACK_URL || '', endpoint),
            {
                method, headers,
                body: method === 'POST' ? JSON.stringify(data) : undefined
            })
            //@ts-ignore
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => {
                console.error('Error:', error);
                reject(error);
            });
    })
}
export function get(endpoint: string) {
    return new Promise((resolve, reject) => {
        bas_fetch(endpoint, {}, 'GET')
            .then(res => resolve(res))
            .catch(error => reject(error))
    })
}
export function post(endpoint: string, data: any) {
    return new Promise((resolve, reject) => {
        bas_fetch(
            endpoint, data, 'POST',
            { 'Content-Type': 'application/json' })
            .then(res => resolve(res))
            .catch(error => reject(error))
    })
}