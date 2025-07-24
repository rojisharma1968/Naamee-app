import { FlatList, View } from "react-native";
import { useState } from "react";
import Tabs from "../components/Tabs";
import GridPostItem from "../components/GridPostItem";

const explorePosts = [
  // Trending
  {
    id: "1",
    mediaType: "image",
    mediaUrl:
      "https://cdn.pixabay.com/photo/2025/06/15/21/04/golden-retriever-puppy-amber-9661916_1280.jpg",
    type: "trending",
  },
  {
    id: "2",
    mediaType: "video",
    mediaUrl: "https://cdn.pixabay.com/video/2025/04/29/275498_tiny.mp4",
    type: "trending",
  },
  {
    id: "3",
    mediaType: "image",
    mediaUrl:
      "https://cdn.pixabay.com/photo/2025/06/23/17/50/wheat-9676363_960_720.jpg",
    type: "trending",
  },
  {
    id: "4",
    mediaType: "video",
    mediaUrl: "https://cdn.pixabay.com/video/2025/03/08/263305_tiny.mp4",
    type: "trending",
  },
  {
    id: "5",
    mediaType: "image",
    mediaUrl:
      "https://cdn.pixabay.com/photo/2025/06/23/17/50/wheat-9676363_960_720.jpg",
    type: "trending",
  },
  {
    id: "6",
    mediaType: "image",
    mediaUrl:
      "https://cdn.pixabay.com/photo/2025/06/15/21/04/golden-retriever-puppy-amber-9661916_1280.jpg",
    type: "trending",
  },
  {
    id: "7",
    mediaType: "image",
    mediaUrl:
      "https://cdn.pixabay.com/photo/2025/06/15/21/04/golden-retriever-puppy-amber-9661916_1280.jpg",
    type: "trending",
  },
  {
    id: "8",
    mediaType: "video",
    mediaUrl: "https://cdn.pixabay.com/video/2025/04/29/275498_tiny.mp4",
    type: "trending",
  },
  {
    id: "9",
    mediaType: "image",
    mediaUrl:
      "https://cdn.pixabay.com/photo/2025/06/23/17/50/wheat-9676363_960_720.jpg",
    type: "trending",
  },
   {
    id: "10",
    mediaType: "video",
    mediaUrl: "https://cdn.pixabay.com/video/2025/03/08/263305_tiny.mp4",
    type: "trending",
  },
  {
    id: "5",
    mediaType: "image",
    mediaUrl:
      "https://cdn.pixabay.com/photo/2025/06/23/17/50/wheat-9676363_960_720.jpg",
    type: "trending",
  },
  {
    id: "11",
    mediaType: "image",
    mediaUrl:
      "https://cdn.pixabay.com/photo/2025/06/15/21/04/golden-retriever-puppy-amber-9661916_1280.jpg",
    type: "trending",
  },
   {
    id: "12",
    mediaType: "image",
    mediaUrl:
      "https://cdn.pixabay.com/photo/2025/06/15/21/04/golden-retriever-puppy-amber-9661916_1280.jpg",
    type: "trending",
  },
  {
    id: "13",
    mediaType: "video",
    mediaUrl: "https://cdn.pixabay.com/video/2025/04/29/275498_tiny.mp4",
    type: "trending",
  },
  {
    id: "14",
    mediaType: "image",
    mediaUrl:
      "https://cdn.pixabay.com/photo/2025/06/23/17/50/wheat-9676363_960_720.jpg",
    type: "trending",
  },

  // Popular
  {
    id: "15",
    mediaType: "video",
    mediaUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    type: "popular",
  },
  {
    id: "16",
    mediaType: "image",
    mediaUrl:
      "https://cdn.pixabay.com/photo/2023/04/11/09/08/norway-7916632_1280.jpg",
    type: "popular",
  },
  {
    id: "17",
    mediaType: "image",
    mediaUrl: "https://cdn.pixabay.com/photo/2025/06/03/05/11/louvre-9638315_1280.jpg",
    type: "popular",
  },
];

const ExploreScreen = () => {
  const [activeTab, setActiveTab] = useState("trending");

  const tabs = [
    { key: "trending", label: "Trending" },
    { key: "popular", label: "Popular" },
  ];

  const filteredPosts = explorePosts.filter((post) => post.type === activeTab);

  return (
    <View className="flex-1 bg-white">
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
        wrapClass="bg-white"
      />

      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => <GridPostItem item={item} />}
        showsVerticalScrollIndicator={false}
        className="flex-1 bg-gray-100"
      />
    </View>
  );
};

export default ExploreScreen;
