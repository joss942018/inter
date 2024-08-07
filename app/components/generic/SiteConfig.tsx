"use client";

import Animations from "@/app/styles/animations";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import MyButton from "../MyButton";
import MyIcon from "../MyIcon";
import MyTooltip from "../MyTooltip";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import { ActionIcon } from "@mantine/core";

const SiteConfig = () => {
  const t = useTranslations("Navbar");
  const [open, setOpen] = useState(false);
  const ref = useDetectClickOutside({ onTriggered: () => setOpen(false) });

  return (
    <>
      <div className="relative">
        <MyTooltip text={t("site_config")} position="bottom">
          <ActionIcon
            onClick={() => setOpen(!open)}
            size={"lg"}
            radius={"xl"}
            variant="light"
            className="!dark:text-white !text-black"
          >
            <MyIcon icon="FiSettings" />
          </ActionIcon>
        </MyTooltip>
        <AnimatePresence>
          {open && (
            <motion.div
              {...Animations.card}
              ref={ref}
              className={`card dark-shadow absolute right-0 top-my-48 z-40 w-72 origin-top-right shadow-xl`}
            >
              <h3 className="text-h5">{t("site_config")}</h3>
              <div className="grid grid-cols-[1fr_max-content] items-center py-2">
                <p className="secondary-text text-sm">{t("theme")}</p>
                <ThemeSwitcher />
              </div>
              <div className="grid grid-cols-[1fr_max-content] items-center py-2">
                <p className="secondary-text text-sm">{t("language")}</p>
                <LanguageSwitcher />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
export default SiteConfig;
