interface Props {
  title: string;
  children: React.ReactNode;
  size?: {
    x: 1 | 2 | 3;
    y: 1 | 2 | 3;
  };
  summary?: boolean;
}

const SummarySectionContainer = ({ title, children }: Props) => {
  return (
    <div className={`stats-card stats-1 decorative-border mx-auto border`}>
      <div className="stats-title">
        <p>{title}</p>
      </div>
      <div className="my-scrollbar flex h-full flex-col gap-xs overflow-y-auto overflow-x-hidden">
        {children}
      </div>
    </div>
  );
};

export default SummarySectionContainer;
