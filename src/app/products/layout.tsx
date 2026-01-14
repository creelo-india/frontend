import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creelo.in";
  
  return {
    title: "Products - Creelo India",
    description: "Browse our wide selection of quality products at Creelo India. Find the best deals on home, bathroom, kitchen, and more.",
    alternates: {
      canonical: `${baseUrl}/products`,
    },
    openGraph: {
      title: "Products - Creelo India",
      description: "Browse our wide selection of quality products at Creelo India. Find the best deals on home, bathroom, kitchen, and more.",
      type: "website",
      url: `${baseUrl}/products`,
      siteName: "Creelo India",
    },
    twitter: {
      card: "summary_large_image",
      title: "Products - Creelo India",
      description: "Browse our wide selection of quality products at Creelo India.",
    },
  };
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
