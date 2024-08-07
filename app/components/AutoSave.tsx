import { Loader } from "@mantine/core";
import debounce from "debounce";
import { useCallback } from "react";
import {
  FieldValues,
  SubmitHandler,
  useFormContext,
  useFormState,
  useWatch,
} from "react-hook-form";
import useDeepCompareEffect from "use-deep-compare-effect";
import { ISurvey } from "../[locale]/(administration)/surveys/[surveyid]/context/SurveyContext";

interface IProps<T extends FieldValues> {
  defaultValues?: T;
  showLoader?: boolean;
  onSubmit: SubmitHandler<T>;
}

const AutoSave = <T extends FieldValues>({
  defaultValues,
  showLoader = false,
  onSubmit,
}: IProps<T>) => {
  // Get the closest form methods
  const methods = useFormContext<T>();

  // Save if this function is called and then not called again within 1000ms
  const debouncedSave = useCallback(
    debounce(() => {
      methods.handleSubmit(onSubmit)();
    }, 1000),
    [],
  );

  // // Watch all the data, provide with defaultValues from server, this way we know if the new data came from server or where actually edited by user
  // const watchedData = methods.watch(undefined, defaultValues);
  const watchedData = useWatch();
  const formState = useFormState();

  useDeepCompareEffect(() => {
    if (
      methods.formState.isDirty ||
      Object.keys(methods.formState.dirtyFields).length > 0
    ) {
      debouncedSave();
    }
  }, [watchedData]);

  return (
    <>
      {showLoader
        ? methods.formState.isSubmitting && <Loader size={"sm"} />
        : null}
    </>
  );
};

export default AutoSave;
