import { FlatList, View, Text } from "react-native";
import ProfileHeader from "../components/profile/ProfileHeader";
import Tabs from "../components/Tabs";
import GridPostItem from "../components/GridPostItem";
import { useRef, useState } from "react";
import { useAutoScrollToTop } from "../hooks/useAutoScrollToTop";

const demoPosts = [
  {
    id: "1",
    mediaType: "image",
    mediaUrl:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    repeats: 23,
  },
  {
    id: "2",
    mediaType: "video",
    mediaUrl: "https://cdn.pixabay.com/video/2025/04/29/275498_tiny.mp4",
    repeats: 0,
  },
  {
    id: "3",
    mediaType: "image",
    mediaUrl:
      "https://cdn.pixabay.com/photo/2025/06/15/21/04/golden-retriever-puppy-amber-9661916_1280.jpg",
    repeats: 10,
  },
  {
    id: "4",
    mediaType: "image",
    mediaUrl:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
    repeats: 0,
  },
  {
    id: "5",
    mediaType: "video",
    mediaUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    repeats: 6,
  },
];

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState("grid");
  const listRef = useRef();
  useAutoScrollToTop(listRef)
  const filteredPosts =
    activeTab === "repeat" ? demoPosts.filter((p) => p.repeats > 0) : demoPosts;

  return (
    <FlatList
      ref={listRef}
      className="flex-1 bg-white"
      key={activeTab}
      data={filteredPosts}
      keyExtractor={(item) => item.id}
      numColumns={activeTab === "list" ? 1 : 3}
      renderItem={({ item }) => <GridPostItem item={item} layout={activeTab} />}
      ListHeaderComponent={
        <>
          <ProfileHeader
            avatarUrl="https://randomuser.me/api/portraits/men/32.jpg"
            totalPosts={demoPosts.length}
          />

          <Tabs
            wrapClass="bg-zinc-100"
            tabs={[
              { key: "grid", icon: "grid" },
              { key: "list", icon: "list" },
              { key: "clicked", icon: "smile" },
              { key: "repeat", icon: "repeat" },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
            useIcons
          />
        </>
      }
      ListEmptyComponent={
        <View className="items-center mt-16">
          <Text className="text-gray-500 text-base">
            You haven't posted anything yet
          </Text>
        </View>
      }
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ProfileScreen;
