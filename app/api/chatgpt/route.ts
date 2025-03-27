import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const baseURL = "https://api.aimlapi.com/v1";
const apiKey = "df8c5b2c53f14aa68ee017abc1f17f23";

const api = new OpenAI({
  apiKey,
  baseURL,
});

export const POST = async (request: Request) => {
  const { question } = await request.json();
  try {
    // const response = await fetch("https://api.aimlapi.com/v1", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    //   },
    //   body: JSON.stringify({
    //     model: "gpt-3.5-turbo",
    //     messages: [
    //       {
    //         role: "system",
    //         content:
    //           "You are a knowledgeable assistant that provides quality information.",
    //       },
    //       {
    //         role: "user",
    //         content: `Tell me ${question}`,
    //       },
    //     ],
    //   }),
    // });
    const completion = await api.chat.completions.create({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      messages: [
        {
          role: "system",
          content:
            "You are a knowledgeable assistant that provides quality information.",
        },
        {
          role: "user",
          content: `Tell me ${question}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 256,
    });

    // const responseData = await response.json();
    const reply = completion.choices[0].message.content;
    return NextResponse.json({ reply });
  } catch (error: any) {
    // console.log(error);
    return NextResponse.json({ error: error.message });
  }
};
