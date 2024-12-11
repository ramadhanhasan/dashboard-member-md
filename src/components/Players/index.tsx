"use client";

import { notification } from "antd";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

// const Player = dynamic(() => import("@vime/react").then((mod) => mod.Player), {
//   ssr: false,
// });

// const Youtube = dynamic(
//   () => import("@vime/react").then((mod) => mod.Youtube),
//   {
//     ssr: false,
//   },
// );

// const DefaultUi = dynamic(
//   () => import("@vime/react").then((mod) => mod.DefaultUi),
//   {
//     ssr: false,
//   },
// );

// const DefaultControls = dynamic(
//   () => import("@vime/react").then((mod) => mod.DefaultControls),
//   {
//     ssr: false,
//   },
// );

const PlayerComponent = ({
  videoId,
  gdriveId,
}: {
  videoId: string;
  gdriveId?: string;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleIframeLoad = () => {
    setIsLoaded(true);
    setHasError(false); // Reset error state if it successfully loads
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isLoaded) {
        setHasError(true);
        notification.error({
          message: 'Koneksi Terputus atau Lambat',
          description: `Sepertinya koneksi internet Anda sedang tidak stabil. Mohon cek kembali koneksi Anda, lalu Coba refresh halaman ini.`,
        })
      }
    }, 15000); // 15 seconds timeout

    return () => clearTimeout(timeout);
  }, [isLoaded]);

  return (
    <>
      {gdriveId && gdriveId.trim() != "" ? (
        <div
          style={{
            position: "relative",
            paddingBottom: "56.25%",
            height: 0,
            overflow: "hidden",
            maxWidth: "100%",
            background: "#000",
          }}
        >
          {" "}
          <iframe
            src={`https://drive.google.com/file/d/${gdriveId}/preview`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            onLoad={handleIframeLoad}
          ></iframe>
          <div className="overlay-gdrive"></div>
        </div>
      ) : (
        <div className="video-wrapper">
          <LiteYouTubeEmbed
            id={videoId}
            title="Mahir Digital"
            params="rel=0"
            cookie={true}
          />
          <div className="overlay" />
          <div className="overlay-bottom" />
        </div>
      )}
    </>
  );
};

export default PlayerComponent;
