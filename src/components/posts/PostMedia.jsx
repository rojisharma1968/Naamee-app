import { useState, useEffect } from "react";
import {
  View,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import { useEvent } from "expo";
import MuteButton from "../MuteButton";

const { width, height: screenHeight } = Dimensions.get("window");

const PostMedia = ({ media, variant = "default" }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  if (!media?.type || !media?.url) return null;

  const player = useVideoPlayer(media.url, (p) => {
    p.loop = true;
    p.muted = true;
    p.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player?.playing ?? false,
  });

  useEffect(() => {
    if (!player) return;

    const handleMute = async () => {
      try {
        player.muted = isMuted;
        if (!isMuted && hasUserInteracted) {
          await player.play();
        }
      } catch (error) {
        console.log("Error changing mute status:", error);
      }
    };

    handleMute();
  }, [isMuted, player, hasUserInteracted]);

  useEffect(() => {
    if (isPlaying) {
      setIsLoading(false);
    }
  }, [isPlaying]);

  const toggleMute = () => {
    setHasUserInteracted(true);
    setIsMuted((m) => !m);
  };

  // Max height for non-reel content
  const maxHeightMedia = variant !== "reel" ? 450 : screenHeight;

  const mediaHeight =
    variant === "reel"
      ? screenHeight
      : screenHeight > 677
        ? screenHeight - 390
        : screenHeight - 310;

  const finalHeight = Math.min(mediaHeight, maxHeightMedia);

  const commonStyle = {
    width,
    height: finalHeight,
    backgroundColor: "#000",
  };

  return media.type === "video" ? (
    <View className="w-full bg-black relative" style={commonStyle}>
      <VideoView
        style={commonStyle}
        player={player}
        contentFit="cover"
        nativeControls={false}
        allowsFullscreen
        allowsPictureInPicture
      />

      {isLoading && (
        <View
          className={`absolute bg-black/50 p-2 rounded-full ${
            variant === "reel" ? "left-1/2 top-1/2" : "top-3 right-3"
          }`}
          style={
            variant === "reel"
              ? { transform: [{ translateX: "-50%" }, { translateY: "-50%" }] }
              : {}
          }
        >
          <ActivityIndicator size="small" color="#fff" />
        </View>
      )}

      <MuteButton variant={variant} isMuted={isMuted} toggleMute={toggleMute} />
    </View>
  ) : (
    <Image
      source={{ uri: media.url }}
      className="w-full bg-black"
      style={commonStyle}
      resizeMode="cover"
    />
  );
};

export default PostMedia;
