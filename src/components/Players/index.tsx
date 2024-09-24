import dynamic from "next/dynamic";

const Player = dynamic(() => import("@vime/react").then((mod) => mod.Player), {
  ssr: false,
});

const Youtube = dynamic(
  () => import("@vime/react").then((mod) => mod.Youtube),
  {
    ssr: false,
  },
);

const DefaultUi = dynamic(
  () => import("@vime/react").then((mod) => mod.DefaultUi),
  {
    ssr: false,
  },
);

const DefaultControls = dynamic(
  () => import("@vime/react").then((mod) => mod.DefaultControls),
  {
    ssr: false,
  },
);


const PlayerComponent = ({
    videoId
} : {videoId : string}) => {
    return (
        <Player theme="dark">
          <Youtube
            videoId={videoId || ""}
          />
          <DefaultUi noControls>
            <DefaultControls hideOnMouseLeave activeDuration={2000} />
          </DefaultUi>
        </Player>
    )
}

export default PlayerComponent;