"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/internationalization/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Animations from "@/app/styles/animations";
import { useDetectClickOutside } from "react-detect-click-outside";

function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useDetectClickOutside({ onTriggered: () => setOpen(false) });

  return (
    <div className="relative">
      <div
        className={`bg-lightest dark:bg-neutral-950 rounded-lg flex gap-3 cursor-pointer btn`}
        onClick={() => setOpen(!open)}
      >
        <Image
          alt={locale === "es" ? "Español" : "English"}
          src={
            locale === "es"
              ? "/img/bandera-spanish.png"
              : "/img/bandera-english.png"
          }
          width={25}
          height={20}
          className="rounded-sm"
        />
        <p className="text-sm text-black dark:text-white">
          {locale === "es" ? "ES" : "EN"}
        </p>
      </div>
      <AnimatePresence>
        {open && (
          <motion.ul
            {...Animations.dropdown}
            ref={ref}
            className="z-40 shadow-lg card !p-0 !rounded-lg overflow-hidden absolute left-0 right-0"
          >
            <li>
              <Link
                href={pathname}
                locale={"en"}
                className="list-item clickable justify-center"
              >
                EN
              </Link>
            </li>
            <li>
              <Link
                href={pathname}
                locale={"es"}
                className="list-item clickable justify-center"
              >
                ES
              </Link>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LanguageSwitcher;
