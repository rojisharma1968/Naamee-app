import { useRef, useState } from "react";
import { FlatList,TouchableOpacity } from "react-native";
import ReelCard from "../components/reels/ReelCard";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";


const demoReels = [
  {
    id: "r1",
    mediaType: "video",
    mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    likes: 124,
    comments: 18,
    repeats: 6,
    user: {
      name: "naturelover",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    },
    caption: "Peaceful mornings 🌅",
  },
    {
    id: "r2",
    mediaType: "video",
    mediaUrl: "https://cdn.pixabay.com/video/2024/06/02/214940_tiny.mp4",
    likes: 124,
    comments: 18,
    repeats: 6,
    user: {
      name: "naturelover",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    },
    caption: "Peaceful mornings 🌅",
  },
  {
    id: "r3",
    mediaType: "video",
    mediaUrl: "https://cdn.pixabay.com/video/2024/06/29/218714_tiny.mp4",
    likes: 205,
    comments: 32,
    repeats: 12,
    user: {
      name: "petfan",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    caption: "Golden retriever being adorable 🐶",
  },
  {
    id: "r4",
    mediaType: "video",
    mediaUrl: "https://cdn.pixabay.com/video/2025/03/08/263305_tiny.mp4",
    likes: 89,
    comments: 10,
    repeats: 3,
    user: {
      name: "skaterlife",
      avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    },
    caption: "Skating through the city 🛹🌆",
  },
  {
    id: "r5",
    mediaType: "video",
    mediaUrl: "https://cdn.pixabay.com/video/2025/03/12/264272_tiny.mp4",
    likes: 89,
    comments: 10,
    repeats: 3,
    user: {
      name: "John doe",
      avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    },
    caption: "Skating through the city 🛹🌆",
  },
];

const ReelsScreen = ({navigation}) => {
  const insets = useSafeAreaInsets()
  const [currentIndex, setCurrentIndex] = useState(0);
  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 70 });
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });


  return (
    <>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className={`absolute ${insets.bottom > 0 ? 'top-16' : 'top-10' }  left-4 z-20 p-2 bg-black/50 rounded-full`}
      >
        <Feather name="chevron-left" size={22} color="white" />
      </TouchableOpacity>
      <FlatList
        data={demoReels}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ReelCard post={item} />}
        pagingEnabled
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default ReelsScreen;
