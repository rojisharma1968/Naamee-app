import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import Avatar from "../Avatar";

const PostHeader = ({ post, onOptionsPress }) => {
  return (
    <View className="flex-row items-center justify-between px-4 py-3">
      <View className="flex-row items-center">
        <Avatar uri={post.profileImage} className="size-10 mr-2" />
        <Text className="text-zinc-900 font-semibold">{post.username}</Text>
      </View>
      <TouchableOpacity onPress={onOptionsPress}>
        <Feather name="more-horizontal" size={25} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default PostHeader;
