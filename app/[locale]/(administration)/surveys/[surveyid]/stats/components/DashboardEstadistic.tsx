import React from "react";
import CompletionChart from "../data/CompletionChart";
import "../../styles/stylesPersonalizados.css";
import MapComponent from "./MapComponent";
import DescEmotionGraph from "./DescEmotionGraph";

const DashboardEstadistic = ({ data }) => {

  console.log(data);
  const devices = data.devices || {};
  const maxDeviceCount = devices.browser
      ? Math.max(...devices.browser.map((device) => device.count))
      : 0;
  const maxOSCount = devices.os
      ? Math.max(...devices.os.map((os) => os.count))
      : 0;
  const locations = data.answers_locations || [];
  const emotionsData = data.questions.reduce(
      (acc, question) => {
        if (question.stats_data && question.stats_data.emotions) {
          acc.positive += question.stats_data.emotions
              .filter((e) => e.emotion === "positive")
              .reduce((sum, e) => sum + e.count, 0);
          acc.neutral += question.stats_data.emotions
              .filter((e) => e.emotion === "NEU")
              .reduce((sum, e) => sum + e.count, 0);
          acc.negative += question.stats_data.emotions
              .filter((e) => e.emotion === "negative")
              .reduce((sum, e) => sum + e.count, 0);
        }
        return acc;
      },
      { positive: 0, neutral: 0, negative: 0 },
  );

  console.log(emotionsData);

  // Formatear las locaciones para el componente MapComponent
  const formattedLocations = locations.map((location) => ({
    latitude: location.latitude,
    longitude: location.longitude,
    answeredSurveyId: location.answer_id,
    emotion: location.emotion,
    survey: data.survey,
  }));
  console.log(data.finalization_chart);
  //console.log(formattedLocations);
  return (
      <div className="p-4">
        <div className="text-small mb-1 text-left font-bold">Resumen</div>
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
          <div className="flex flex-col justify-between rounded-lg bg-white p-1 shadow-md">
            <div
                className="whitespace-nowrap text-gray-500"
                style={{ fontSize: "0.625rem" }}
            >
              ENCUESTAS INTENTADAS
            </div>
            <div
                className="mt-auto text-left text-xl font-semibold text-gray-900 "
                style={{ fontSize: "2rem" }}
            >
              {data.summary.total_answers ?? 0}
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-lg bg-white p-1 shadow-md">
            <div
                className="flex flex-col justify-between truncate whitespace-nowrap text-gray-500"
                style={{ fontSize: "0.625rem" }}
            >
              ENCUESTAS COMPLETADAS
            </div>
            <div
                className="mt-auto text-left text-xl font-semibold text-gray-900"
                style={{ fontSize: "2rem" }}
            >
              {Math.round(data.summary.satisfaction ?? 0)}
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-lg bg-white p-1 shadow-md">
            <div
                className="truncate whitespace-nowrap text-center text-gray-900 "
                style={{ fontSize: "0.625rem" }}
            >
              ÍNDICE DE MARCA
            </div>
            <div
                className="mt-auto text-left text-xl font-semibold text-gray-900"
                style={{ fontSize: "2rem" }}
            >
              {data.summary.rating_with_audio ?? 0}%
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-lg bg-white p-1 shadow-md">
            <div
                className="truncate whitespace-nowrap text-gray-900 "
                style={{ fontSize: "0.625rem" }}
            >
              ÍNDICE DE RESPUESTA
            </div>
            <div
                className="mt-auto text-left text-xl font-semibold text-gray-900"
                style={{ fontSize: "2rem" }}
            >
              {data.summary.rating_with_audio ?? 0}%
            </div>
          </div>
          <div className="flex h-24 flex-col justify-between rounded-lg bg-white p-1 shadow-md ">
            <div
                className="truncate whitespace-nowrap text-gray-900 "
                style={{ fontSize: "0.625rem" }}
            >
              TIEMPO PROMEDIO (MM:SS)
            </div>
            <div
                className="mt-auto text-left text-xl font-semibold text-gray-900"
                style={{ fontSize: "2rem" }}
            >
              {data.summary.total_answers ?? 0}
            </div>
          </div>
          <div className="flex h-24 flex-col justify-between rounded-lg bg-white p-1 shadow-md">
            <div
                className="truncate whitespace-nowrap text-gray-900"
                style={{ fontSize: "0.625rem" }}
            >
              SATISFACCIÓN
            </div>
            <div
                className="mt-auto text-left text-xl font-semibold text-gray-900"
                style={{ fontSize: "2rem" }}
            >
              {Math.round(data.summary.satisfaction ?? 0)}
            </div>
          </div>
          <div className="flex h-24 flex-col justify-between rounded-lg bg-white p-1 shadow-md">
            <div
                className="truncate whitespace-nowrap text-gray-900"
                style={{ fontSize: "0.625rem" }}
            >
              CALIFICADO CON AUDIO
            </div>
            <div
                className="mt-auto text-left text-xl font-semibold text-gray-900"
                style={{ fontSize: "2rem" }}
            >
              {data.summary.rating_with_audio ?? 0}%{" "}
              <br></br>
              <span style={{ fontSize: "0.625rem" }}>
              ({data.summary.total_answers ?? 0} encuestas)
            </span>
            </div>
          </div>
          <div className="rounded-gl flex h-24 flex-col justify-between bg-white p-1 shadow-md">
            <div
                className="truncate whitespace-nowrap text-gray-900"
                style={{ fontSize: "0.625rem" }}
            >
              RESPUESTAS
            </div>
            <div
                className=" mt-auto text-left font-semibold text-gray-900"
                style={{ fontSize: "2rem" }}
            >
              {data.summary.total_answers ?? 0}
            </div>
          </div>
        </div>

        <div className="formato">
          <div className="grid grid-cols-1 gap-2 pt-3 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-white p-1 shadow-md">
              <div className="text-sm text-gray-500">DISPOSITIVOS y S.O.</div>
              <div className="flex flex-col md:flex-row">
                <div className="mt-2 w-full md:w-1/2 md:border-r md:border-gray-300 md:pr-4">
                  <ul>
                    {devices.browser &&
                        devices.browser.map((device, index) => (
                            <li key={index} className="mb-2">
                              <div className="mb-1 flex items-center justify-between text-lg text-gray-900 dark:text-gray-100">
                          <span style={{ fontSize: "0.625rem" }}>
                            {device.name}
                          </span>
                                <span className="ml-2 text-gray-900 dark:text-gray-100" >{device.count}</span>
                              </div>
                              <div className="progress-bar-container text-gray-900 dark:text-gray-100">
                                <div
                                    className="progress-bar"
                                    style={{
                                      width: `${(device.count / maxDeviceCount) * 100}%`,
                                    }}
                                ></div>
                              </div>
                            </li>
                        ))}
                  </ul>
                </div>
                <div className="mt-2 w-full md:w-1/2 md:pl-4">
                  <ul>
                    {devices.os &&
                        devices.os.map((os, index) => (
                            <li key={index} className="mb-2 text-gray-900 dark:text-gray-100">
                              <div className="mb-1 flex items-center justify-between text-lg text-gray-900 dark:text-gray-100">
                          <span style={{ fontSize: "0.625rem" }}>
                            {os.name}
                          </span>
                                <span className="ml-2 text-gray-900 dark:text-gray-100">{os.count}</span>
                              </div>
                              <div className="progress-bar-container">
                                <div
                                    className="progress-bar text-gray-900 dark:text-gray-100"
                                    style={{
                                      width: `${(os.count / maxOSCount) * 100}%`,
                                    }}
                                ></div>
                              </div>
                            </li>
                        ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white p-1 shadow-md">
              <div className="text-sm text-gray-500">AUDIOS DE SATISFACCIÓN</div>
              <audio controls className="mt-2 w-full">
                <source src={data.audioSrc} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
            <div className="rounded-xl bg-white p-1 shadow-md">
              <div className="text-sm text-gray-500">RESPONDIDO DESDE</div>
              <div className="h-64 lg:h-auto">
                <MapComponent data={formattedLocations} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-1 pt-3 lg:grid-cols-3">
            <div className="col-span-2 rounded-xl bg-white p-1 shadow-md">
              <div className="text-sm text-gray-500">GRÁFICO DE FINALIZACIÓN</div>

              <CompletionChart data={data.finalization_chart} />
            </div>

            <div className="col-span-2 rounded-xl bg-white p-1 shadow-md">
              <div className="text-sm text-gray-500">¿CÓMO ESTÁ TU DÍA?</div>
              <DescEmotionGraph data={emotionsData} loading={false} />
            </div>
          </div>
        </div>
      </div>
  );
};

export default DashboardEstadistic;
