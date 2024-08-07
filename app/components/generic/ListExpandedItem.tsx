import MyIcon, { TypeFi } from "@/app/components/MyIcon";
import { useTranslations } from "next-intl";
import { LegacyRef, forwardRef } from "react";
import MyTooltip from "../MyTooltip";
import Loader from "./Loader";
import { ActionIcon, Button, Tooltip } from "@mantine/core";

interface IAction {
  ico: TypeFi;
  label: string;
  onClick: () => void;
  loading?: boolean;
}

interface Props {
  title: string | number;
  titleOrder?: string | number;
  icoTitle?: TypeFi;
  order?: number | string;
  emptyText?: string | number;
  helpText?: string | number;
  onClick: () => void;
  actions?: IAction[];
  active?: boolean;
  dragging?: boolean;
  dragOver?: boolean;
  highlight?: boolean;
  statusIcon?: TypeFi;
}

const ListExpandedItem = forwardRef(function ListExpandedItem(
  {
    title,
    titleOrder,
    icoTitle,
    order,
    emptyText,
    helpText,
    onClick,
    actions,
    active,
    dragging,
    dragOver,
    highlight,
    statusIcon,
  }: Props,
  ref: LegacyRef<HTMLDivElement>,
) {
  const t = useTranslations("Surveys");

  return (
    <div
      className={`relative cursor-pointer overflow-hidden rounded-my-8 bg-neutral-100 transition-all hover:bg-neutral-200 active:scale-95 dark:bg-neutral-900 dark:hover:bg-neutral-800
    ${dragging ? "z-50 shadow-xl" : ""}`}
    >
      <div
        ref={ref}
        className={`border-x-8 border-r-transparent px-xs py-s transition-all
        ${
          active
            ? "border-l-primary-800 dark:border-l-primary_d"
            : "border-x-transparent"
        }
      `}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <div
          className={`flex flex-col gap-xs transition-transform
        ${active ? "translate-x-2" : ""}`}
        >
          <div className="flex items-center gap-xs">
            {!!icoTitle && <MyIcon icon={icoTitle} size={16} />}
            {emptyText && title.toString().length === 0 ? (
              <p className="secondary-text text-small !font-bold">
                {emptyText}
              </p>
            ) : (
              <p className="text-small">
                {!!titleOrder && <span className="mr-s">{titleOrder}</span>}
                {title}
              </p>
            )}
            <div className="ml-auto flex items-center gap-my-8">
              {statusIcon && <MyIcon icon={statusIcon} size={16} />}
              {highlight && (
                <div className="h-my-12 w-my-12 rounded-full bg-green-600" />
              )}
            </div>
          </div>

          {(!!actions || !!order || !!helpText) && (
            <div className="flex h-my-32 flex-row items-center justify-between font-medium">
              {(!!order || !!helpText) && (
                <div className={`flex h-5 items-center justify-center gap-xs`}>
                  {order && (
                    <span className="text-small !font-bold">{order}</span>
                  )}
                  {helpText && (
                    <span className="secondary-text text-small">
                      {helpText}
                    </span>
                  )}
                </div>
              )}
              {actions && (
                <div className="-mr-my-8 flex items-center justify-center">
                  {actions.map((el, i) => (
                    <Tooltip key={title + "-action-" + i} label={el.label}>
                      <ActionIcon
                        variant="subtle"
                        color="gray"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!el.loading) el.onClick();
                        }}
                      >
                        {el.loading ? <Loader /> : <MyIcon icon={el.ico} />}
                      </ActionIcon>
                    </Tooltip>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {dragOver && (
        <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center gap-xs bg-dark opacity-90 backdrop-blur-xl">
          <div className="ico-file-tray-stacked-outline h-my-32 w-m invert dark:invert-0" />
          <p className="text-heading4 text-white dark:text-black">
            {t("drop_here")}
          </p>
        </div>
      )}
    </div>
  );
});

export default ListExpandedItem;
