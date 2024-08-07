import { Card, Skeleton } from "@mantine/core";

const SkeletonCategory = () => {
  return (
    <Card className="h-[110px]">
      <Card.Section className="h-[110px]">
        <div className="flex h-full flex-col justify-between px-5 py-6">
          <Skeleton height={20} className="w-full" />
          <div className="flex justify-between">
            <Skeleton height={20} width={100} />
            <Skeleton height={20} width={20} />
          </div>
        </div>
      </Card.Section>
    </Card>
  );
};

export default SkeletonCategory;
