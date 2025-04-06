import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const baseURL = "https://api.aimlapi.com/v1";
const apiKey = process.env.API_KEY;

const api = new OpenAI({
  apiKey,
  baseURL,
});

export const POST = async (request: Request) => {
  const { question } = await request.json();
  try {
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
