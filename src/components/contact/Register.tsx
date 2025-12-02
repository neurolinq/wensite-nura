"use client"; // 1. Mark as Client Component

import Image from "next/image";
import { FiChevronDown } from "react-icons/fi";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Register({ data }: any) {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    if (!form.current) return;

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(
        (result) => {
          console.log("Email successfully sent!", result.text);
          setStatus("success");
          setIsSubmitting(false);
          form.current?.reset(); // Clear form after success
        },
        (error) => {
          console.error("Failed to send email:", error.text);
          setStatus("error");
          setIsSubmitting(false);
        }
      );
  };

  return (
    <div className="w-full mx-auto flex flex-col xl:grid xl:grid-cols-3 items-start justify-center p-6 lg:p-8 relative z-10 gap-8 lg:gap-12 py-12 lg:py-16">
      {/* Form Container */}
      <div className="h-auto col-span-2 w-full border border-[#00000040] bg-white rounded-2xl flex flex-col items-center p-8 lg:p-12 gap-8">
        <div className="flex flex-col items-center justify-center gap-4 lg:gap-5 text-center">
          <p className="font-bold text-3xl lg:text-4xl text-[#4D5A51]">
            Send Us a Message
          </p>
          <p className="font-bold text-lg lg:text-xl text-[#6E7D66]">
            Fill out the form below and we'll get back to you within 24 hours.
          </p>
        </div>

        {/* 2. Changed div to form and added ref/onSubmit */}
        <form
          ref={form}
          onSubmit={sendEmail}
          className="w-full flex flex-col items-center justify-center gap-6"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-6 lg:gap-8">
            <div className="w-full">
              <label
                htmlFor="user_name"
                className="block text-lg font-bold text-[#4D5A51] mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="user_name"
                name="user_name" // Required for EmailJS
                required
                className="border border-[#6E7D66] rounded-lg px-4 py-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF84] focus:border-transparent transition-colors"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="user_phone"
                className="block text-lg font-bold text-[#4D5A51] mb-2"
              >
                Phone
              </label>
              <input
                type="text"
                id="user_phone"
                name="user_phone" // Required for EmailJS
                required
                className="border border-[#6E7D66] rounded-lg px-4 py-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF84] focus:border-transparent transition-colors"
              />
            </div>
          </div>

          <div className="w-full">
            <label
              htmlFor="user_email"
              className="block text-lg font-bold text-[#4D5A51] mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="user_email"
              name="user_email" // Required for EmailJS
              required
              className="border border-[#6E7D66] rounded-lg px-4 py-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF84] focus:border-transparent transition-colors"
            />
          </div>

          <div className="flex flex-col w-full">
            <label
              htmlFor="subject"
              className="text-lg font-bold text-[#4D5A51] mb-2"
            >
              Select Type
            </label>

            <div className="relative w-full">
              <select
                id="subject"
                name="subject" // Required for EmailJS
                className="appearance-none border border-[#6E7D66] rounded-lg px-4 py-3 pr-10 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF84] focus:border-transparent transition-colors bg-white"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select Type
                </option>
                <option value="Book Appointment">Book Appointment</option>
                <option value="Contact Enquiries">Contact Enquiries</option>
              </select>

              <FiChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6E7D66] pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="w-full">
            <label
              htmlFor="message"
              className="block text-lg font-bold text-[#4D5A51] mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message" // Required for EmailJS
              required
              className="border border-[#6E7D66] rounded-lg px-4 py-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF84] focus:border-transparent transition-colors"
              rows={4}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#D4AF84] text-white font-bold text-lg px-6 py-3 rounded-lg cursor-pointer hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#D4AF84] focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>

          {/* Status Messages */}
          {status === "success" && (
            <p className="text-green-600 font-medium">
              Message sent successfully!
            </p>
          )}
          {status === "error" && (
            <p className="text-red-600 font-medium">
              Something went wrong. Please try again later.
            </p>
          )}

          <p className="text-[#6E7D66] text-sm text-center">
            By submitting this form, you agree to our privacy policy and consent
            to being contacted about your enquiry.
          </p>
        </form>
      </div>

      {/* Info Panel (Unchanged) */}
      <div className="h-auto xl:h-[830px] col-span-1 w-full border border-[#00000040] bg-white rounded-2xl p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col items-center justify-center gap-5 text-center">
          <p className="font-bold text-2xl sm:text-3xl lg:text-4xl text-[#4D5A51] break-words">
            {data?.title}
          </p>

          <p className="font-medium text-base sm:text-lg lg:text-xl text-[#6E7D66] max-w-2xl break-words">
            {data?.description}
          </p>

          <div className="flex flex-col w-full gap-6 mt-8">
            {data?.cards.map((card: any) => (
              <div
                key={card.id}
                className="bg-[#e2e4d6] w-full flex items-start gap-4 p-4 sm:p-6 rounded-2xl overflow-hidden"
              >
                <div className="flex items-start justify-center shrink-0">
                  <div className="bg-[#6E7D66] rounded-full p-3 flex items-center justify-center">
                    <Image
                      src={card.icon.url}
                      alt={card.title || "icon"}
                      width={24}
                      height={24}
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      unoptimized
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1 items-start w-full">
                  <p className="text-lg sm:text-xl font-bold text-[#4D5A51] break-words">
                    {card.title}
                  </p>
                  <p className="text-sm sm:text-base text-[#4D5A51] leading-relaxed break-words break-all">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}