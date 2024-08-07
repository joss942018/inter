interface IProps {
  topBar: React.ReactNode;
  children: React.ReactNode;
  bottomBar?: React.ReactNode;
}

const LayoutSurvey = ({ topBar, children, bottomBar }: IProps) => {
  return (
    <div className="grid h-full w-full grid-rows-[104px_1fr_104px] overflow-hidden bg-white dark:bg-neutral-950">
      {topBar}
      <div className="h-full w-full overflow-hidden">{children}</div>
      {bottomBar}
    </div>
  );
};

export default LayoutSurvey;
