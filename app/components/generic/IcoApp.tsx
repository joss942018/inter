import "./IcoApp.css";

interface Props {
  icono: string;
  label: string;
  onClick?: () => void;
}

function IcoApp({ icono = "", label = "", onClick }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div className="cont-ico-app animar-hover" onClick={handleClick}>
      <div className="cont-ico-ico-app">
        <div className={icono + " format-ico-app"}></div>
      </div>
      <p>{label}</p>
    </div>
  );
}

export default IcoApp;
