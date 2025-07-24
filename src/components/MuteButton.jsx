import { Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

const MuteButton = ({variant='default', toggleMute, isMuted}) => {
  return (
    <Pressable
      className={`${variant === 'reel' ? 'right-4 bottom-40' : 'bottom-4 right-4'} absolute bg-black/60 p-2 rounded-full`}
      onPress={toggleMute}
    >
      <Feather
        name={isMuted ? "volume-x" : "volume-2"}
        size={22}
        color="#fff"
      />
    </Pressable>
  );
};

export default MuteButton;
