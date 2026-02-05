import { getTranslations } from "next-intl/server";



export default async function TermsAndService({params}) {
  const t = getTranslations("TermsPage",params);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto md:px-10 px-2 py-8">
        
        {/* Header */}
        <div className="mb-12">
        
          <h1 className="text-4xl font-bold text-gray-900 mt-4 mb-2">{t("title")}</h1>
          <div className="border-b border-gray-300 pt-4"></div>
        </div>

        {/* Main Content */}
        <div className=" p-8">
          
          {/* 1. Acceptance of Terms */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("section1Title")}</h2>
            <p className="text-gray-700 mb-3">
              {t("section1Desc")}
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {t.raw("section1List").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* 2. Service Categories */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("section2Title")}</h2>
            <p className="text-gray-700 mb-3">
              {t("section2Desc")}
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {t.raw("section2List").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* 3. User Responsibilities */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("section3Title")}</h2>
            <p className="text-gray-700 mb-3">
              {t("section3Desc")}
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {t.raw("section3List").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* 4. Payment Terms */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("section4Title")}</h2>
            <p className="text-gray-700 mb-3">
              {t("section4Desc")}
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {t.raw("section4List").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* 5. Intellectual Property */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("section5Title")}</h2>
            <p className="text-gray-700 mb-3">
              {t("section5Desc")}
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {t.raw("section5List").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* 6. Liability and Limitations */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("section6Title")}</h2>
            <p className="text-gray-700 mb-3">
              {t("section6Desc")}
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {t.raw("section6List").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* 7. Termination */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("section7Title")}</h2>
            <p className="text-gray-700 mb-3">
              {t("section7Desc")}
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {t.raw("section7List").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* 8. Governing Law */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("section8Title")}</h2>
            <p className="text-gray-700 mb-3">
              {t("section8Desc")}
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {t.raw("section8List").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* 9. Definitions */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("section9Title")}</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {t.raw("section9List").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          
 

        </div>

        

      </div>
    </div>
  );
}