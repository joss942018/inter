import React, { useContext, useCallback, useEffect, useState } from 'react';
import Map, { Popup } from "react-map-gl";
import DeckGL from "@deck.gl/react/typed";
import "mapbox-gl/dist/mapbox-gl.css";
import { ScatterplotLayer } from "@deck.gl/layers/typed";
import ThemeContext from "@/app/context/ThemeContext";
import getEnv from "@/helpers/Env";
import { WebMercatorViewport } from "viewport-mercator-project";
import { useTranslations } from "next-intl";
import { useRouter } from "@/internationalization/navigation";

const defaultMinZoom = 13; // Ajustar este valor para un zoom más amplio

export interface ICoordinates {
  latitude: number;
  longitude: number;
  altitude?: number;
  sentimentScore?: number;
  emotion?: string;
  answeredSurveyId?: number;
  survey?: number;
}

interface Props {
  data: ICoordinates[];
  radius?: number;
  dotColor?: [number, number, number, number];
  containerWidth?: number;
}

const MapComponent = ({
                        data = [],
                        radius = 0.35,
                        dotColor = [0, 128, 255, 255],
                        containerWidth = 250,
                      }: Props) => {
  const { theme } = useContext(ThemeContext);
  const [hoverInfo, setHoverInfo] = useState<any>(null);
  const t = useTranslations("Surveys");
  const router = useRouter();

  const layers = [
    new ScatterplotLayer({
      id: "scatter-plot",
      data,
      radiusScale: radius,
      radiusUnits: "pixels",
      getPosition: (d: ICoordinates) => [d.longitude, d.latitude, d.altitude || 0],
      getFillColor: (a) => {
        if (!a || !a.emotion) return dotColor;
        const emotion = a.emotion ?? "neutral"; // Tratar null como "neutral"
        return emotion === "positive"
            ? [50, 217, 35, 255]
            : emotion === "negative"
                ? [217, 35, 35, 255]
                : emotion === "neutral"
                    ? [217, 202, 35, 255]
                    : dotColor;
      },
      getRadius: 10,
      pickable: true,
      onHover: (info) => {
        console.log('Hover info:', info);
        setHoverInfo(info.object ? info : null);
      },
      onClick: (info) => {
        console.log('Click info:', info);
        const object = info.object as ICoordinates;
        if (object && object.answeredSurveyId && object.survey) {
          console.log("Entra al IF");
          router.push(
              `/surveys/${object.survey}/responses?id=${object.answeredSurveyId}`
          );
        } else {
          console.log("No entra al IF");
        }
      },
    }),
  ];

  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: defaultMinZoom,
  });

  const calculateZoom = useCallback(
      (sw: [number, number], ne: [number, number], mapWidth: number) => {
        let zoom = defaultMinZoom;
        if (Math.abs(sw[1]) !== Infinity && Math.abs(ne[1]) !== Infinity) {
          const viewport = new WebMercatorViewport({
            width: mapWidth,
            height: mapWidth,
          });
          zoom = viewport.fitBounds([sw, ne]).zoom - 14; // Resta 1 para un zoom más amplio
        }
        return zoom;
      },
      []
  );

  const calculateViewportFromBounds = useCallback(
      (bounds: number[][]) => {
        const [sw, ne] = bounds;
        const longitude = (sw[0] + ne[0]) / 2;
        const latitude = (sw[1] + ne[1]) / 2;

        const zoom = calculateZoom(
            [sw[0], sw[1]],
            [ne[0], ne[1]],
            containerWidth
        );

        return { longitude, latitude, zoom };
      },
      [containerWidth, calculateZoom]
  );

  const updateViewport = useCallback(() => {
    if (data.length > 0) {
      const coordinates = data.map((el) => [el.longitude, el.latitude]);

      const bounds = coordinates.reduce(
          (acc, coord) => {
            return [
              [Math.min(acc[0][0], coord[0]), Math.min(acc[0][1], coord[1])],
              [Math.max(acc[1][0], coord[0]), Math.max(acc[1][1], coord[1])],
            ];
          },
          [
            [Infinity, Infinity],
            [-Infinity, -Infinity],
          ]
      );

      const { longitude, latitude, zoom } = calculateViewportFromBounds(bounds);

      setViewport({
        longitude,
        latitude,
        zoom: Math.abs(Number(zoom)) < Infinity ? zoom : defaultMinZoom,
      });
    } else {
      setViewport({
        latitude: 0,
        longitude: 0,
        zoom: defaultMinZoom,
      });
    }
  }, [calculateViewportFromBounds, data]);

  useEffect(() => {
    updateViewport();
  }, [data, updateViewport]);

  const getEmotion = () => {
    const emotion = hoverInfo?.object?.emotion ?? "neutral"; // Tratar null como "neutral"
    if (emotion === "positive") return t("positive");
    if (emotion === "neutral") return t("neutral");
    if (emotion === "negative") return t("negative");
    return emotion;
  };

  return (
      <div className="map-container responsive-map">
        <DeckGL
            initialViewState={viewport}
            controller={{ doubleClickZoom: false }}
            layers={layers}
        >
          <Map
              mapboxAccessToken={getEnv("NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN")}
              reuseMaps
              mapStyle={
                theme === "dark"
                    ? "mapbox://styles/mapbox/dark-v11"
                    : "mapbox://styles/mapbox/light-v11"
              }
          >
            {hoverInfo && hoverInfo.object && (
                <Popup
                    longitude={hoverInfo.coordinate[0]}
                    latitude={hoverInfo.coordinate[1]}
                    closeButton={false}
                >
                  <p className="text-black">
                    {getEmotion() ?? t("no_emotion_detected")}
                  </p>
                  <p className="secondary-text">
                    {t("click_to_go_to_this_answer")}
                  </p>
                </Popup>
            )}
          </Map>
        </DeckGL>
      </div>
  );
};

export default MapComponent;
