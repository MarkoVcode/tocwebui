"use client";

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ReactNode } from 'react';

interface ProvidersProps {
    children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    const [queryClient] = React.useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}