"use client"

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

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
    videoId
} : {videoId : string}) => {

    return (
        <LiteYouTubeEmbed 
          id={videoId}
          title="Mahir Digital"
          params="rel=0"
      />
    )
}

export default PlayerComponent;