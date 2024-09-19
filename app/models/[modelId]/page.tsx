"use client"

import { useState, useEffect } from "react";
import ModelPreview from './ModelPreview';
import ModelHeader from './ModelHeader';
import ModelForm from './ModelForm';
import ModelExport from './ModelExport';
import { useModelData } from '@/components/hooks/TocDataApi';
import { QueryClient } from '@tanstack/react-query';
import { useServiceURLStore } from "@/app/store";

const queryClient = new QueryClient();

export default function Page({ params }: { params: { modelId: string } }) {
    const [modelLink, setModelLink] = useState('NjAuMDs4MC4wOzEwLjA7MjIuMDsxMi4w');
    const [modelParams, setModelParams] = useState('');
    const setServiceUrl = useServiceURLStore(state => state.setServiceUrl);
    const { data, error, isLoading } = useModelData(params.modelId);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;
    if (!isLoading && !error) {
        console.log(data.serviceUrl);
        setServiceUrl(data.serviceUrl);
    }

    return (
        <div className="flex flex-col h-full">
            <ModelHeader modelData={data} />
            <div className="flex-1 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 p-6">
                <div className="space-y-6">
                   <ModelForm modelId={data.id} setModelLink={setModelLink} setModelParams={setModelParams} />  
                </div>
                <div className="bg-muted rounded-lg overflow-hidden">
                    <ModelPreview modelId={data.id} modelLink={modelLink} />
                </div>
            </div>
            <div className="bg-background border-t px-6 py-4">
                <ModelExport modelId={data.id} paramsData={modelParams} />
            </div>
        </div>
    )
}


//{/* <div className="max-w-6xl mx-auto flex items-center justify-between">
//<Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
//    <LinkIcon className="w-4 h-4 mr-2" />
//    {object.name}
//</Link>
//<Button>Export</Button>
//</div> */}