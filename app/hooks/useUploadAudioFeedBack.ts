import getEnv from "@/helpers/Env";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

const useUploadAudioFeedBack = (idRate: number) => {
    const t = useTranslations("SRSurvey");

    const { mutate: uploadAudio, isPending: isPendingUploadAudio } = useMutation({
        mutationFn: async (mediaBlobUrl: string) => {
            const audioBlob = await fetch(mediaBlobUrl).then((r) => r.blob());

            const formData = new FormData();
            formData.append("audio", audioBlob, "audio_feedback.wav");

            const response = await fetch(
                `${getEnv("NEXT_PUBLIC_BACKEND_ENDPOINT")}/api/v1/client_response/answer_feedback/${idRate}/`,
                {
                    method: "PATCH",
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error('Failed to upload audio');
            }
        },
        onSuccess: () => {
            console.log("SHOW AUDIO ON FRONTEND");
        },
    });

    return { uploadAudio, isPendingUploadAudio };
};

export default useUploadAudioFeedBack;
