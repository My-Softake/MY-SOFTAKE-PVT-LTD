"use client"

// to do : changes required for client server mismatch and separate the form. 
import Link from "next/link";
import React, { use } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

const CareerDetailsPage = ({ params }) => {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const t = useTranslations("CareerPage");

  // Validate that the ID exists (1-6)
  const validIds = ["1", "2", "3", "4", "5", "6"];
  const isValidId = validIds.includes(String(id));

  //   form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  if (!isValidId) {
    return <div className="text-center py-20 text-red-500">{t("notFound")}</div>;
  }

  // Get career data from translations
  const careerForm = {
    jobTitle: t(`items.${id}.jobTitle`),
    jobType: t(`items.${id}.jobType`),
    location: t(`items.${id}.location`),
    description: t(`items.${id}.description`),
    educationalRequirements: t(`items.${id}.educationalRequirements`),
    experience: t(`items.${id}.experience`),
    jobLink: t(`items.${id}.jobLink`),
    jobResponsibilities: t.raw(`items.${id}.jobResponsibilities`),
    additionalRequirements: t.raw(`items.${id}.additionalRequirements`)
  };

  return (
    <div className="bg-white min-h-screen pt-16">
      <div
        className="py-10 md:py-20"
        style={{
          background: "linear-gradient(135deg, #17386f 0%, #2b59cf 100%)",
        }}
      >
        <div className="container mx-auto px-4 md:px-10">
          {/* Heading */}
          <h1 className="font-semibold text-white text-3xl sm:text-4xl md:text-5xl pt-6 md:pt-10 text-center md:text-left">
            {t("careerApplicationForm")}
          </h1>

          {/* Divider & Text */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-10 mt-8">
            {/* Line */}
            <div className="h-1 w-32 sm:w-48 md:w-[450px] bg-white hidden md:block"></div>

            {/* Description */}
            <p className="font-normal text-sm sm:text-base text-white max-w-xl text-center md:text-left">
              {t("formDescription")}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-10 py-10">
        {/* Title and Header Info */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {careerForm.jobTitle}
          </h1>
          <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
            <span>
              <strong>{t("location")}:</strong> {careerForm.location}
            </span>
            <span>|</span>
            <span>
              <strong>{t("jobType")}:</strong> {careerForm.jobType}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed text-lg">
            {careerForm.description}
          </p>
        </div>

        <div className="space-y-10">
          {/* Educational Requirements */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3  ">
              {t("educationalRequirements")}:
            </h2>
            <p className="text-gray-700 ml-1">
              {careerForm.educationalRequirements}
            </p>
            <p className="text-gray-700 ml-1 mt-1">
              <strong>{t("experience")}:</strong> {careerForm.experience}
            </p>
          </div>

          {/* Job Responsibilities */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3  ">
              {t("jobResponsibilities")}:
            </h2>
            <ul className="list-disc ml-5 space-y-2 text-gray-700">
              {careerForm.jobResponsibilities?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Additional Requirements */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3 ">
              {t("additionalRequirements")}:
            </h2>
            <ul className="list-disc ml-5 space-y-2 text-gray-700">
              {careerForm.additionalRequirements?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <h3 className="font-bold text-xl md:text-2xl text-black">
              {t("link")}:
              <Link
                href={careerForm.jobLink}
                target="_blank"
                rel="noopener noreferrer"
                className="pl-2 text-blue-600 cursor-pointer hover:underline"
              >
                {careerForm.jobLink}
              </Link>
            </h3>
          </div>
        </div>
      </div>

      {/* Application Form Section */}
      <div className="container mx-auto px-10  pb-10">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center md:text-left">
          {t("applicationForm")}
        </h2>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Name */}
          <div className="flex flex-col">
            <label className="font-semibold mb-2 text-gray-700">{t("formLabels.name")}*</label>
            <input
              type="text"
              {...register("name", { required: `${t("formLabels.name")} is required` })}
              placeholder={t("formLabels.name")}
              className="border border-gray-300 text-gray-700 p-3 py-5 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <label className="font-semibold mb-2 text-gray-700">{t("formLabels.gender")}*</label>
            <select
              {...register("gender", { required: `${t("formLabels.gender")} is required` })}
              className="border border-gray-300 text-gray-700 p-3 py-5 rounded focus:outline-none focus:border-blue-500 bg-white"
            >
              <option value="">{t("formLabels.selectGender")}</option>
              <option value="male">{t("formLabels.male")}</option>
              <option value="female">{t("formLabels.female")}</option>
              <option value="other">{t("formLabels.other")}</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col">
            <label className="font-semibold mb-2 text-gray-700">
              {t("formLabels.dateOfBirth")}*
            </label>
            <input
              type="date"
              {...register("dob", { required: `${t("formLabels.dateOfBirth")} is required` })}
              className="border border-gray-300 text-gray-700 p-3 rounded py-5 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="font-semibold mb-2 text-gray-700">{t("formLabels.phone")}*</label>
            <input
              type="tel"
              {...register("phone", {
                required: `${t("formLabels.phone")} is required`,
                minLength: {
                  value: 10,
                  message: "Invalid phone number",
                },
              })}
              placeholder="+880"
              className="border text-gray-700 border-gray-300 p-3 py-5 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="font-semibold mb-2 text-gray-700">{t("formLabels.email")}*</label>
            <input
              type="email"
              {...register("email", {
                required: `${t("formLabels.email")} is required`,
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="example@mail.com"
              className="border text-gray-700 border-gray-300 p-3 py-5 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Nationality */}
          <div className="flex flex-col">
            <label className="font-semibold mb-2 text-gray-700">
              {t("formLabels.nationality")}*
            </label>
            <input
              type="text"
              {...register("nationality", {
                required: `${t("formLabels.nationality")} is required`,
              })}
              placeholder={t("formLabels.nationality")}
              className="border text-gray-700 border-gray-300 p-3 py-5 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.nationality && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nationality.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="flex flex-col md:col-span-2">
            <label className="font-semibold mb-2 text-gray-700">{t("formLabels.address")}*</label>
            <input
              type="text"
              {...register("address", { required: `${t("formLabels.address")} is required` })}
              placeholder={t("formLabels.address")}
              className="border text-gray-700 border-gray-300 p-3 py-6 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Cover Letter */}
          <div className="flex flex-col md:col-span-2">
            <label className="font-semibold mb-2 text-gray-700">
              {t("formLabels.coverLetter")}
            </label>
            <textarea
              rows="5"
              {...register("coverLetter")}
              placeholder={t("formLabels.coverLetterPlaceholder")}
              className="border text-gray-700 border-gray-300 p-3 py-10 rounded focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>

          {/* Attach CV */}
          <div className="flex flex-col md:col-span-2">
            <label className="font-semibold mb-2 text-gray-700">
              {t("formLabels.attachCV")}*
            </label>
            <input
              type="file"
              {...register("cv", {
                required: "CV is required",
              })}
              accept=".pdf"
              className="border text-gray-700 border-dashed border-gray-400 p-6 py-16 rounded bg-gray-50 text-center cursor-pointer"
            />
            {errors.cv && (
              <p className="text-red-500 text-sm">{errors.cv.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full md:w-max bg-[#27A0DB] text-white px-12 py-4 rounded font-bold "
            >
              {t("formLabels.submitApplication")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CareerDetailsPage;

