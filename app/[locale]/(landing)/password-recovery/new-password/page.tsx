import { Card } from "@mantine/core";
import Form from "./components/Form";

interface Props {
  searchParams: {
    token: string;
  };
}

const Page = ({ searchParams }: Props) => {
  return (
    <div className="flex h-[calc(100vh_-_3rem)] w-full items-center justify-center dark:bg-neutral-950">
      <Card>
        <Form token={searchParams.token} />
      </Card>
    </div>
  );
};

export default Page;
