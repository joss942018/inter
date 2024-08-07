import MyIcon from "@/app/components/MyIcon";
import MyLink from "@/app/components/MyLink";
import getEnv from "@/helpers/Env";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SummarySectionContainer from "./summary/SummarySectionContainer";
import Loader from "@/app/components/generic/Loader";

interface Props {
  title: string;
  id: number;
  summary?: boolean;
}

const FileQuestion = ({ title, id, summary }: Props) => {
  const [fileLinks, setFileLinks] = useState<string[]>([]);

  const getFiles = (question_id: number) => {
    const url = `${getEnv(
      "NEXT_PUBLIC_BACKEND_ENDPOINT"
    )}/question/get/all/fileuploadanswer/?question_id=${question_id}`;
    axios
      .get(url)
      .then((response) => {
        const links =
          response.data.file_upload_urls.map((file: string) => file) || [];
        setFileLinks(links);

        console.log("File links:", response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getFiles(id);
  }, [id]);
  return (
    <SummarySectionContainer title={title} summary={summary}>
      {fileLinks.length > 0 ? (
        <ul className="flex flex-col gap-xs px-s">
          {fileLinks.map((link, index) => (
            <MyLink
              key={index}
              className="btn btn-xs"
              hierarchy={4}
              href={link}
              target="_blank"
            >
              <MyIcon icon="FiDownload" />
              {link.split("/").pop()}
            </MyLink>
          ))}
        </ul>
      ) : (
        <Loader fullScreen size={24} />
      )}
    </SummarySectionContainer>
  );
};

export default FileQuestion;
