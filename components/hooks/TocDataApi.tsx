import { useQuery, useMutation } from '@tanstack/react-query';
import {
    fetchModelData, 
    validateModelDataParams,
    fetchVersion,
    exportModelBin,
    fetchModelsData,
    fetchModelValidator,
    decodeModelLinkParams,
    fetchModelLinkPreviewBin
} from '@/components/services/tocService';

export const useModelData = (modelId: string) => {
    return useQuery({
        queryKey: ['modelData', modelId],
        queryFn: () => fetchModelData(modelId)
    });
};

export const useModelsData = () => {
    return useQuery({
        queryKey: ['modelsData'],
        queryFn: () => fetchModelsData()
    });
};

export const useVersionData = () => {
    return useQuery({
        queryKey: ['versionData'],
        queryFn: () => fetchVersion()
    });
};

export const useValidatorData = (modelId: string, baseUrl: string) => {
    return useQuery({
        queryKey: ['modelValidator', modelId],
        queryFn: () => fetchModelValidator(modelId, baseUrl)
    });
};

export const useValidationForData = (modelId: string, baseUrl: string, params: any) => {
    return useMutation({
        mutationFn: () => validateModelDataParams(modelId, baseUrl, params )
    });
};

export const useModelLinkParams = (modelId: string, baseUrl: string, linkParams: string) => {
    return useQuery({
        queryKey: ['modelLinkParams', modelId],
        queryFn: () => decodeModelLinkParams(modelId, baseUrl, linkParams)
    });
};
