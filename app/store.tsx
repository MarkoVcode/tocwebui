import { create } from 'zustand';

interface ServiceURL {
  serviceUrl: string;
  setServiceUrl: (url: string) => void;
}

export const useServiceURLStore = create<ServiceURL>((set) => ({
  serviceUrl: '',
  setServiceUrl: (url) => set({ serviceUrl: url }),
}));