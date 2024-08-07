import { Link } from "@/internationalization/navigation";
import TypesLanguages from "@/types/TypesLanguages";

interface Props {
  children: React.ReactNode;
  href: string;
  size?: "small" | "medium" | "large";
  hierarchy?: 1 | 2 | 3 | 4 | 5;
  className?: string;
  onClick?: () => void;
  locale?: TypesLanguages;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

const MyLink = ({
  children,
  href,
  size,
  hierarchy,
  className = "",
  onClick,
  locale,
  target = "_self",
}: Props) => {
  return (
    <Link
      locale={locale}
      href={href}
      target={target}
      className={`
        btn
        ${className}
        ${size === "medium" ? "btn-md" : size === "large" ? "btn-lg" : "btn-sm"}
        ${
          hierarchy === 1
            ? "btn-1"
            : hierarchy === 2
            ? "btn-2"
            : hierarchy === 4
            ? "btn-4"
            : hierarchy === 5
            ? "btn-5"
            : "btn-3"
        }
        `}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default MyLink;
