"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { motion } from "framer-motion";

export default function Header({ data }: any) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#6E7D66] relative">
      <div className="w-full mx-auto px-8 py-4 lg:py-6 flex justify-between items-center">
        {/* LOGO */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/">
            <Image
              src={data.logo.url}
              alt="logo"
              width={120}
              height={50}
              // Logo keeps lg sizing preference, but layout structure moves to xl
              className="w-40 h-auto lg:w-40"
              unoptimized // <--- ADDED THIS PROP
            />
          </Link>
        </motion.div>

        {/* DESKTOP NAV - Changed lg:flex to xl:flex */}
        <nav className="hidden xl:flex gap-8 items-center">
          {data.links.map((link: any) => (
            <Link
              key={link.id}
              href={link.href || "/"}
              className="text-white hover:text-[#D4AF84] transition-all duration-300 text-lg"
            >
              {link.text}
            </Link>
          ))}
        </nav>

        {/* DESKTOP BUTTONS - Changed lg:flex to xl:flex */}
        <div className="hidden xl:flex items-center gap-4">
          {data?.button?.map((item: any) => (
            <Button
              key={item.id}
              color={item.color}
              href={`/${item.href || "/"}`}
              className="font-semibold"
            >
              {item.text}
            </Button>
          ))}
        </div>

        {/* MOBILE MENU BUTTON - Changed lg:hidden to xl:hidden */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="xl:hidden text-white text-3xl"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU - Changed lg:hidden to xl:hidden */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMenuOpen ? 1 : 0,
          height: isMenuOpen ? "auto" : 0,
        }}
        transition={{ duration: 0.3 }}
        className="xl:hidden overflow-hidden bg-[#6E7D66]"
      >
        <div className="flex flex-col items-center gap-6 p-6">
          {data.links.map((link: any) => (
            <Link
              key={link.id}
              href={link.href || "/"}
              className="text-white hover:text-[#D4AF84] transition-all duration-300 text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.text}
            </Link>
          ))}

          <div className="flex flex-col w-full gap-3 max-w-xs">
            {data?.button?.map((item: any) => (
              <Button
                key={item.id}
                color={item.color}
                href={`/${item.href || "/"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.text}
              </Button>
            ))}
          </div>
        </div>
      </motion.div>
    </header>
  );
}
