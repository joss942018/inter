import "./LabelText.css";

interface Props {
  label: string;
  text: string | number | null;
  centrar?: boolean;
  row?: boolean;
  color?: string;
}

function LabelText({
  label,
  text,
  centrar = false,
  row = false,
  color = "",
}: Props) {
  return (
    <div
      className={
        "cont-label-text " + (centrar ? " center " : " ") + (row ? " row " : "")
      }
    >
      <p className={"label"}>{label}</p>
      <p className={"text"} style={{ color: color === "rojo" ? "red" : color }}>
        {text ?? "-"}
      </p>
    </div>
  );
}

export default LabelText;
