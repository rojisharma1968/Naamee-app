import React from "react";
import { View, Text, Image } from "react-native";

const PostFooter = ({ post }) => {
  return (
    <>
      <View className="px-4 pb-3 mt-3">
        <Text className="text-sm text-zinc-700">
          <Text className="font-semibold text-zinc-900">{post.username} </Text>
          {post.caption}
        </Text>
        <Text className="text-xs text-zinc-500 mt-1">{post.time}</Text>
      </View>
    </>
  );
};

export default PostFooter;
