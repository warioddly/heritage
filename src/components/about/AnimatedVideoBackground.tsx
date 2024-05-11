'use client';
import React, {useEffect, useRef, useState} from "react";
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import {useAspect, useVideoTexture, OrthographicCamera} from '@react-three/drei'


export default function AnimatedVideoBackground(props: { src: string }) {

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (containerRef.current) {
                setMousePosition({ x: event.clientX, y: event.clientY });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute left-0 w-screen h-screen">
            <Canvas >
                <OrthographicCamera position={[0, 0, 1]} far={5} zoom={1} near={0.1} >
                    <Scene src={props.src} mousePosition={mousePosition} />
                </OrthographicCamera>
            </Canvas>
        </div>
    )
}


function Scene(props: { src: string, mousePosition: { x: number, y: number } }) {
    const { src, mousePosition } = props;
    const size = useAspect(1800, 1000);

    const rotationParallaxAmount = .0001;
    const positionParallaxAmount = .0005;

    const rotationX = (mousePosition.y - window.innerHeight / 2) * rotationParallaxAmount;
    const rotationY = (mousePosition.x - window.innerWidth / 2) * rotationParallaxAmount;

    const positionX = (mousePosition.x - window.innerWidth / 2) * positionParallaxAmount;
    const positionY = (mousePosition.y - window.innerHeight / 2) * positionParallaxAmount;

    return (
        <mesh scale={size} rotation={[rotationX, rotationY, 0]} position={[positionX, positionY, 0]}>
            <planeGeometry args={[1, 1]} />
            <Suspense fallback={<meshBasicMaterial toneMapped={false}/>}>
                <VideoMaterial url={src} />
            </Suspense>
        </mesh>
    );
}

function VideoMaterial({ url }: { url: string }) {
    const texture = useVideoTexture(url)
    return <meshBasicMaterial map={texture} toneMapped={false} />
}

