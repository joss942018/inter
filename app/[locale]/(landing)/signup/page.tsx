import { Suspense } from "react";
import { RegisterForm } from "./components/RegisterForm";
import Loader from "@/app/components/generic/Loader";
import getEnv from "@/helpers/Env";

const Page = async () => {
  const countries: {
    data: {
      id: number;
      name: string;
      phone_code: string;
    }[];
  } = await (
    await fetch(
      `${getEnv("NEXT_PUBLIC_BACKEND_ENDPOINT")}/api/v1/user/country/`,
    )
  ).json();

  return (
    <div className="min-h-screen bg-white py-16 dark:bg-neutral-950">
      <Suspense fallback={<Loader />}>
        <RegisterForm
          countries={countries.data.map((el) => ({
            country_id: el.id,
            name: el.name,
            phone_code: el.phone_code,
          }))}
        />
      </Suspense>
    </div>
  );
};

export default Page;
