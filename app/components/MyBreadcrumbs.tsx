import { Fragment } from "react";
import MyIcon from "./MyIcon";
import MyLink from "./MyLink";
import MyButton from "./MyButton";

interface IBreadcrumb {
  link: string;
  href?: string;
  onClick?: () => void;
}

interface Props {
  list: IBreadcrumb[];
  homeLink?: string;
}

const linkStyle = `!text-neutral-300 hover:!text-neutral-950 dark:!text-neutral-400 dark:hover:!text-neutral-100 whitespace-nowrap`;
const passiveStyle = `!text-neutral-950 dark:!text-neutral-100 whitespace-nowrap`;

const MyBreadcrumbs = ({ list, homeLink }: Props) => {
  return (
    <div className="flex items-center gap-my-8 !text-neutral-500">
      {homeLink && (
        <>
          <MyLink href={homeLink} hierarchy={4} className={linkStyle}>
            <MyIcon icon="FiHome" />
          </MyLink>
        </>
      )}
      {list.map((el, i) => (
        <Fragment key={el.link}>
          {((homeLink && i === 0) || i > 0) && (
            <div
              className={`
              ${
                i + 1 === list.length
                  ? passiveStyle
                  : "text-neutral-300 dark:text-neutral-400"
              }`}
            >
              <MyIcon icon="FiChevronRight" />
            </div>
          )}
          {el.href && (
            <MyLink
              href={el.href}
              hierarchy={4}
              className={`
              ${i + 1 === list.length ? passiveStyle : linkStyle}`}
            >
              {el.link}
            </MyLink>
          )}
          {el.onClick && (
            <MyButton
              hierarchy={4}
              onClick={el.onClick}
              className={`
              ${i + 1 === list.length ? passiveStyle : linkStyle}`}
            >
              {el.link}
            </MyButton>
          )}
          {!el.onClick && !el.href && <p className={passiveStyle}>{el.link}</p>}
        </Fragment>
      ))}
    </div>
  );
};

export default MyBreadcrumbs;
