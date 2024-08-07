import { Card } from "@mantine/core";
import Form from "./components/Form";

const Page = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-neutral-50 py-my-64 dark:bg-neutral-950">
      <Card>
        <Form />
      </Card>
    </div>
  );
};

export default Page;
