import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SmileImage from "../../../assets/images/smile.png";
import PostMedia from "../posts/PostMedia";
import PostActions from "../posts/PostActions";
import Avatar from "../Avatar";
import { BlurView } from "expo-blur";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../Button";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ReelCard = ({ post }) => {
  const navigation = useNavigation();
  const [liked, setLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [lastTap, setLastTap] = useState(null);
  const insets = useSafeAreaInsets()

  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const triggerSmileAnimation = () => {
    scale.setValue(0);
    opacity.setValue(1);

    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1.5,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 600,
        delay: 400,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleTap = () => {
    const now = Date.now();
    if (lastTap && now - lastTap < 300) {
      setLiked(true);
      triggerSmileAnimation();
    } else {
      setLastTap(now);
    }
  };

  const handleCommentPress = () => {
    navigation.navigate("Comments", { post });
  };

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <View style={{ height: SCREEN_HEIGHT }} className="bg-black">
      {/* Media with double tap like */}
      <TouchableWithoutFeedback onPress={handleTap}>
        <View className="flex-1">
          <PostMedia
            variant="reel"
            media={{ type: post.mediaType, url: post.mediaUrl }}
          />
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

      {/* Actions */}
      <PostActions
        liked={liked}
        setLiked={setLiked}
        post={post}
        onCommentPress={handleCommentPress}
        variant="reel"
      />

      {/* Footer */}
      <BlurView
        intensity={15}
        tint="dark"
        className={`absolute bottom-0 left-0 right-0 px-5 ${insets.bottom > 0 ? 'pt-2' : 'pt-2 pb-3'} w-full overflow-hidden`}
      >
        <SafeAreaView edges={["bottom"]} className="flex-col gap-y-2">
          {/* User Info and Follow Button */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-x-3">
              <Avatar
                uri={post.user?.avatar}
                className="size-12 border-2 border-white/90 rounded-full"
              />
              <Text className="text-white font-bold text-lg">
                {post.user?.username || post.user?.name}
              </Text>
            </View>
            <Button
              onPress={handleFollowToggle}
              variant={isFollowing ? "secondary" : "primary"}
              className="!py-2"
              textClass="!text-base"
              title={isFollowing ? "Following" : "Follow"}
            />
          </View>
          {/* Caption */}
          {post.caption && (
            <Text className="text-white/90 text-sm font-medium leading-relaxed line-clamp-3 max-w-md">
              {post.caption}
            </Text>
          )}
        </SafeAreaView>
      </BlurView>
    </View>
  );
};

export default ReelCard;
