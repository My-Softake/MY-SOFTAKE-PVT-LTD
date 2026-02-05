"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import TeamSection from "@/components/modules/public/TeamSection";
import FAQSection from "@/components/modules/public/FAQSection";

const TeamPage = () => {
  const t = useTranslations("TeamPage");
  const [teams, setTeams] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetch("/data/TeamMemberData.json");
        const data = await res.json();
        setTeams(data);
      } catch (error) {
        console.log("Data fetch error:", error);
      }
    };

    fetchTeams();
  }, []);

  if (!teams) return <p>{t("loading")}</p>;

  // Function to translate designations
  const translateDesignation = (designation) => {
    return t(`designations.${designation}`, { defaultValue: designation });
  };

  // Function to translate names
  const translateName = (name) => {
    return t(`names.${name}`, { defaultValue: name });
  };

  // Function to translate email label
  const translateEmail = () => {
    return t("email", { defaultValue: "Email:" });
  };

  // Function to translate phone label
  const translatePhone = () => {
    return t("phone", { defaultValue: "Phone:" });
  };

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-10 pt-30">
        <TeamSection
          title={t("managementTeam.title")}
          subtitle={t("managementTeam.subtitle")}
          members={teams.management}
          translateDesignation={translateDesignation}
          translateName={translateName}
          translateEmail={translateEmail}
          translatePhone={translatePhone}
        />
        <TeamSection
          title={t("adviserTeam.title")}
          subtitle=""
          members={teams.adviser}
          translateDesignation={translateDesignation}
          translateName={translateName}
          translateEmail={translateEmail}
          translatePhone={translatePhone}
        />
        <TeamSection
          title={t("marketingTeam.title")}
          subtitle=""
          members={teams.marketing}
          translateDesignation={translateDesignation}
          translateName={translateName}
          translateEmail={translateEmail}
          translatePhone={translatePhone}
        />
        <TeamSection
          title={t("itTeam.title")}
          subtitle=""
          members={teams.it}
          translateDesignation={translateDesignation}
          translateName={translateName}
          translateEmail={translateEmail}
          translatePhone={translatePhone}
        />
        <div className="mb-10">
          <FAQSection />
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
