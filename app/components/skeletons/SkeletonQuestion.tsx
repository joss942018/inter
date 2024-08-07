import { Card, Skeleton } from "@mantine/core";

const SkeletonQuestion = () => {
  return (
    <Card withBorder>
      <Skeleton height={16} radius={"xl"} />
      <Skeleton height={16} width={"80%"} mt={10} radius={"xl"} />
      <Skeleton height={14} width={60} mt={16} radius={"xl"} />
    </Card>
  );
};

export default SkeletonQuestion;
