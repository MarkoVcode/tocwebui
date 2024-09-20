import axios from 'axios';
import { getRegistryAPIBaseUrl } from '@/lib/env';

const registryBaseUrl = getRegistryAPIBaseUrl();

const commonHeaders = {
    'Content-Type': 'application/json',
};

const apiRegistryClient = axios.create({
    baseURL: registryBaseUrl,
    headers: {
        ...commonHeaders,
        'Accept': 'application/json',
    },
});

const apiJSONClient = (baseUrl: string) => axios.create({
    baseURL: baseUrl,
    headers: {
        ...commonHeaders,
        'Accept': 'application/json',
    },
});

const apiSTLClient = (baseUrl: string) => axios.create({
    baseURL: baseUrl,
    headers: {
        ...commonHeaders,
        'Accept': 'model/stl',
    },
});

const apiZIPClient = (baseUrl: string) => axios.create({
    baseURL: baseUrl,
    headers: {
        ...commonHeaders,
        'Accept': 'application/zip',
    },
});

export const fetchVersion = async () => {
    const response = await apiRegistryClient.get(`/version`);
    return response.data;
};

export const fetchModelsData = async () => {
    const response = await apiRegistryClient.get(`/models`);
    return response.data;
};

export const fetchModelData = async (modelId: string) => {
    const response = await apiRegistryClient.get(`/models/${modelId}`);
    return response.data;
};

// THESE ENDPOINTS ARE HAVING DIFFERENT SERVICE ROOT DOMAIN baseUrl

export const fetchModelValidator = async (modelId: string, baseUrl: string) => {
    const response = await apiJSONClient(baseUrl).get(`/models/${modelId}/validator`);
    return response.data;
};

export const decodeModelLinkParams = async (modelId: string, baseUrl: string, params: string) => {
    const response = await apiJSONClient(baseUrl).get(`/models/${modelId}/params/${params}`);
    return response.data;
};

export const fetchModelLinkPreviewBin = async (modelId: string, baseUrl: string, params: string) => {
    const response = await apiSTLClient(baseUrl).get(`/models/${modelId}/preview/${params}.stl`);
    return {
        data: response.data,
        objectParams: JSON.parse(response.headers['x-object-params'])
    };
};

export const validateModelDataParams = async (modelId: string, baseUrl: string, paramsData: any) => {
    const response = await apiJSONClient(baseUrl).post(`/models/${modelId}/validator`, { ...paramsData });
    console.log("trquest to validation", ...paramsData);
    console.log("responsefrom validation", response);
    return response.data;
};

export const exportModelBin = async (modelId: string, baseUrl: string, paramsData: any) => {
    const response = await apiZIPClient(baseUrl).post(`/models/${modelId}/cad?export=true`, { paramsData });
    return {
        data: response.data,
        objectParams: JSON.parse(response.headers['x-object-params'])
    };
};

