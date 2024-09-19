"use client"

import React from 'react';
import { StlViewer } from "react-stl-viewer";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { NextConfig } from 'next';
import { useServiceURLStore } from '@/app/store';

//const url = "https://bvu4yujc2fonmgmjdco6s6aknq0yjjxq.lambda-url.eu-west-2.on.aws/models/0000/preview/NjAuMDs4MC4wOzEwLjA7MjIuMDsxMi4w.stl"

const style = {
    top: 0,
    left: 0,
    height: '81vh',
}

const modRef = (e: any) => {
    console.log(e);
}

const modelProps = {
    ref: modRef,
    color: "gray",
    //  rotationX: 2,
    //  rotationY: 1,
    //  rotationZ: 1,
    // scale: 1.5,
}

const floorProps = {
    gridWidth: 150,
    gridLength: 150,
}

interface ModelPreviewProps {
    modelId: string;
    modelLink: string;
}

const onClick = (e: any) => {
    e.preventDefault();
    console.log(modRef);
}

const onFinishLoading = (e: any) => {
    console.log("onFinishLoading", e);
}

const onError = (e: any) => {
    console.log("onError", e);
}

const ModelPreview: React.FC<ModelPreviewProps> = ({ modelId, modelLink }) => {
    const baseUrl = useServiceURLStore(state => state.serviceUrl);
    console.log("previewURL: " + baseUrl);
    const [photo, setphoto] = React.useState('')
    const url = baseUrl + "/models/" + modelId + "/preview/" + modelLink + ".stl";
    function getFrame() {
        let canvas = document.getElementsByTagName('canvas')[0]
        return canvas.toDataURL()
    }

    const handleOnClick = () => {
        setphoto(getFrame())
    }

    return (
        <>
            <StlViewer
                style={style}
                orbitControls
                shadows
                floorProps={floorProps}
                modelProps={modelProps as any}
                showAxes={true}
                onFinishLoading={onFinishLoading}
                onError={onError}
                url={url}
            />
            <Button onClick={handleOnClick} >Capture Frame 
                {process.env.API_URL}
            </Button>
            {photo && <img
            src={photo} 
            alt={'Captured Frame'} 
            />}
        </>
    );
};

export default ModelPreview;
