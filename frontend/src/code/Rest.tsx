// Local testing BASE_URL
// const BASE_URL = 'http://localhost:7999/';

// use this BASE_URL for deployment and if you want to interact with deployed backend
const BASE_URL = 'https://fridger-backend-dot-fridger-333016.ue.r.appspot.com/';

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