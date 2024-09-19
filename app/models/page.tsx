'use client';

import React from 'react';
import { useModelsData } from '@/components/hooks/TocDataApi';
import { QueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import Image from 'next/image';

const queryClient = new QueryClient();

export default function Page() {
    const { data, error, isLoading } = useModelsData();
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;

    return (
        <>
            {data.map((param: any, index: any) => (
                <Link key={param.id} href={`/models/${param.id}`}>
                <div className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow">
                    <Image src="/photo-1552581234-26160f608093.avif" className="aspect-video w-full object-cover" alt="" width={100} height={100}/>
                    <div className="p-4">
                        <p className="mb-1 text-sm text-primary-500">Andrea Felsted • <time>18 Nov 2022</time></p>
                        <h3 className="text-xl font-medium text-gray-900">Migrating to Sailboat UI</h3>
                        <p className="mt-1 text-gray-500">{param.name} Sailboat UI is a modern UI component library for Tailwind CSS. Get started with 150+ open source components.</p>
                        <div className="mt-4 flex gap-2">
                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"> Design </span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600"> Product </span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600"> Develop </span>
                        </div>
                    </div>
                </div>
                </Link>
            ))}
        </>
    );
}

