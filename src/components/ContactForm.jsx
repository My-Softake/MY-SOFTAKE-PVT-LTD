"use client";

import { useState, useRef, useEffect } from "react";
import { HiChevronDown } from "react-icons/hi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Toaster, toast } from "react-hot-toast";

const ContactForm = ({ t, helpOptions }) => {
  const [selectedHelp, setSelectedHelp] = useState([]);  //key store korbe
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const dropdownRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //  key theke label pabar jonno function
  const getLabelFromKey = (key) => {
    const option = helpOptions.find((opt) => opt.key === key);
    return option ? option.label : key;
  };

  // ১.এখানে label এর বদলে key ব্যবহার করা হচ্ছে ekhane lebel er poriborte kew bebohar kora hosse
  const handleHelpToggle = (optionKey) => {
    if (selectedHelp.includes(optionKey)) {
      setSelectedHelp(selectedHelp.filter((item) => item !== optionKey));
    } else {
      setSelectedHelp([...selectedHelp, optionKey]);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      if (!selectedHelp.includes(inputValue.trim())) {
        setSelectedHelp([...selectedHelp, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const handleRemoveSelected = (itemKey) => {
    setSelectedHelp(selectedHelp.filter((i) => i !== itemKey));
  };

  /* ================= UPDATED SUBMIT METHOD ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedHelp.length === 0) {
      toast.error("Please select at least one service.");
      return;
    }

    setSubmitting(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      
      service: selectedHelp,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/contact/contact-us/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      let data = {};
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      }

      if (res.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setSelectedHelp([]);
      } else {
        console.error("Server Error Details:", data);
        const errorMsg = data.service ? `Service: ${data.service[0]}` : (data.error || "Validation failed");
        toast.error(errorMsg);
      }
    } catch (err) {
      console.error("Network Error:", err);
      toast.error("Failed to connect to the server.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 md:p-12 mt-10">
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit} className="space-y-6 text-left">
        <h3 className="font-bold text-4xl dark:text-black">
          {t("form.sendYourMessage")}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
              {t("form.name")}
            </label>
            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t("form.namePlaceholder")}
              className="w-full px-5 py-4 border dark:text-gray-600 border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-all shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
              {t("form.emailLabel")}
            </label>
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("form.emailPlaceholder")}
              className="w-full px-5 py-4 border dark:text-gray-600 border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Multi-Select Tool Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
            {t("form.helpWith")}
          </label>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-5 py-4 border dark:text-gray-600 border-gray-300 rounded cursor-pointer flex justify-between items-center transition-all focus-within:ring-2 focus-within:ring-blue-100 bg-white shadow-sm"
          >
            <div className="flex flex-wrap gap-2 items-center flex-1">
              {selectedHelp.length > 0 ? (
                selectedHelp.map((itemKey) => (
                  <span
                    key={itemKey}
                    className="bg-blue-600 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1 shadow-sm"
                  >
                    {getLabelFromKey(itemKey)}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveSelected(itemKey);
                      }}
                      className="ml-1 text-white hover:text-red-200 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))
              ) : (
                <span className="text-gray-400">
                  {t("form.selectServices")}
                </span>
              )}
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleInputKeyDown}
                className="outline-none px-1 py-0.5 text-sm text-slate-700 min-w-[50px] flex-1"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <HiChevronDown
              className={`text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          </div>

          {isOpen && (
            <div className="absolute z-50 w-full mt-2 dark:text-gray-600 bg-white border border-gray-100 shadow-2xl rounded-xl overflow-hidden max-h-60 overflow-y-auto">
              {helpOptions.map((option) => (
                <div
                  key={option.key}
                  onClick={() => handleHelpToggle(option.key)}
                  className={`px-5 py-3 cursor-pointer transition-colors flex justify-between items-center ${
                    selectedHelp.includes(option.key)
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {option.label}
                  {selectedHelp.includes(option.key) && (
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
            {t("form.subject")}
          </label>
          <input
            required
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder={t("form.subjectPlaceholder")}
            className="w-full px-5 py-4 border dark:text-gray-600 border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-all shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
            {t("form.message")}
          </label>
          <textarea
            required
            rows="5"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={t("form.messagePlaceholder")}
            className="w-full px-5 py-4 border dark:text-gray-600 border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-all shadow-sm resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full md:w-max px-10 py-4 bg-[#27A0DB] text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg uppercase tracking-widest text-sm flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <AiOutlineLoading3Quarters className="animate-spin text-lg" />
              Sending...
            </>
          ) : (
            t("form.sendMessage")
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;