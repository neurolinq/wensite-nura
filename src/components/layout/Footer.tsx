"use client"; // 1. Mark as Client Component

import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button"; // Your custom button component (used for navigation links)
import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Footer({ data }: any) {
  // 2. State for handling input and submission status
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    // 3. Construct the data to send
    // We reuse the existing template variables.
    // We set 'message' to the specific format you requested.
    const templateParams = {
      user_name: "Newsletter Subscriber", // Placeholder name
      user_email: email, // The subscriber's email
      subject: "New Newsletter Subscription",
      message: `${email} has subscribed`, // The specific message text
    };

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(
        (result) => {
          console.log("Subscription sent!", result.text);
          setStatus("success");
          setEmail(""); // Clear the input

          // Reset status after 3 seconds
          setTimeout(() => setStatus("idle"), 3000);
        },
        (error) => {
          console.error("Subscription failed:", error.text);
          setStatus("error");
        }
      );
  };

  return (
    <div className="h-auto">
      {/* Footer */}
      <div className="relative bg-[#6E7D66] w-full h-auto p-6 lg:px-10 pt-24 lg:pt-30 lg:pb-8 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-20">
          {/* Logo + About + Email */}
          <div className="md:col-span-3 lg:col-span-2">
            <Image
              src={`${data.logo.url}`}
              alt={"logo"}
              width={100}
              height={100}
              className="w-16"
              unoptimized
            />

            <p className="text-white text-base lg:text-lg mt-3 font-medium lg:max-w-sm">
              {data?.description}
            </p>

            {/* Stay Updated */}
            <div className="flex flex-col items-start gap-3 mt-8 w-full">
              <p className="text-white text-lg font-medium">Stay Updated :</p>

              {/* 4. Subscription Form */}
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:max-w-lg"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/40 p-3 rounded-xl placeholder:text-white w-full min-w-0 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF84]"
                  placeholder="Your Email"
                  disabled={status === "loading" || status === "success"}
                />

                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className={`bg-white text-[#6E7D66] px-5 py-3 rounded-xl cursor-pointer w-full sm:w-auto whitespace-nowrap font-medium transition-all ${
                    status === "success" ? "bg-green-100 text-green-700" : ""
                  }`}
                >
                  {status === "loading"
                    ? "..."
                    : status === "success"
                    ? "Subscribed!"
                    : "Subscribe"}
                </button>
              </form>

              {/* Error Message */}
              {status === "error" && (
                <p className="text-red-200 text-sm">
                  Something went wrong. Please try again.
                </p>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="h-full flex flex-col items-start gap-3">
            <p className="text-white text-xl">Quick Links</p>
            {data?.quicksLinks?.map((link: any) => (
              <Link
                href={link.href === "home" ? "/" : `/${link.href}`}
                className="text-lg text-white"
                key={link.id}
              >
                {link.text}
              </Link>
            ))}
          </div>

          {/* Services */}
          <div className="h-full flex flex-col items-start gap-3">
            <p className="text-white text-xl">Our services</p>
            {data?.ourServices?.map((link: any) => (
              <Link
                href={"/services"}
                key={link.id}
                className="text-lg text-white hover:text-[#D4AF84] transition-all duration-300 cursor-pointer"
              >
                {link.text}
              </Link>
            ))}
          </div>

          {/* Contact + Socials */}
          <div className="h-full flex flex-col items-start gap-3">
            <p className="text-white text-xl">Contact Us</p>
            {data?.contact?.map((link: any) => (
              <div
                className="text-lg text-white flex items-center gap-2"
                key={link.id}
              >
                <Image
                  src={`${link.icon.url}`}
                  alt={"contact icon"}
                  width={100}
                  height={100}
                  className="w-4"
                  unoptimized
                />
                <p className="text-sm text-white hover:text-[#D4AF84] transition-all duration-300 cursor-pointer ">
                  {link.text}
                </p>
              </div>
            ))}

            {/* Socials */}
            <div className="flex items-center gap-5 mt-4">
              <p className="text-md text-white">Follow</p>
              {data?.socials.map((link: any) => (
                <Link href={link.href} key={link.id}>
                  <Image
                    src={`${link.icon.url}`}
                    alt={"social icon"}
                    width={100}
                    height={100}
                    className="w-4 hover:text-[#D4AF84] transition-all duration-300 cursor-pointer wrap-break-words "
                    unoptimized
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-white mt-10"></div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-white text-sm lg:text-md mt-3 lg:mt-0 text-center lg:text-left lg:max-w-sm">
            {data?.copyright}
          </p>

          <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-center lg:gap-5 mt-4 lg:mt-4">
            <p className="text-white text-sm lg:text-md lg:max-w-sm">
              {data?.privacy?.title}
            </p>

            <div className="flex items-center gap-2 flex-wrap justify-center">
              {data?.privacy?.tags.map((tag: any) => (
                <div
                  className="bg-white/20 text-sm text-white p-3 rounded-xl"
                  key={tag.id}
                >
                  {tag.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
