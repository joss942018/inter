export interface IColors {
  primaryColor: string;
  secondaryColor: string;
  primaryDColor: string;
  secondaryDColor: string;
}

interface Props {
  selected: boolean;
  colors: IColors;
  onClick: () => void;
}

const ThemeMockup = ({ selected, colors, onClick }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <div
        className={`grid cursor-pointer grid-cols-2 overflow-hidden rounded-lg border-4 text-xs
    ${selected ? "border-primary-500" : "border-neutral-100 dark:border-neutral-900"}
      `}
        onClick={onClick}
      >
        <div
          className={`grid grid-rows-[20px_100px_20px] text-black`}
          style={{ backgroundColor: colors.secondaryColor }}
        >
          {/* start row */}
          <div className="flex items-center justify-between border-b-2 pl-1">
            {/* <span>e</span> */}
            {/* <span>Sur</span> */}
          </div>

          {/* middle row */}
          <div className="flex flex-col items-end justify-center">
            {/* <p>Hello, I&apos;</p> */}
            <div
              className={`h-s w-m rounded-l-lg py-1 pl-2`}
              style={{ backgroundColor: colors.primaryColor }}
            >
              {/* Sta */}
            </div>
          </div>

          {/* end row */}
          <div className="flex items-center border-t-2">
            <div className="ico-chevron-back-outline h-3 w-3" />
          </div>
        </div>
        <div
          className={`grid grid-rows-[20px_100px_20px] text-white`}
          style={{ backgroundColor: colors.secondaryDColor }}
        >
          {/* start row */}
          <div className="flex items-center justify-between border-b-2 pr-1">
            {/* <span>vey</span> */}
            <span></span>

            {/* switch */}
            <div className="h-3 w-6 rounded-full bg-gray-600" />
          </div>

          {/* middle row */}
          <div className="flex flex-col justify-center">
            {/* <p>m Elia</p> */}
            <div
              className={`h-s w-m rounded-r-lg py-1 pr-2`}
              style={{ backgroundColor: colors.primaryDColor }}
            >
              {/* rt */}
            </div>
          </div>

          {/* end row */}
          <div className="flex items-center justify-end border-t-2">
            <div className="ico-chevron-forward-outline h-3 w-3 invert" />
          </div>
        </div>
      </div>
      <span className="text-center text-sm">Theme name</span>
    </div>
  );
};

export default ThemeMockup;
