"use client";

import MyButton from "@/app/components/MyButton";
import MyIcon from "@/app/components/MyIcon";
import MyLink from "@/app/components/MyLink";
import MyTabs from "@/app/components/MyTabs";
import Loader from "@/app/components/generic/Loader";
import NavbarLogo from "@/app/components/generic/NavbarLogo";
import SessionMenu from "@/app/components/generic/SessionMenu";
import SiteConfig from "@/app/components/generic/SiteConfig";
import NavbarContext from "@/app/context/NavbarContext";
import useWindowSize from "@/app/hooks/useWindowSize";
import Animations from "@/app/styles/animations";
import { Link, usePathname } from "@/internationalization/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useContext, useEffect, useState } from "react";
import Layout from "../survey/[code]/layout";

interface Props {
  onSurveys?: boolean;
}

const Navbar = ({ onSurveys }: Props) => {
  //Close NavBar on Movile Interface
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const { width } = useWindowSize();

  // const { sesionActiva } = useContext(UserContext);
  const session = useSession();
  const activeSession = !!session.data;

  const t = useTranslations("Navbar");

  const pathname = usePathname();
  const [activePath, setActivePath] = useState("");
  useEffect(() => {
    setActivePath(pathname.split("/")[1]);
  }, [pathname]);

  useEffect(() => {
    const path = pathname?.at(0) === "/" ? pathname.slice(1) : pathname ?? "";
    // path.split("/")[0] === "surveys" && !activeSession && router.push("/login");
    path.split("/")[1] === "login";
  }, [activeSession, pathname]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activePath]);

  const renderLinks = () =>
    [
      {
        name: t("home"),
        ico: "FiHome",
        path: `/`,
        pathLink: "",
      },
      // {
      //   name: t("about_us"),
      //   ico: "FiHome",
      //   path: `/about-us`,
      //   pathLink: "about-us",
      // },
      {
        name: t("contact"),
        ico: "FiPhone",
        path: `/contact`,
        pathLink: "contact",
      },
      {
        name: t("help"),
        ico: "FiHelpCircle",
        path: `/help`,
        pathLink: "help",
      },
    ].map((el) => (
      <li key={el.pathLink}>
        <Link
          href={el.path}
          onClick={() => {
            toggleMobileMenu();
          }}
          className={`relative flex w-full items-center gap-my-16 border-l-[3px] px-my-16 py-my-12 lg:w-max lg:border-b-[3px] lg:border-l-0 lg:px-0 lg:pb-[9px] lg:pt-[11px]
        ${
          activePath === el.pathLink
            ? "!text-neutral-950 dark:!text-neutral-50"
            : "border-transparent !text-neutral-400 hover:border-primary-200 hover:!text-neutral-800 dark:hover:border-primary-900 dark:hover:!text-neutral-200"
        }
        `}
        >
          <div className="lg:hidden">
            <MyIcon
              icon={el.ico as "FiHome" | "FiPhone"}
              size={24}
              strokeWidth={activePath === el.pathLink ? 3 : 2}
            />
          </div>
          {el.name}
          {activePath === el.pathLink && (
            <motion.div
              layoutId="bottomBorderNavbarLink"
              layout
              className="absolute -left-[3px] bottom-0 top-0 w-[3px] bg-primary-500 md:-bottom-[3px] md:left-0 md:right-0 md:top-auto md:h-[3px] md:w-full"
            />
          )}
        </Link>
      </li>
    ));

  return (
    <>
      {width && width > 1024 ? (
        <DesktopTitleBar
          renderLinks={renderLinks}
          activePath={activePath}
          activeSession={activeSession}
          toggleMobileMenu={toggleMobileMenu}
          onSurveys={onSurveys}
        />
      ) : (
        <>
          <MobileTitleBar
            isMobileMenuOpen={isMobileMenuOpen}
            toggleMobileMenu={toggleMobileMenu}
            activeSession={activeSession}
          />
          <MobileMenu
            renderLinks={renderLinks}
            toggleMobileMenu={toggleMobileMenu}
            isMobileMenuOpen={isMobileMenuOpen}
            activeSession={activeSession}
            onSurveys={onSurveys}
            activePath={activePath}
          />
        </>
      )}
    </>
  );
};

export default Navbar;

const DesktopTitleBar = ({
  onSurveys,
  renderLinks,
  activePath,
  activeSession,
  toggleMobileMenu,
}: {
  onSurveys?: boolean;
  renderLinks: () => React.ReactNode;
  activePath: string;
  activeSession: boolean;
  toggleMobileMenu: () => void;
}) => {
  const session = useSession();

  return (
    <div className="decorative-border fixed z-30 hidden h-my-48 w-full justify-center border-b bg-white dark:bg-neutral-950 lg:flex">
      <div className="absolute left-0 flex h-my-48 items-center">
        <NavbarLogo link />
        <div
          id="navbar-start-portal"
          className="mx-4 hidden items-center lg:flex"
        />
      </div>
      <div className="absolute left-1/2 hidden h-my-48 -translate-x-1/2 lg:flex">
        {!onSurveys && (
          <ul className="flex h-full w-full items-center justify-center gap-my-24">
            {renderLinks()}
          </ul>
        )}
        <div
          id="navbar-center-portal"
          className="hidden items-center lg:flex"
        />
      </div>
      <div className="absolute right-my-4 flex h-my-48 items-center gap-3">
        <div
          id="navbar-end-portal"
          className="mx-4 hidden min-w-[320px] items-center lg:flex lg:min-w-0"
        />
        {session.status === "loading" ? (
          <Loader />
        ) : (
          <>
            <SessionLinks
              activePath={activePath}
              activeSession={activeSession}
              toggleMobileMenu={toggleMobileMenu}
              onSurveys={onSurveys}
              desktop
            />
            {activeSession && <SessionMenu />}
          </>
        )}
        <SiteConfig />
      </div>
    </div>
  );
};

const MobileTitleBar = ({
  isMobileMenuOpen,
  toggleMobileMenu,
  activeSession,
}: {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  activeSession: boolean;
}) => {
  const { mobilePortalsVisible } = useContext(NavbarContext);

  return (
    <div className="relative flex w-full flex-col lg:hidden">
      <div className="decorative-border fixed z-30 flex h-my-48 w-full border-b bg-white dark:bg-neutral-950">
        <div className="flex items-center">
          <MyButton hierarchy={4} onClick={toggleMobileMenu} squared>
            <MyIcon icon={isMobileMenuOpen ? "FiX" : "FiMenu"} size={24} />
          </MyButton>
          <NavbarLogo link />
        </div>
        <div
          id="navbar-start-portal"
          className="my-scrollbar flex max-w-[40%] overflow-x-auto overflow-y-hidden"
        />
        <div className="flex flex-1 items-center justify-end pr-my-4">
          {activeSession && <SessionMenu />}
          <SiteConfig />
        </div>
      </div>
      <motion.div
        layout
        className={`decorative-border absolute left-0 right-0 z-10 flex flex-col border-b bg-white dark:bg-neutral-950
          ${mobilePortalsVisible ? "top-my-48" : "bottom-my-48"}`}
      >
        <div id="navbar-end-portal" className="flex h-max w-screen" />
        <div id="navbar-center-portal" className="flex h-max w-screen" />
      </motion.div>
    </div>
  );
};

const MobileMenu = ({
  renderLinks,
  toggleMobileMenu,
  isMobileMenuOpen,
  activeSession,
  onSurveys,
  activePath,
}: {
  renderLinks: () => React.ReactNode;
  toggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
  activeSession: boolean;
  onSurveys?: boolean;
  activePath: string;
}) => {
  return (
    <>
      <motion.nav
        layout
        tabIndex={0}
        className={`fixed bottom-0 top-my-48 z-30 h-[calc(100vh_-_48px)] w-my-256 bg-white pt-my-24 dark:bg-neutral-950 lg:hidden
      ${isMobileMenuOpen ? "left-0" : "-left-full"}
      `}
      >
        <ul>{renderLinks()}</ul>
        <ul className="absolute bottom-my-96 left-0 right-0 top-auto flex w-full flex-col gap-my-12 px-my-16">
          <SessionLinks
            activePath={activePath}
            activeSession={activeSession}
            toggleMobileMenu={toggleMobileMenu}
            onSurveys={onSurveys}
          />
        </ul>
      </motion.nav>
      <div></div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            {...Animations.fadeOpacity}
            className={`fixed bottom-0 left-0 right-0 top-my-48 z-[29] h-[calc(100vh_-_48px)] w-screen bg-neutral-950 lg:hidden`}
            onClick={toggleMobileMenu}
          />
        )}
      </AnimatePresence>
    </>
  );
};

const SessionLinks = ({
  activeSession,
  onSurveys,
  toggleMobileMenu,
  activePath,
  desktop = false,
}: {
  activeSession: boolean;
  onSurveys?: boolean;
  toggleMobileMenu: () => void;
  activePath: string;
  desktop?: boolean;
}) => {
  const t = useTranslations("Navbar");
  return (
    <>
      {activeSession ? (
        <>
          {!onSurveys && (
            <>
              <MyLink
                href={`/surveys`}
                onClick={toggleMobileMenu}
                hierarchy={activePath === "surveys" ? 1 : 2}
                size={desktop ? "small" : "medium"}
                className={`btn btn-sm join-item !w-full justify-center lg:!w-max`}
              >
                {t("my_surveys")}
              </MyLink>
            </>
          )}
        </>
      ) : (
        <>
          <MyTabs
            mobileCol
            activeTab={
              activePath === "login" ? 0 : activePath === "signup" ? 1 : -1
            }
            tabs={[
              {
                text: t("login"),
                href: "/login",
              },
              {
                text: t("signup"),
                href: "/signup",
              },
            ]}
            links
          />
        </>
      )}
    </>
  );
};
