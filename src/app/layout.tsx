import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import StoreProvider from "@/components/StoreProvider/StoreProvider";
import { Onest } from "next/font/google";
import { ModalProvider } from "@/components/ModalContext";
import { metadataForHome } from "@/lib/seo";
import { SITE_URL } from "@/constants";

const onest = Onest({
  subsets: ["latin", "cyrillic"],
});

export async function generateMetadata() {
  const meta = await metadataForHome();
  return {
    ...meta,
    metadataBase: new URL(SITE_URL),
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={onest.className}>
      <body>
        <StoreProvider>
          <ModalProvider>
            <Header />
            {children}
            <Footer />
          </ModalProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
