import Switch from "@/app/components/generic/Switch";
import ThemeContext from "@/app/context/ThemeContext";
import { useContext } from "react";

function ThemeSwitcher() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Switch
      icoOn="ico-moon-color"
      icoOff="ico-sun-color"
      name="ldSwitch"
      onChange={toggleTheme}
      value={theme === "dark"}
    />
  );
}

export default ThemeSwitcher;
