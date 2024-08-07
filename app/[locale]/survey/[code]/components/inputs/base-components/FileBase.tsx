import Animations from "@/app/styles/animations";
import { FileInput } from "@mantine/core";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface IProps {
    value?: string;
    saveAnswer?: (files: File | File[] | null) => void;
    accept?: string[];
    multiple?: boolean;
}

const FileBase = ({ value, saveAnswer, accept, multiple }: IProps) => {
    const t = useTranslations("SRSurvey");

    return (
        <motion.div {...Animations.slideForward} className={`flex h-11 w-80`}>
            <FileInput
                placeholder={t("select_file")}
                multiple={multiple}
                accept={accept?.join(",")}
                size="lg"
                onChange={saveAnswer}  // Ensure the onChange event is passed correctly
            />
        </motion.div>
    );
};

export default FileBase;
