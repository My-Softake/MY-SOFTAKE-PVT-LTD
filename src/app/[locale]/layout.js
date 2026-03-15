
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import "../globals.css";
import { Providers } from "@/providers/Providers";
import { getMessages } from "next-intl/server";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});


export const metadata = {
  title: "My Softake",
  description: "We are a Software company",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};




export default async function LocaleLayout({ children, params }) {

  const { locale } =  await params;
  
  const messages = await getMessages();

  return (
    <html 
      lang={locale} 
      suppressHydrationWarning 
      className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable}`}
    >
      <body className="antialiased font-roboto">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}