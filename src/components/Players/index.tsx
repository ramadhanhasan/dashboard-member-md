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
        <>
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '100%', background: '#000' }}>
      <iframe
        src={'https://drive.google.com/file/d/1mfgNnibtZkBtu-7_2NWs4WglaPNGfo5_/preview'}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
    </div>x
        <LiteYouTubeEmbed 
          id={videoId}
          title="Mahir Digital"
          params="rel=0"
      />
        </>

    )
}

export default PlayerComponent;