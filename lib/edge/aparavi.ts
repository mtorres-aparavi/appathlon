import { appConfig } from "../../config.edge";
import { get, post } from 'axios'

export const getBasicAuthToken = (username?: string, password?: string) => {

    username ??= appConfig.APARAVI_USERNAME;
    password ??= appConfig.APARAVI_PASSWORD;

    if (!username) {
        throw new Error('Please provide a valid username');
    }

    if (!password) {
        throw new Error('Please provide a valid password');
    }

    const credentials = `${username}:${password}`;
    const encodedCredentials = Buffer.from(credentials).toString('base64');
    return `Basic ${encodedCredentials}`;
};

const getObject = async (properties: Record<string, unknown>) => {
    const keys = Object.keys(properties);
    const query = keys.map(key => `${key}=${properties[key]}`).join('&');

    const { data } = await get(`${appConfig.APARAVI_HOST}}/server/api/v3/database/object?${query}`, {
        headers: {
            Authorization: getBasicAuthToken()
        }
    });

    if (data.error && data.name === 'ObjectNotFound') {
        return undefined;
    }

    return data.data;
};

const postObject = async (object: Record<string, unknown>, options: Record<string, unknown>) => {
    const { data } = await post(`${appConfig.APARAVI_HOST}/server/api/v3/database/object`, {
        object,
        options
    }, {
        headers: {
            Authorization: getBasicAuthToken()
        }
    });

    if (data.error) {
        throw data.error;
    }

    return data.data;
};

const getConfig = async () => {
    const { data } = await get(`${appConfig.APARAVI_HOST}/server/api/v3/config`, {
        headers: {
            Authorization: getBasicAuthToken()
        }
    });

    return data.data;
};
