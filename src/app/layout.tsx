import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
//jotaiからProviderコンポーネントをインポート 
import { Provider } from "jotai";
import '@aws-amplify/ui-react/styles.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat App",
  description: "Chat App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        {/* jotaiのAtomを利用するためのProvider */}
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}