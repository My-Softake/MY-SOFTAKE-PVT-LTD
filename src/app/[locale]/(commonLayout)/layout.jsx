import Navbar from "@/components/sheard/Navbar";
import ScrollToTop from "@/components/sheard/ScrollToTop";
import Footer from "@/components/sheard/Footer";
import { getMessages } from "next-intl/server";




const CommonLayout = async ({ children, params }) => {
    const { locale } =  await params;
    
    const messages = await getMessages();
    return (
      <>
      <Navbar />
      <main className=" " locale={locale} messages={messages}>{children}</main>
      <ScrollToTop />
      <Footer />
        </>
    );
};

export default CommonLayout;