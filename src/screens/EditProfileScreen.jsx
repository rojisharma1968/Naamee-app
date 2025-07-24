import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Avatar from "../components/Avatar";
import Input from "../components/Input";
import Button from "../components/Button";
import ToggleSelector from "../components/ToggleSelector";

const PRIVACY_OPTIONS = ["Everyone", "Followers Only"];

const EditProfileScreen = ({navigation}) => {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("John Doe");
  const [username, setUsername] = useState("johndoe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [bio, setBio] = useState("");
  const [accountType, setAccountType] = useState("Public");
  const [notifications, setNotifications] = useState(true);
  const [privacySettings, setPrivacySettings] = useState({
    smilePost: "Everyone",
    followers: "Everyone",
    following: "Everyone",
    videos: "Everyone",
  });
  const [openPrivacyKey, setOpenPrivacyKey] = useState("");
  const [toggleWidth, setToggleWidth] = useState(0);
  const [toggleHeight, setToggleHeight] = useState(0);

  // Animation for account type toggle
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: accountType === "Public" ? 0 : 1,
      friction: 7, // Controls "bounciness" (lower = more bouncy)
      tension: 40, // Controls speed (higher = faster)
      useNativeDriver: true,
    }).start();
  }, [accountType]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handlePrivacyChange = (key, value) => {
    setPrivacySettings((prev) => ({ ...prev, [key]: value }));
    setOpenPrivacyKey("");
  };

  const togglePrivacyDropdown = (key) => {
    setOpenPrivacyKey((prev) => (prev === key ? "" : key));
  };

  // Input configurations for looping with icons (except Bio)
  const inputFields = [
    {
      label: "Full Name",
      value: name,
      onChangeText: setName,
      placeholder: "Enter your full name",
      icon: "user",
    },
    {
      label: "Username",
      value: username,
      onChangeText: setUsername,
      placeholder: "Enter your username",
      icon: "at-sign",
    },
    {
      label: "Email",
      value: email,
      onChangeText: setEmail,
      placeholder: "Enter your email",
      icon: "mail",
    },
    {
      label: "Phone",
      value: phone,
      onChangeText: setPhone,
      placeholder: "Enter your phone number",
      icon: "phone",
    },
    {
      label: "Website",
      value: website,
      onChangeText: setWebsite,
      placeholder: "Enter your website",
      icon: "globe",
    },
    {
      label: "Bio",
      value: bio,
      onChangeText: setBio,
      placeholder: "Tell us about yourself",
      multiline: true,
    },
  ];

  return (
    <View className="flex-1 bg-zinc-100">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView className="px-3 py-5">
          {/* Profile Image */}
          <View className="items-center mb-5">
            <TouchableOpacity onPress={pickImage} className="relative">
              <Avatar
                uri={
                  profileImage ||
                  "https://randomuser.me/api/portraits/men/32.jpg"
                }
                className="w-32 h-32 rounded-full border-4 border-primary/40"
              />
              <View className="absolute bottom-1 right-1 bg-primary rounded-full p-2.5">
                <Text className="text-sm text-white font-semibold">Edit</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Form Inputs */}
          <View className="bg-white rounded-xl p-6 mb-6">
            <Text className="text-xl font-semibold text-gray-900 mb-5">
              Personal Info
            </Text>
            <View className="space-y-5">
              {inputFields.map((field, index) => (
                <Input
                  key={index}
                  label={field.label}
                  value={field.value}
                  onChangeText={field.onChangeText}
                  placeholder={field.placeholder}
                  multiline={field.multiline || false}
                  icon={field.icon}
                />
              ))}
            </View>
          </View>

          {/* Account Type */}
          <View className="bg-white rounded-xl p-6 mb-6">
            <Text className="text-xl font-semibold text-gray-900 mb-5">
              Account Type
            </Text>
            <ToggleSelector
              value={accountType}
              onChange={setAccountType}
              options={[
                { label: "Public", value: "Public", icon: "globe" },
                { label: "Private", value: "Private", icon: "lock" },
              ]}
            />
          </View>

          {/* Privacy Settings */}
          <View className="bg-white rounded-xl px-6 pt-6 mb-6">
            <Text className="text-xl font-semibold text-gray-900 mb-5">
              Privacy Settings
            </Text>
            {Object.keys(privacySettings).map((key, index) => (
              <View
                key={key}
                className={`mb-5 ${index === Object.keys(privacySettings).length - 1 ? "" : "border-b border-gray-200"} pb-5`}
              >
                <TouchableOpacity
                  onPress={() => togglePrivacyDropdown(key)}
                  className="flex-row justify-between items-center"
                >
                  <View>
                    <Text className="text-sm text-gray-600 capitalize">
                      Who can view your {key}
                    </Text>
                    <Text className="text-lg text-gray-800 font-medium mt-1">
                      {privacySettings[key]}
                    </Text>
                  </View>
                  <Text className="text-primary text-base font-medium">
                    Change
                  </Text>
                </TouchableOpacity>
                {openPrivacyKey === key && (
                  <View className="mt-4 bg-gray-100 rounded-lg p-4">
                    {PRIVACY_OPTIONS.map((option) => (
                      <TouchableOpacity
                        key={option}
                        onPress={() => handlePrivacyChange(key, option)}
                        className="py-3"
                      >
                        <Text
                          className={`text-base font-medium ${
                            privacySettings[key] === option
                              ? "text-primary font-semibold"
                              : "text-gray-700"
                          }`}
                        >
                          {option}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>

          {/* Notifications */}
          <View className="bg-white rounded-xl p-6 mb-6 flex-row items-center justify-between">
            <Text className="text-lg text-gray-800 font-medium">
              Notifications
            </Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: "#d1d5db", true: "#5ba1d6" }}
              thumbColor={notifications ? "#ffffff" : "#f4f4f5"}
            />
          </View>

          {/* Save Button */}
          <Text className='mb-4 text-base text-center'>
            <Text
              className="text-primary text-base"
              onPress={() => navigation.navigate("TermsScreen")}
            >
              Terms of Use
            </Text>{" "}
            and{" "}
            <Text
              className="text-primary text-base"
              onPress={() => navigation.navigate("PrivacyScreen")}
            >
              Privacy Policy
            </Text>
          </Text>
          <Button title="Save Changes" className="mb-8" />
        </ScrollView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default EditProfileScreen;
