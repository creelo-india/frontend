import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Construct full URL to external API
    const externalUrl = API_BASE_URL.endsWith("/")
      ? `${API_BASE_URL}api/auth/login`
      : `${API_BASE_URL}/api/auth/login`;

    const response = await fetch(externalUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store", // No caching for authentication requests
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}
