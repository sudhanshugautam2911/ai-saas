// To check if logged In user is subscribed or not and if subscribed than check if period is expired or not

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

const DAY_IN_MM = 86_400_000;

export const checkSubscription = async () => {

    const  { userId } = auth();

    if (!userId) {
        return false;
    }
    
    const userSubscription = await prismadb.userSubscription.findUnique({
        where: {
            userId
        },
        select: {
            stripeSubscriptionId: true,
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true
        }
    })

    if(!userSubscription) {
        return false;
    }

    // adding DAY_IN_MM because we are giving the user one day grace period
    const isValid = 
        userSubscription.stripePriceId &&
        userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MM > Date.now();
    
    //  -> !! this convert value to boolean 
    return !!isValid;
}