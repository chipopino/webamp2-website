import urlJoin from 'url-join';

function bas_fetch(endpoint: string, data?: any, method = 'POST', headers = {}) {
    return new Promise((resolve) => {
        fetch(
            urlJoin('http://localhost:5000', endpoint),
            {
                method, headers,
                body: method === 'POST' ? JSON.stringify(data) : undefined
            })
            //@ts-ignore
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => console.error('Error:', error));
    })
}
export function get(endpoint: string) {
    return new Promise((resolve) => {
        bas_fetch(endpoint, {}, 'GET').then(res => resolve(res))
    })
}
export function post(endpoint: string, data: any) {
    return new Promise((resolve) => {
        bas_fetch(
            endpoint, data, 'POST',
            { 'Content-Type': 'application/json' })
            .then(res => resolve(res))
    })
}