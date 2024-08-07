"use client";

import { useTranslations } from "next-intl";
import { IValidacion } from "../../../helpers/Validar";
import MyIcon, { TypeFi } from "../MyIcon";

export type TypeFieldType = "required" | "optional";

interface Props {
  name: string;
  children: React.ReactNode | JSX.Element | JSX.Element[];
  focus: boolean;
  label?: string;
  disabled?: boolean;
  validacion?: IValidacion;
  id?: string;
  onClick?: () => void;
  textArea?: boolean;
  fieldType?: TypeFieldType;
  className?: string;
  icon?: TypeFi;
}

const ContInput = ({
  label,
  name,
  children,
  disabled = false,
  validacion,
  focus,
  id,
  onClick,
  textArea = false,
  fieldType,
  className = "",
  icon,
}: Props) => {
  const t = useTranslations();
  const isLabelEmpty = label?.trim() === "";

  return (
    <div
      className={`relative flex flex-col gap-xxs ${className}`}
      onClick={onClick}
    >
      {label && (
        <label
          htmlFor={id ?? name}
          className={`w-max text-small
        ${
          validacion && !validacion.validado && validacion.mensaje.length > 0
            ? "text-error"
            : focus
            ? "text-primary dark:text-primary_d"
            : "text-dark dark:text-lightest_d"
        }
        `}
        >
          {!isLabelEmpty && (
            <>
              {label}{" "}
              <span>
                {fieldType === "required"
                  ? "*"
                  : fieldType === "optional"
                  ? `(${t("optional")})`
                  : ""}
              </span>
            </>
          )}
        </label>
      )}
      <div className="flex flex-col">
        {validacion &&
          !validacion?.validado &&
          validacion.mensaje.length > 0 && (
            <div className="flex items-center w-max gap-1">
              <div className="ico-close-outline w-3 h-3 errorColorFilter rounded-full border" />
              <span className={`text-error h-max text-xsmall`}>
                {validacion?.mensaje}
              </span>
            </div>
          )}
        <div
          className={`border rounded-my-4 h-l flex items-center
        ${
          validacion && !validacion.validado && validacion.mensaje.length > 0
            ? "border-error"
            : focus
            ? "border-primary-600"
            : "non-decorative-border"
        }
        ${textArea ? "h-full min-h-[150px] max-h-80" : "h-11"}
        ${disabled ? "bg-neutral-200 dark:bg-neutral-600" : ""}
        `}
        >
          {icon && (
            <label htmlFor={id ?? name} className="p-my-12 pr-my-4">
              <MyIcon icon={icon} />
            </label>
          )}
          {children}
        </div>
      </div>
    </div>
  );
  // return (
  //   <div className={`relative flex flex-col w-full`} onClick={onClick}>
  //     <div
  //       className={`
  //       ${textArea ? "h-full min-h-[150px] max-h-80" : "h-11"}
  //       ${styles.contInput}
  //       ${disabled ? styles.disabled : ""}
  //       `}
  //     >
  //       {children}
  //     </div>
  //     <fieldset
  //       className={`absolute border rounded-lg w-full h-[calc(100%_+_0.5rem)] -mt-2
  //     ${
  //       validacion && !validacion?.validado && validacion.mensaje.length > 0
  //         ? "border-error"
  //         : focus
  //         ? "border-primary dark:border-primary_d"
  //         : "border-medium dark:border-light_d"
  //     }
  //       `}
  //     >
  //       <legend
  //         className={`text-xs text-transparent text-left overflow-hidden whitespace-nowrap ml-2
  //         ${showPlaceholder ? "w-[0.01px]" : "px-1"}
  //         `}
  //       >
  //         <span>{label}</span>
  //       </legend>
  //     </fieldset>
  //     <label
  //       htmlFor={id ?? name}
  //       className={`w-max h-full
  //       ${textArea ? "items-start translate-y-3" : "items-center"}
  //       ${styles.label}
  //       ${
  //         showPlaceholder
  //           ? "text-dark dark:text-lightest_d"
  //           : `${
  //               focus
  //                 ? "text-primary dark:text-primary_d"
  //                 : "text-dark dark:text-lightest_d"
  //             } ${styles.hidePlaceholder}`
  //         // bg-white dark:bg-[#272927]
  //       }`}
  //     >
  //       <p
  //         className={`
  //         ${
  //           focus
  //             ? validacion &&
  //               !validacion?.validado &&
  //               validacion.mensaje.length > 0
  //               ? "text-error"
  //               : "text-primary dark:text-primary_d"
  //             : ""
  //         }
  //         `}
  //       >
  //         {label}
  //       </p>
  //     </label>

  //     {validacion && !validacion?.validado && validacion.mensaje.length > 0 && (
  //       <p
  //         className={`text-error absolute top-full w-full text-center h-max pt-[2px] text-xs`}
  //       >
  //         {validacion?.mensaje}
  //       </p>
  //     )}
  //   </div>
  // );
};

export default ContInput;
// "use client";

// import { IValidacion } from "../../../helpers/Validar";
// import styles from "./ContInput.module.css";

// interface Props {
//   name: string;
//   children: React.ReactNode | JSX.Element | JSX.Element[];
//   focus: boolean;
//   showPlaceholder: boolean;
//   label: string;
//   icono?: string;
//   disabled?: boolean;
//   validacion?: IValidacion;
//   id?: string;
//   onClick?: () => void;
//   textArea?: boolean;
// }

// const ContInput = ({
//   label,
//   name,
//   children,
//   icono,
//   disabled = false,
//   validacion,
//   focus,
//   showPlaceholder,
//   id,
//   onClick,
//   textArea = false,
// }: Props) => {
//   return (
//     <div className={`${styles.contPrincipal}`} onClick={onClick}>
//       <div
//         className={`rounded-xl border bg-white dark:bg-[#191A19] ${
//           textArea ? "h-full min-h-[150px] max-h-80" : "h-10"
//         } ${styles.contInput} ${disabled ? styles.disabled : ""} ${
//           validacion && !validacion?.validado && validacion.mensaje.length > 0
//             ? "border-error dark:border-[#ff0000]"
//             : focus
//             ? "border-primary dark:border-primary_d"
//             : "border-[#e5e7eb] dark:border-[#78797b]"
//         }`}
//       >
//         {!!icono && <div />}
//         {children}
//       </div>
//       <label
//         htmlFor={id ?? name}
//         className={`${styles.label} ${
//           showPlaceholder
//             ? ""
//             : "text-primary dark:text-primary_d " + styles.hidePlaceholder
//         }`}
//       >
//         <div
//           className={`${styles.labelBG} ${
//             showPlaceholder ? "" : styles.hidePlaceholder
//           } bg-white dark:bg-[#191A19]`}
//         />
//         <p
//           className={`${
//             focus
//               ? validacion &&
//                 !validacion?.validado &&
//                 validacion.mensaje.length > 0
//                 ? "text-error dark:text-[#ff0000]"
//                 : "text-primary dark:text-primary_d"
//               : ""
//           }`}
//         >
//           {label}
//         </p>
//       </label>
//       {validacion && !validacion?.validado && validacion.mensaje.length > 0 && (
//         <p
//           className={`text-error dark:text-[#ff0000] absolute top-full w-full text-center h-max pt-[2px] text-xs`}
//         >
//           {validacion?.mensaje}
//         </p>
//       )}
//     </div>
//   );
// };

// export default ContInput;
