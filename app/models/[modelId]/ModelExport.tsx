import React from 'react';
import Button from "@/components/ui/Button";
import { exportModelBin } from '@/components/services/tocService';
import { useServiceURLStore } from '@/app/store';

interface ModelExportProps {
  modelId: string;
  paramsData: any;
}

const ModelExport: React.FC<ModelExportProps> = ({ modelId, paramsData }) => {
  const baseUrl = useServiceURLStore(state => state.serviceUrl);
  const handleExport = async () => {
    try {
      const result = await exportModelBin(modelId, baseUrl, paramsData);
      // Handle the exported data here
      console.log('Export successful:', result);
      // You might want to trigger a download or show a success message
    } catch (error) {
      console.error('Export failed:', error);
      // Handle the error, maybe show an error message to the user
    }
  };

  return (
    <div className="mt-4">
      <Button onClick={handleExport}>
        Export Model
      </Button>
    </div>
  );
};

export default ModelExport;
