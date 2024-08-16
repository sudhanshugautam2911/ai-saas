import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
// import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

// import { checkSubscription } from "@/lib/subscription";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";


// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY
// });

// Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!genAI) {
            return new NextResponse("API Key not configured.", { status: 500 });
        }
       

        if (!messages) {
            return new NextResponse("Messages are required", { status: 400 });
        }

        // Check free trial
        const freeTrail = await checkApiLimit();
        const isPro = await checkSubscription();

        if (!freeTrail && !isPro) {
            return NextResponse.json("Free trail has expired.", { status: 403 });
        }

        // Openai
        // const response = await openai.chat.completions.create({
        //     model: "gpt-3.5-turbo",
        //     messages
        // });

        // Gemini
        const lastMessage = messages[messages.length - 1].content;
        const chat = model.startChat({
            history: messages.slice(0, -1).map((msg: { role: string, content: string }) => ({
                role: msg.role,
                parts: [{ text: msg.content }],
            }))
        });
        let result = await chat.sendMessage(lastMessage); 

        // Increment API limit if not a pro user
        if (!isPro) {
            await incrementApiLimit();
        }

        return NextResponse.json(result.response.text());

        // OPENAI
        // return NextResponse.json(response.choices[0].message);

    } catch (error) {
        console.log("[CONVERSATION_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
