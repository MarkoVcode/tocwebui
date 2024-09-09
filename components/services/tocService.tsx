import axios from 'axios';

const baseUrl = 'https://bvu4yujc2fonmgmjdco6s6aknq0yjjxq.lambda-url.eu-west-2.on.aws';

const commonHeaders = {
    'Content-Type': 'application/json',
};

const apiJSONClient = axios.create({
    baseURL: baseUrl,
    headers: {
        ...commonHeaders,
        'Accept': 'application/json',
    },
});

const apiSTLClient = axios.create({
    baseURL: baseUrl,
    headers: {
        ...commonHeaders,
        'Accept': 'model/stl',
    },
});

const apiZIPClient = axios.create({
    baseURL: baseUrl,
    headers: {
        ...commonHeaders,
        'Accept': 'application/zip',
    },
});

export const fetchVersion = async () => {
    const response = await apiJSONClient.get(`/version`);
    return response.data;
};

export const fetchModelsData = async () => {
    const response = await apiJSONClient.get(`/models`);
    return response.data;
};

export const fetchModelData = async (modelId: string) => {
    const response = await apiJSONClient.get(`/models/${modelId}`);
    return response.data;
};

export const fetchModelValidator = async (modelId: string) => {
    console.log("response1111");
    const response = await apiJSONClient.get(`/models/${modelId}/validator`);
    console.log("response", response);
    return response.data;
};

export const decodeModelLinkParams = async (modelId: string, params: string) => {
    const response = await apiJSONClient.get(`/models/${modelId}/params/${params}`);
    return response.data;
};

export const fetchModelLinkPreviewBin = async (modelId: string, params: string) => {
    const response = await apiSTLClient.get(`/models/${modelId}/preview/${params}.stl`);
    return {
        data: response.data,
        objectParams: JSON.parse(response.headers['x-object-params'])
    };
};


export const validateModelDataParams = async (modelId: string, paramsData: any) => {
    const response = await apiJSONClient.post(`/models/${modelId}/validator`, { ...paramsData });
    console.log("trquest to validation", ...paramsData);
    console.log("responsefrom validation", response);
    return response.data;
};

export const exportModelBin = async (modelId: string, paramsData: any) => {
    const response = await apiZIPClient.post(`/models/${modelId}/cad?export=true`, { paramsData });
    return {
        data: response.data,
        objectParams: JSON.parse(response.headers['x-object-params'])
    };
};

