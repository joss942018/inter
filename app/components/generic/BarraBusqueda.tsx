import { useEffect, useState } from "react";
import SearchBarGeneric from "./SearchBarGeneric";

interface IData extends Object {
  [key: string]: any;
}

const BarraBusqueda = <T extends IData>({
  data,
  keysToFilter,
  setFilteredData,
  style,
  className,
}: {
  data: T[];
  keysToFilter: (keyof T)[];
  setFilteredData: (filteredData: T[]) => void;
  style?: React.CSSProperties;
  className?: string;
}) => {
  // const { t } = useTranslation();

  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [dataAux, setDataAux] = useState<T[]>([]);
  const [cantResultados, setCantResultados] = useState(data.length);

  useEffect(() => {
    setDataAux(data);
  }, [data]);

  useEffect(() => {
    if (terminoBusqueda === "") {
      setFilteredData(dataAux);
      setCantResultados(data.length);
    } else {
      if (data.length > 0) {
        const filteredData = data.filter((el) => {
          let key: keyof T;
          for (key of keysToFilter) {
            if (
              el[key] !== null &&
              el[key] !== undefined &&
              el[key]
                .toString()
                .toLowerCase()
                .indexOf(terminoBusqueda.toLowerCase()) > -1
            ) {
              return true;
            }
          }
          return false;
        });
        setFilteredData(filteredData);
        setCantResultados(filteredData.length);
      }
    }
  }, [terminoBusqueda, data, dataAux]);

  return (
    <SearchBarGeneric
      setSearchTerm={setTerminoBusqueda}
      cantResults={cantResultados}
      showCantResults={terminoBusqueda.length > 0}
      className={className}
    />
  );
};

export default BarraBusqueda;
