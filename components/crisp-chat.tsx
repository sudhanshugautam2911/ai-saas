"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("355ce4e2-e004-4793-b641-03c7f6b81eb1")
    }, [])

    return null;
}