import "./LabelNumeroUnidad.css";

interface Props {
  label: string;
  numero: string;
  exponente?: string;
  unidad?: string;
  derecha?: boolean;
}

function LabelNumeroUnidad({
  label,
  numero,
  exponente,
  unidad,
  derecha = false,
}: Props) {
  return (
    <div className={derecha ? "label-numero-unidad-derecha" : ""}>
      {label && <p className="label-numero-unidad-label">{label}</p>}
      <div className="label-numero-unidad-cont-numero">
        <span className="label-numero-unidad-numero">{numero}</span>
        {exponente && (
          <span className="label-numero-unidad-exponente">{exponente}</span>
        )}
        {unidad && <span className="label-numero-unidad-unidad">{unidad}</span>}
      </div>
    </div>
  );
}

export default LabelNumeroUnidad;
