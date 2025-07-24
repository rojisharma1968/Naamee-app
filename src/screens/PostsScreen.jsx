import { FlatList, View } from "react-native";
import PostCard from "../components/posts/PostCard";

const demoPosts = [
  {
    id: "1",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    username: "johndoe",
    mediaType: "image",
    mediaUrl:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    repeats: 23,
    likes: 6525,
    comments: 23,
    likedBy: [
        {
          name: "kriibooo",
          image: "https://randomuser.me/api/portraits/women/68.jpg",
        },
        {
          name: "dianafreya",
          image: "https://randomuser.me/api/portraits/women/65.jpg",
        },
    ],
    caption: "Loving this vibe 🌆",
    time: "3 hours ago",
  },
  {
    id: "2",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    username: "johndoe",
    mediaType: "video",
    mediaUrl: "https://cdn.pixabay.com/video/2025/04/29/275498_small.mp4",
    repeats: 0,
    likes: 6525,
    comments: 23,
    likedBy: [
        {
          name: "kriibooo",
          image: "https://randomuser.me/api/portraits/women/68.jpg",
        },
        {
          name: "dianafreya",
          image: "https://randomuser.me/api/portraits/women/65.jpg",
        },
    ],
    caption: "Loving this vibe 🌆",
    time: "3 hours ago",
  },
  {
    id: "3",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    username: "johndoe",
    mediaType: "image",
    mediaUrl:
      "https://cdn.pixabay.com/photo/2025/06/15/21/04/golden-retriever-puppy-amber-9661916_1280.jpg",
    repeats: 10,
    likes: 6525,
    comments: 23,
    likedBy: [
        {
          name: "kriibooo",
          image: "https://randomuser.me/api/portraits/women/68.jpg",
        },
        {
          name: "dianafreya",
          image: "https://randomuser.me/api/portraits/women/65.jpg",
        },
    ],
    caption: "Loving this vibe 🌆",
    time: "3 hours ago",
  },
  {
    id: "4",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    username: "johndoe",
    mediaType: "image",
    mediaUrl:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
    repeats: 0,
    likes: 6525,
    comments: 23,
    likedBy: [
        {
          name: "kriibooo",
          image: "https://randomuser.me/api/portraits/women/68.jpg",
        },
        {
          name: "dianafreya",
          image: "https://randomuser.me/api/portraits/women/65.jpg",
        },
    ],
    caption: "Loving this vibe 🌆",
    time: "3 hours ago",
  },
  {
    id: "5",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    username: "johndoe",
    mediaType: "video",
    mediaUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    repeats: 6,
    likes: 6525,
    comments: 23,
    likedBy: [
        {
          name: "kriibooo",
          image: "https://randomuser.me/api/portraits/women/68.jpg",
        },
        {
          name: "dianafreya",
          image: "https://randomuser.me/api/portraits/women/65.jpg",
        },
    ],
    caption: "Loving this vibe 🌆",
    time: "3 hours ago",
  },
];

const PostsScreen = () => {
  return (
    <View>
      <FlatList
        data={demoPosts}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default PostsScreen;
