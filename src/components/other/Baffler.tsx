"use client";
// @ts-ignore
import baffle from "baffle";

export function Baffler(event: any) {

    const target = event.target as HTMLElement;

    baffle(target, {
        characters: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
        speed: 25,
    }).reveal(1000);

    return event;
}