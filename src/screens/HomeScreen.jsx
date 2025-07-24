import { FlatList} from "react-native";
import PostCard from "../components/posts/PostCard";
import { useRef } from "react";
import { useAutoScrollToTop } from "../hooks/useAutoScrollToTop";


const HomeScreen = () => {
  const listRef = useRef()
  useAutoScrollToTop(listRef)

  const demoPosts = [
    {
      id: "1",
      profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
      username: "johndoe",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1743376272672-c130603a3af2",
      likes: 6525,
      comments: 23,
      repeats: 23,
      caption: "Loving this vibe 🌆 #vibe #mountains #snow",
      time: "3 hours ago",
    },
    {
      id: "2",
      profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
      username: "alexsmith",
      mediaType: "video",
      mediaUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      likes: 1200,
      comments: 12,
      repeats: 5,
      caption: "funny 🤣",
      time: "1 hour ago",
    },
    {
      id: "3",
      profileImage: "https://randomuser.me/api/portraits/women/12.jpg",
      username: "emilyrose",
      mediaType: "image",
      mediaUrl:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
      likes: 3400,
      comments: 30,
      repeats: 10,
      caption: "Coffee time ☕️",
      time: "2 hours ago",
    },
    {
      id: "4",
      profileImage: "https://randomuser.me/api/portraits/men/41.jpg",
      username: "michaelb",
      mediaType: "image",
      mediaUrl:
        "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
      likes: 900,
      comments: 8,
      repeats: 2,
      caption: "City lights ✨",
      time: "4 hours ago",
    },
    {
      id: "5",
      profileImage: "https://randomuser.me/api/portraits/women/55.jpg",
      username: "sarahj",
      mediaType: "video",
      mediaUrl: "https://cdn.pixabay.com/video/2025/05/13/278750_tiny.mp4",
      likes: 2100,
      comments: 15,
      repeats: 6,
      caption: "Clouds feels 💨",
      time: "5 hours ago",
    },
  ];

  return (
    <FlatList
      ref={listRef}
      data={demoPosts}
      renderItem={({ item }) => <PostCard post={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default HomeScreen;
