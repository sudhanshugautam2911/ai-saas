"use client";

import { useState } from "react";
import { Zap } from "lucide-react";
import axios from "axios";

import { Button } from "@/components/ui/button";

interface SubscriptionButtonProps {
    isPro: boolean;
}

export const SubscriptionButton = ({
    isPro = false
}: SubscriptionButtonProps) => {

    const [loading, setLoading] = useState(false)

    const onclick = async () => {
        try {
            // our stripe code itself decide if redirect to checkout or manage subscription 
            setLoading(true);
            const response = await axios.get("/api/stripe");

            // redirect to the desired url
            window.location.href = response.data.url;

        } catch (error) {
            console.log("BILLING_ERROR", error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Button disabled={loading} variant={isPro ? "default" : "premium"} onClick={onclick}>
                {isPro ? "Manage Subscription" : "Upgrade"}
                {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
            </Button>
        </>
    )

}