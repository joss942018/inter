import { RatingQuestionArray } from "@/types/TypesDB";
import { RangeSlider, Select, Text } from "@mantine/core";
import { useTranslations } from "next-intl";
import { Controller, useFormContext, useWatch } from "react-hook-form";

function makeRange(num1: number, num2: number) {
  let array = [];
  if (num1 > num2) {
    let temp = num1;
    num1 = num2;
    num2 = temp;
  }
  let rango = num2 - num1;
  let paso = rango / 4;
  for (let i = 0; i < 5; i++) {
    array.push(num1 + paso * i);
  }
  return array;
}
const range = makeRange(-10, 10);

const Rating = () => {
  const t = useTranslations("Surveys");
  const { control, setValue } = useFormContext();
  const watch = useWatch({ name: "rating_question.rating_question_type" });
  console.log("Estoy aqui")
  return (
    <>
      <Controller
        control={control}
        name="rating_question.rating_question_type"
        render={({ field }) => (
          <Select
            {...field}
            label={t("type")}
            data={RatingQuestionArray.map((el) => ({
              value: el,
              label: t(`rating_types.${el}`),
            }))}
            onChange={(value) => {
              field.onChange(value);
              if (value === "emoji") {
                setValue("rating_question.rating_from", 1);
                setValue("rating_question.rating_to", 5);
              }
            }}
          />
        )}
      />
      <Controller
        control={control}
        name="rating_question.rating_from"
        render={({ field: fieldRatingFrom }) => (
          <Controller
            control={control}
            name="rating_question.rating_to"
            render={({ field: fieldRatingTo }) => (
              <>
                <Text size="sm">Rango</Text>
                <RangeSlider
                  mt="xl"
                  mb="xl"
                  defaultValue={[0, 5]}
                  min={-10}
                  max={10}
                  thumbSize={24}
                  minRange={3}
                  labelAlwaysOn
                  disabled={watch === "emoji"}
                  value={[fieldRatingFrom.value, fieldRatingTo.value]}
                  marks={range.map((value) => ({
                    value,
                    label: value.toString(),
                  }))}
                  onChange={(value) => {
                    fieldRatingFrom.onChange(value[0]);
                    fieldRatingTo.onChange(value[1]);
                  }}
                />
              </>
            )}
          />
        )}
      />
    </>
  );
};

export default Rating;
