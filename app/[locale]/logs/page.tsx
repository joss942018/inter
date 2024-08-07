"use client";
import MyButton from "@/app/components/MyButton";
import MyIcon from "@/app/components/MyIcon";
import MyLink from "@/app/components/MyLink";
import MySelect from "@/app/components/MySelect";
import Loader from "@/app/components/generic/Loader";
import SearchBarGeneric from "@/app/components/generic/SearchBarGeneric";
import getEnv from "@/helpers/Env";
import { getTheme } from "@table-library/react-table-library/baseline";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useSort } from "@table-library/react-table-library/sort";
import { useTheme } from "@table-library/react-table-library/theme";
import { useCallback, useState } from "react";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";

interface ILog {
  id: number;
  user_id: number;
  answered_survey_id: number;
  question_id: number;
  question_type: string;
  question_text: string;
  timestamp: Date;
  ip_address: string;
  answer: string;
  type: string;
  audio: string | null;
}

const options = [
  "user_id",
  "answered_survey_id",
  "question_id",
  "question_type",
  "question_text",
  "timestamp",
  "answer",
  "type",
  "audio",
];

const csvHeaders = [
  { label: "User ID", key: "user_id" },
  { label: "Answered survey ID", key: "answered_survey_id" },
  { label: "Question ID", key: "question_id" },
  { label: "Question type", key: "question_type" },
  { label: "Question text", key: "question_text" },
  { label: "Timestamp", key: "timestamp" },
  { label: "Ip", key: "ip_address" },
  { label: "Answer", key: "answer" },
  { label: "Type of answer", key: "type" },
  { label: "Audio link", key: "audio" },
];

const COLUMNS = [
  {
    label: "User ID",
    renderCell: (item: ILog) => item.user_id,
    resize: true,
    sort: { sortKey: "user_id" },
  },
  {
    label: "Answered survey ID",
    renderCell: (item: ILog) => item.answered_survey_id,
    resize: true,
    sort: { sortKey: "answered_survey_id" },
  },
  {
    label: "Question ID",
    renderCell: (item: ILog) => item.question_id,
    resize: true,
    sort: { sortKey: "question_id" },
  },
  {
    label: "Question type",
    renderCell: (item: ILog) => item.question_type,
    resize: true,
    sort: { sortKey: "question_type" },
  },
  {
    label: "Question text",
    renderCell: (item: ILog) => item.question_text,
    resize: true,
  },
  {
    label: "Timestamp",
    renderCell: (item: ILog) => item.timestamp.toLocaleString("sv"),
    resize: true,
    sort: { sortKey: "timestamp" },
  },
  {
    label: "Ip",
    renderCell: (item: ILog) => item.ip_address,
    resize: true,
    sort: { sortKey: "ip_address" },
  },
  { label: "Answer", renderCell: (item: ILog) => item.answer, resize: true },
  {
    label: "Type of answer",
    renderCell: (item: ILog) => item.type,
    resize: true,
    sort: { sortKey: "type" },
  },
  {
    label: "Audio link",
    renderCell: (item: ILog) =>
      item.audio ? (
        <MyLink href={item.audio} target="_blank">
          {item.audio}
        </MyLink>
      ) : (
        "-"
      ),
    resize: true,
  },
];

interface IFilter {
  filter_by: keyof ILog;
  filter_value: string;
}

const Page = () => {
  const [logs, setLogs] = useState<ILog[]>([]);
  const [cleanLogs, setCleanLogs] = useState<ILog[]>([]);
  const [surveyId, setSurveyId] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<IFilter>({
    filter_by: "user_id",
    filter_value: "",
  });

  const theme = useTheme([
    getTheme(),
    {
      Table: `
      --data-table-library_grid-template-columns:  100px 200px 150px 150px 250px 200px 200px 600px 180px 200px;
    `,
    },
  ]);

  const fetchLogs = useCallback(() => {
    const tempSurveyId = Number(surveyId);
    if (isNaN(tempSurveyId) || tempSurveyId < 1) {
      toast.error("Must provide a valid survey ID");
      return;
    }
    setLoading(true);
    fetch(
      `${getEnv(
        "NEXT_PUBLIC_BACKEND_ENDPOINT",
      )}/survey/logs_by_survey/${tempSurveyId}/`,
    )
      .then((res) => res.json())
      .then((data) => {
        const formattedData = data.logs.map((el: ILog) => ({
          ...el,
          timestamp: new Date(el.timestamp),
        }));
        setCleanLogs(cleanThisData(formattedData));
        setLogs(formattedData);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [surveyId]);

  const filteredLogs = logs.filter((log) => {
    if (filter.filter_value === "") return true;
    return log[filter.filter_by]
      ?.toString()
      .toLowerCase()
      .includes(filter.filter_value.toLowerCase());
  });

  const nodes = filteredLogs.map((log) => ({ ...log, id: log.id.toString() }));

  const sort = useSort(
    { nodes },
    {},
    {
      sortFns: {
        user_id: (array) => array.sort((a, b) => a.user_id - b.user_id),
        answered_survey_id: (array) =>
          array.sort((a, b) => a.answered_survey_id - b.answered_survey_id),
        question_id: (array) =>
          array.sort((a, b) => a.question_id - b.question_id),
        question_type: (array) =>
          array.sort((a, b) => a.question_type.localeCompare(b.question_type)),
        timestamp: (array) =>
          array.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()),
        type: (array) => array.sort((a, b) => a.type.localeCompare(b.type)),
      },
    },
  );

  const cleanThisData = (data: ILog[]) => {
    // answered survey id siempre hay
    const uniqueAnsweredSurveyId = Array.from(
      new Set(data.map((log) => log.answered_survey_id)),
    );

    // question id puede no haber
    const uniqueQuestionId = Array.from(
      new Set(data.map((log) => log.question_id)),
    );

    // questionId analysis
    let frequencyByQuestionId: { [key: string]: number } = {};
    for (const el0 of uniqueQuestionId) {
    }

    let cleanData: ILog[] = [];
    for (const el of uniqueAnsweredSurveyId) {
      for (const el0 of uniqueQuestionId) {
        const found = data.filter(
          (log) => log.answered_survey_id === el && log.question_id === el0,
        );
        if (found.length > 0) {
          frequencyByQuestionId = {
            ...frequencyByQuestionId,
            [el0]: (frequencyByQuestionId[el0] ?? 0) + 1,
          };
          const sorted = found
            .slice()
            .sort((a, b) => a.timestamp.getTime() - a.timestamp.getTime())[0];
          cleanData.push(sorted);
        }
      }
    }
    console.log("FREQ by qid: ", frequencyByQuestionId);
    return cleanData;
  };

  return (
    <div className="relative flex flex-col">
      {/* filters */}
      <div className="fixed z-10 flex w-full items-center justify-between gap-my-16 bg-primary-100 p-my-8 shadow-lg dark:bg-primary-900">
        <div className="flex items-center gap-my-8">
          <SearchBarGeneric
            setSearchTerm={setSurveyId}
            cantResults={logs.length}
            onClear={() => setSurveyId("")}
            onEnter={fetchLogs}
            showCantResults
          />
          <MyButton onClick={fetchLogs} size="small">
            {loading ? <Loader /> : <MyIcon icon="FiSearch" />}
            Fetch
          </MyButton>
        </div>
        <div className="flex gap-my-8">
          <CSVLink
            data={filteredLogs}
            headers={csvHeaders}
            filename="logs.csv"
            className="btn btn-2 btn-sm"
          >
            Filtered data to CSV
          </CSVLink>
          <CSVLink
            data={cleanLogs}
            headers={csvHeaders}
            filename="clean_logs.csv"
            className="btn btn-2 btn-sm"
          >
            Export clean data
          </CSVLink>
        </div>
        <div className="flex items-center gap-my-8">
          <span>Filter: </span>
          <MySelect
            name="filter_by"
            onChange={(_, value: any) =>
              setFilter((f) => ({ ...f, filter_by: value }))
            }
            options={options.map((key) => ({ value: key, label: key }))}
            value={filter.filter_by}
          />
          <SearchBarGeneric
            setSearchTerm={(term) =>
              setFilter((f) => ({ ...f, filter_value: term }))
            }
            cantResults={filteredLogs.length}
            showCantResults
          />
        </div>
      </div>

      {/* table */}
      <div className="pt-[60px]">
        <CompactTable
          columns={COLUMNS}
          data={{ nodes }}
          theme={theme}
          sort={sort}
          layout={{ custom: true, horizontalScroll: true }}
        />
      </div>
    </div>
  );
};

export default Page;
