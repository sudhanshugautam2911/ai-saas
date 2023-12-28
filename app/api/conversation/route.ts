import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";

// import { checkSubscription } from "@/lib/subscription";
// import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
  });
  

export async function POST(req: Request) {
    try {
        console.log("I am here");
        const {userId} = auth();
        const body = await req.json();
        const {messages} = body;

        if(!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }
        console.log("I am here2");

        if (!openai.apiKey) {
            return new NextResponse("OpenAI API Key not configured.", { status: 500 });
          }
      
        if(!messages) {
            return new NextResponse("Messages are required", {status: 400});
        }
        console.log("I am here3");


        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages
        });
        console.log("I am here4");


        return NextResponse.json(response.choices[0].message);

    } catch (error) {
        console.log("[CONVERSATION_ERROR]", error);
        return new NextResponse("Internal error", { status: 500});
    }
}
