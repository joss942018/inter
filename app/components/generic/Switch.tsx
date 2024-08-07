import "./Switch.css";
import { IValidacion } from "../../../helpers/Validar";

interface Props {
  label?: string;
  icono?: string;
  name: string;
  value: boolean;
  validacion?: IValidacion;
  onChange: (name: any, value: boolean) => void;
  labelColumn?: boolean;
  stateLabels?: { off: string; on: string };
  disabled?: boolean;
  className?: string;
  icoOff?: string;
  icoOn?: string;
}

const Switch = ({
  label,
  icono,
  name,
  value,
  validacion,
  onChange,
  labelColumn = false,
  stateLabels,
  disabled = false,
  className = "",
  icoOff,
  icoOn,
}: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!disabled) {
      onChange(name, !value);
    }
  };

  return (
    <div className={`${className}`}>
      <div
        className={
          "cont-principal-switch gap-my-24 " + (labelColumn ? "column" : "")
        }
      >
        {label !== undefined && <p>{label}</p>}
        {icono !== undefined && <div className={`format-ico-form ${icono}`} />}
        <div className="cont-main-switch">
          {stateLabels !== undefined && (
            <p className="switch-state-label">{stateLabels.off}</p>
          )}
          <div
            className="cont-switch bg-lightest dark:bg-neutral-900 animar-hover"
            onClick={handleClick}
          >
            <div className="absolute w-full h-full z-[1] rounded-full"></div>
            <div
              className={`ball-switch overflow-hidden flex items-center justify-center ${
                value && !icoOn
                  ? "bg-primary-800 dark:bg-primary-500"
                  : "bg-white dark:bg-neutral-950"
              }  ${value ? " active " : ""} ${disabled && "disabled"}`}
            >
              {Number(value) === 1 && icoOn && (
                <div className={`${icoOn} w-4 h-4`} />
              )}
              {Number(value) === 0 && icoOff && (
                <div className={`${icoOff} w-4 h-4`} />
              )}
            </div>
          </div>
          {stateLabels !== undefined && (
            <p className="switch-state-label">{stateLabels.on}</p>
          )}
        </div>
      </div>
      {validacion && !validacion.validado ? (
        <div className="ico-advertencia  format-ico-form-validacion"></div>
      ) : (
        <></>
      )}
      {!validacion?.validado &&
        validacion?.mensaje &&
        validacion?.mensaje.length > 0 && (
          <p className="texto-validacion">{validacion?.mensaje}</p>
        )}
    </div>
  );
};

export default Switch;
