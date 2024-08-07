import { Link } from "@/internationalization/navigation";
import { Fragment } from "react";
import { motion } from "framer-motion";

interface Props {
  activeTab: number;
  selectTab?: (index: number) => void;
  tabs: { text: string; onClick?: () => void; href?: string }[];
  links?: boolean;
  hierarchy?: 1 | 2;
  className?: string;
  mobileCol?: boolean;
}

const MyTabs = ({
  activeTab,
  selectTab,
  tabs,
  links = false,
  hierarchy = 1,
  className = "",
  mobileCol = false,
}: Props) => {
  const classNameItem = (i: number) =>
    hierarchy === 2
      ? `relative btn btn-sm !px-my-12 btn-4 border-b-[3px] !rounded-none text-small hover:border-neutral-400 dark:hover:border-neutral-600 border-neutral-200 dark:border-neutral-700
        ${
          activeTab === i
            ? "!text-primary-900 dark:!text-primary-400"
            : "!text-neutral-700 dark:!text-neutral-300"
        }
        `
      : ` relative btn !px-my-12 !rounded-none
      ${
        mobileCol
          ? "!w-full lg:!w-max first:!rounded-t-my-4 first:!rounded-b-none last:!rounded-b-my-4 last:!rounded-t-none lg:first:!rounded-l-my-4 lg:last:!rounded-r-my-4 lg:first:!rounded-r-none lg:last:!rounded-l-none btn-md lg:btn-sm"
          : "first:!rounded-l-my-4 last:!rounded-r-my-4 btn-sm"
      }
        ${
          activeTab === i
            ? "btn-1 dark:!border dark:!border-primary-700"
            : "btn-2 dark:!border-primary-700"
        }
        `;

  return (
    <div
      className={`relative flex h-max
    ${className}
    ${mobileCol ? "flex-col lg:flex-row w-full lg:w-max" : "w-max"}`}
    >
      {tabs.map((tab, index) => (
        <Fragment key={index}>
          {links ? (
            <Link href={tab.href ?? "/"} className={classNameItem(index)}>
              {tab.text}
            </Link>
          ) : (
            <div
              className={classNameItem(index)}
              onClick={() => {
                if (tab.onClick) tab.onClick();
                if (selectTab) selectTab(index);
              }}
            >
              <span>{tab.text}</span>
              {activeTab === index && (
                <motion.div
                  layout
                  layoutId={`tabAnimatedBar${tabs.join()}`}
                  className="absolute z-[1] h-[3px] left-0 right-0 -bottom-[3px] bg-primary-800 dark:bg-primary-400"
                />
              )}
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default MyTabs;
