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

export const useValidatorData = (modelId: string) => {
    return useQuery({
        queryKey: ['modelValidator', modelId],
        queryFn: () => fetchModelValidator(modelId)
    });
};

export const useValidationForData = (modelId: string, params: any) => {
    return useMutation({
        mutationFn: () => validateModelDataParams(modelId, params)
    });
};

export const useModelLinkParams = (modelId: string, linkParams: string) => {
    return useQuery({
        queryKey: ['modelLinkParams', modelId],
        queryFn: () => decodeModelLinkParams(modelId, linkParams)
    });
};
