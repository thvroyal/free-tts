import { NextResponse } from 'next/server';

type RequestData = {
  text: string;
  languageCode?: string;
  voiceName?: string;
};

export async function POST(request: Request) {
  try {
    const { text, languageCode, voiceName } = await request.json() as RequestData;
    
    // Forward the request to Google's API from the server side
    const url = "https://labs.google/lll/api/text-to-speech";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, languageCode, voiceName }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to generate speech" },
        { status: response.status }
      );
    }

    const dataBase64 = await response.json();
    return NextResponse.json(dataBase64);
  } catch (error) {
    console.error("Error generating speech:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 