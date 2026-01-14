import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export async function GET() {
  try {
    // Construct full URL to external API
    const externalUrl = API_BASE_URL.endsWith("/")
      ? `${API_BASE_URL}api/products`
      : `${API_BASE_URL}/api/products`;

    const response = await fetch(externalUrl, {
      next: {
        revalidate: 3600, // Revalidate every hour (3600 seconds)
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
