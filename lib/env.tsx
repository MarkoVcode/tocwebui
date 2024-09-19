
import pack from '../package.json';

export const VERSION = pack.version;
export const AWS_BRANCH = process.env.AWS_BRANCH;
export const AWS_REGION = process.env.AWS_REGION;
export const AWS_ENDPOINT = process.env.AWS_ENDPOINT;
export const ENV_ID = process.env.ENV_ID;

export const isProduction = () => {
    return AWS_BRANCH === 'main';
}

export const isDevelopment = () => {
    return ENV_ID === 'development';
}

export const getRegistryAPIBaseUrl = () => {
    if (isProduction()) {
        return 'https://6mseads5idjvlqo2ec7xoe23y40obchr.lambda-url.us-east-1.on.aws';
    } else if (isDevelopment()) {   
        return 'https://6mseads5idjvlqo2ec7xoe23y40obchr.lambda-url.us-east-1.on.aws';
    }
    //return 'http://localhost:3005';
    return 'https://6mseads5idjvlqo2ec7xoe23y40obchr.lambda-url.us-east-1.on.aws';
    //return 'https://development-api.thingoncloud.com';
}

export const getTableName = () => {
    if (isProduction()) {
        return 'tocModelsRegistry';
    }
    return 'tocModelsRegistry-development';
}