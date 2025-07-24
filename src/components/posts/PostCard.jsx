import React, { useRef, useState } from "react";
import {
  View,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import PostHeader from "./PostHeader";
import PostActions from "./PostActions";
import PostFooter from "./PostFooter";
import PostMedia from "./PostMedia";
import SmileImage from "../../../assets/images/smile.png";
import CustomModal from "../CustomModal";

const PostCard = ({ post }) => {
  const navigation = useNavigation();
  const [interactions, setInteractions] = useState({
    liked: false,
    repeated: false,
  });

  const [optionsVisible, setOptionsVisible] = useState(false);
  const [lastTap, setLastTap] = useState(null);
  const tapTimeout = useRef(null);

  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const triggerSmileAnimation = () => {
    scale.setValue(0);
    opacity.setValue(1);

    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1.2,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 700,
        delay: 400,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleSingleTap = () => {
    if (post.mediaType === "video") {
      navigation.navigate("Reels", { initialPostId: post.id });
    }
  };

  const handleDoubleTap = () => {
      setInteractions((prev) => ({ ...prev, liked: true }));
      triggerSmileAnimation();

  };

  const handleCommentNavigation = () => {
    navigation.navigate("Comments");
  };

  const handleTap = () => {
    Keyboard.dismiss();
    const now = Date.now();

    if (lastTap && now - lastTap < 200) {
      clearTimeout(tapTimeout.current);
      setLastTap(null);
      handleDoubleTap();
    } else {
      setLastTap(now);
      tapTimeout.current = setTimeout(() => {
        handleSingleTap();
        setLastTap(null);
      }, 200);
    }
  };

  return (
    <View className="bg-white overflow-hidden mb-1">
      <PostHeader post={post} onOptionsPress={() => setOptionsVisible(true)} />

      <TouchableWithoutFeedback onPress={handleTap}>
        <View>
          <PostMedia media={{ type: post.mediaType, url: post.mediaUrl }} />
          <Animated.Image
            source={SmileImage}
            style={{
              position: "absolute",
              top: "40%",
              left: "40%",
              width: 80,
              height: 80,
              transform: [{ scale }],
              opacity,
            }}
            resizeMode="contain"
          />
        </View>
      </TouchableWithoutFeedback>

      <PostFooter post={post} />
      <PostActions
        post={post}
        liked={interactions.liked}
        repeated={interactions.repeated}
        setLiked={(val) =>
          setInteractions((prev) => {
            if (val && !prev.liked) triggerSmileAnimation();
            return { ...prev, liked: val };
          })
        }
        setRepeated={(val) =>
          setInteractions((prev) => ({ ...prev, repeated: val }))
        }
        onCommentPress={handleCommentNavigation}
      />

      <CustomModal
        visible={optionsVisible}
        onClose={() => setOptionsVisible(false)}
        type="post"
        onEdit={() => console.log("Edit")}
        onDelete={() => console.log("Delete")}
        onShare={() => console.log("Share")}
      />
    </View>
  );
};

export default PostCard;
