export const getBasicAuthToken = () => {
    const {
        ADMIN_LOGIN: login,
        ADMIN_PASSWORD: password
    } = process.env;

    if (!login) {
        throw new Error('Please define ADMIN_LOGIN variable in your .env file');
    }

    if (!password) {
        throw new Error('Please define ADMIN_PASSWORD variable in your .env file');
    }

    const credentials = `${login}:${password}`;
    const encodedCredentials = Buffer.from(credentials).toString('base64');
    return `Basic ${encodedCredentials}`;
};


export const getBasicAuthTokenWithUser = (username: string, password: string) => {

    if (!username) {
        throw new Error('Please define ADMIN_LOGIN variable in your .env file');
    }

    if (!password) {
        throw new Error('Please define ADMIN_PASSWORD variable in your .env file');
    }

    const credentials = `${username}:${password}`;
    const encodedCredentials = Buffer.from(credentials).toString('base64');
    return `Basic ${encodedCredentials}`;
};


export const getQueryVariable = (variable: string) => {
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return "";
}
