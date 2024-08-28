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
