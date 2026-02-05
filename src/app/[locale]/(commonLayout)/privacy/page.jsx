
import { getTranslations } from 'next-intl/server';

export default async function PrivacyPolicy({params}) {
  const t = await getTranslations("PrivacyPage", params);

  // Helper to safely get array data
  const getArray = (key) => {
    try {
      const raw = t.raw(key);
      return Array.isArray(raw) ? raw : [];
    } catch {
      return [];
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto md:px-10 px-4 py-8 mt-20">
        
        {/* Header */}
        <div className="">
           
          <h1 className="text-4xl font-bold text-black">{t("title")}</h1>
          
        </div>

        {/* Introduction */}
        <div className="">
          <div className="mb-8 mt-6">
            <p className="text-gray-600 mb-4">
              {t("introduction1")}
            </p>
            <p className="text-gray-600">
              {t("introduction2")}
            </p>
          </div>

          {/* 1. Information We Collect */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4">{t("section1Title")}</h2>
            
            <h3 className="text-xl font-semibold text-black mb-3">{t("section1_1Title")}</h3>
            <p className="text-gray-600 mb-3">
              {t("section1_1Desc")}
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              {getArray("section1_1List").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className="text-gray-600 mb-4">
              {t("section1_1Desc2")}
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              {getArray("section1_1List2").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold text-black mt-6 mb-3">{t("section1_2Title", "1.2 Automatically Collected Information")}</h3>
            <p className="text-gray-600 mb-3">
              {t("section1_2Desc", "When you use our services, we automatically collect:")}
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              {getArray("section1_2List").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold text-black mt-6 mb-3">{t("section1_3Title", "1.3 Service-Specific Information")}</h3>
            <p className="text-gray-600 mb-3">
              {t("section1_3Desc", "Depending on the service category, we may collect additional information:")}
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              {getArray("section1_3List").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* 2. How We Use Your Information */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4">{t("section2Title", "2. How We Use Your Information")}</h2>
            <p className="text-gray-600 mb-3">
              {t("section2Desc", "We use the information we collect to:")}
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              {getArray("section2List").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* 3. Information Sharing and Disclosure */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4">{t("section3Title", "3. Information Sharing and Disclosure")}</h2>
            <p className="text-gray-600 mb-3">
              {t("section3Desc", "We do not sell your personal information. We may share your information with:")}
            </p>
            
            <h3 className="text-xl font-semibold text-black mt-4 mb-3">{t("section3_1Title", "3.1 Service Providers")}</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              {getArray("section3_1List").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold text-black mt-6 mb-3">{t("section3_2Title", "3.2 Legal Requirements")}</h3>
            <p className="text-gray-600 mb-3">
              {t("section3_2Desc", "We may disclose your information if required by law:")}
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              {getArray("section3_2List").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold text-black mt-6 mb-3">{t("section3_3Title", "3.3 Business Transfers")}</h3>
            <p className="text-gray-600">
              {t("section3_3Desc", "In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.")}
            </p>
          </div>

          {/* 4. Data Security */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4">{t("section4Title", "4. Data Security")}</h2>
            <p className="text-gray-600 mb-3">
              {t("section4Desc", "We implement appropriate technical and organizational measures to protect your personal information:")}
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              {getArray("section4List").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className="text-gray-600 mt-4">
              {t("section4Disclaimer", "However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee absolute security.")}
            </p>
          </div>

          {/* 5. Data Retention */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4">{t("section5Title", "5. Data Retention")}</h2>
            <p className="text-gray-600 mb-3">
              {t("section5Desc", "We retain your personal information only for as long as necessary:")}
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              {getArray("section5List").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* 6. Your Rights */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4">{t("section6Title", "6. Your Rights")}</h2>
            <p className="text-gray-600 mb-3">
              {t("section6Desc", "Depending on your location, you may have the following rights:")}
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              {getArray("section6List").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className="text-gray-600 mt-4">
              {t("section6Contact", "To exercise these rights, please contact us using the information provided below.")}
            </p>
          </div>

          {/* 7. Cookies and Tracking Technologies */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4">{t("section7Title", "7. Cookies and Tracking Technologies")}</h2>
            <p className="text-gray-600 mb-3">
              {t("section7Desc", "We use cookies and similar tracking technologies to:")}
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              {getArray("section7List").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className="text-gray-600">
              {t("section7Note", "You can control cookies through your browser settings. However, disabling cookies may affect your ability to use certain features of our services.")}
            </p>
          </div>

          {/* 8. Third-Party Links */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4">{t("section8Title", "8. Third-Party Links")}</h2>
            <p className="text-gray-600">
              {t("section8Desc", "Our services may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites. We encourage you to review the privacy policies of any third-party sites you visit.")}
            </p>
          </div>

          {/* 9. Children's Privacy */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4">{t("section9Title", "9. Children's Privacy")}</h2>
            <p className="text-gray-600">
              {t("section9Desc", "Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.")}
            </p>
          </div>

          {/* 10. International Data Transfers */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4">{t("section10Title", "10. International Data Transfers")}</h2>
            <p className="text-gray-600 mb-3">
              {t("section10Desc", "Your information may be transferred to and processed in countries other than your own. These countries may have different data protection laws. By using our services, you consent to this transfer.")}
            </p>
            <p className="text-gray-600">
              {t("section10Safeguards", "We ensure appropriate safeguards are in place for international data transfers in compliance with applicable laws.")}
            </p>
          </div>

          {/* 11. Changes to This Policy */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4">{t("section11Title", "11. Changes to This Policy")}</h2>
            <p className="text-gray-600 mb-3">
              {t("section11Desc", "We may update this Privacy Policy from time to time. We will notify you of any changes by:")}
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              {getArray("section11List").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className="text-gray-600 mt-4">
              {t("section11Note", "You are advised to review this Privacy Policy periodically for any changes. Changes are effective when posted.")}
            </p>
          </div>

        </div>
 
        
      </div>
    </div>
  );
}
