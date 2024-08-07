import Animations from "@/app/styles/animations";
import {
    DatePicker,
    DateValue,
    DatesRangeValue,
    TimeInput,
} from "@mantine/dates";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface IProps {
    value?: DatesRangeValue | DateValue | null;
    range?: boolean;
    withTime?: boolean;
    saveAnswer?: (value: DatesRangeValue | DateValue | null) => void;
}

const DateBase = ({
                      value,
                      range = false,
                      withTime = false,
                      saveAnswer,
                  }: IProps) => {
    const t = useTranslations("SRSurvey");

    return (
        <motion.div
            {...Animations.slideForward}
            className={`flex w-max flex-col gap-5`}
        >
            <DatePicker
                type={range ? "range" : "default"}
                value={value}
                onChange={saveAnswer ?? (() => {})}
            />
            {withTime && <TimeInput label={t("time")} />}
        </motion.div>
    );
};

export default DateBase;
