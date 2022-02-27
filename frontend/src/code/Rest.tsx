// Local testing BASE_URL
const BASE_URL = 'http://localhost:8080/';

export interface RestOptions {
    method: string;
    useQuery?: boolean;
}

interface IDictionary<TValue> {
    [id: string]: TValue;
}

export default function rest(url: string, options: RestOptions, data?: Map<string, string>): Promise<Response> {
    let headers = new Headers();
    let authToken = localStorage.getItem('token');
    if (authToken !== null) {
        headers.append('Authorization', authToken);
    }
    if (options.useQuery) {
        let params = '';
        if (data !== undefined) {
            data.forEach((entry: string, key: string) => {
                if (params.length === 0) {
                    params += "?";
                } else {
                    params += "&";
                }
                params += `${key}=${encodeURIComponent(entry)}`;
            });
        }
        headers.append('Content-Type', 'application/json');

        return fetch(BASE_URL + url + params, { headers: headers, method: options.method });
    }

    if (data !== undefined) {
        const data2: IDictionary<string> = {};

        data.forEach((entry: string, key: string) => {
            data2[key] = entry;
        });

        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        return fetch(BASE_URL + url, {  method: options.method, headers: headers, body: JSON.stringify(data2) });
    }

    return fetch(BASE_URL + url, { headers: headers, method: options.method });
}
