import StoreProvider from "../src/store/StoreProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.scss";

export const metadata = {
  title: "Creelo India - E-commerce Platform",
  description: "Discover quality products at Creelo India - Your trusted e-commerce destination",
  keywords: "ecommerce, shopping, online store, Creelo India",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
