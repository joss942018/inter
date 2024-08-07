import React from "react";
import { useTranslations } from "next-intl";

interface Props {
    activeTab: string;
    onTabClick: (tab: string) => void;
}

const NavigationBar = ({ activeTab, onTabClick }: Props) => {
    const t = useTranslations("Account");

    return (
        <div className="flex border border-gray-300 dark:border-gray-600 border-t-0 border-r-0 shadow-md  rounded-md">
            <div className="flex">
                <button
                    className={`${activeTab === "tab1" ? "navbarLinkActive text-primary dark:text-primary_d" : "navbarLink"} text-black dark:text-white py-2 px-4 mr-0.5 rounded-l-md`}
                    onClick={() => onTabClick("tab1")}
                >
                    {t("company")}
                </button>
                <button
                    className={`${activeTab === "tab2" ? "navbarLinkActive text-primary dark:text-primary_d" : "navbarLink"} text-black dark:text-white py-2 px-4 mr-0.5 rounded-r-md`}
                    onClick={() => onTabClick("tab2")}
                >
                    {t("security")}
                </button>
                <button
                    className={`${activeTab === "tab3" ? "navbarLinkActive text-primary dark:text-primary_d" : "navbarLink"} text-black dark:text-white py-2 px-4 mr-0.5 rounded-r-md`}
                    onClick={() => onTabClick("tab3")}
                >
                    {t("plan")}
                </button>
            </div>
        </div>
    );
};

export default NavigationBar;
