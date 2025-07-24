import { useEffect, useRef } from "react";
import { Modal, Pressable, Text, View, Animated } from "react-native";
import Button from "./Button";
import Input from "../components/Input"; // adjust path as per your folder structure

const CustomModal = ({
  visible,
  onClose,
  type = "logout",
  onEdit,
  onDelete,
  onShare,
  onConfirmLogout,
  inputValue,
  onChangeInput,
  placeholder,
  onSubmit,
  title
}) => {
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (visible) {
      slideAnim.setValue(300); // Reset before show
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <Pressable
        className={`flex-1 bg-black/40 ${type === "post" ? "px-0" : "px-5"}`}
        onPress={onClose}
        style={{ justifyContent: type === "post" ? "flex-end" : "center" }}
      >
        <Animated.View
          style={{
            transform: [
              {
                translateY: type === "post" ? slideAnim : 0,
              },
            ],
          }}
          className={`bg-white rounded-xl ${
            type === "logout" ? "py-6 px-4" : "p-4"
          }`}
        >
          {type === "post" ? (
            <>
              <Button
                title="Edit"
                onPress={onEdit}
                variant="text"
                className="!py-4"
                textClass="text-lg !font-medium"
              />
              <Button
                title="Delete"
                onPress={onDelete}
                variant="textDanger"
                className="!py-4"
                textClass="text-lg !font-medium"
              />
              <Button
                title="Share"
                onPress={onShare}
                variant="text"
                className="!py-4"
                textClass="text-lg !font-medium"
              />
              <Button
                title="Cancel"
                onPress={onClose}
                variant="textMuted"
                className="!py-4"
                textClass="text-lg !font-medium"
              />
            </>
          ) : type === "input" ? (
            <>
              <Text className="text-lg font-semibold text-gray-800 mb-2">
                {title || 'Add Title Here'}
              </Text>
              <Input
                value={inputValue}
                onChangeText={onChangeInput}
                placeholder={placeholder}
                wrapClass="bg-gray-100 rounded-xl px-4 py-3 mb-4"
                autoFocus
              />
              <View className="flex-row justify-end gap-2">
                <Button
                  title="Cancel"
                  onPress={onClose}
                  variant="secondary"
                  className="!px-6 !py-2"
                  textClass="text-lg"
                />
                <Button
                  title="Save"
                  onPress={onSubmit}
                  variant="primary"
                  className="!px-6 !py-2"
                  textClass="text-lg"
                />
              </View>
            </>
          ) : (
            <>
              <Text className="text-center text-xl font-medium text-zinc-800 mb-4">
                {title || 'Are you sure you want to logout?'}
              </Text>
              <View className="flex-row justify-evenly mt-2">
                <Button
                  title="Cancel"
                  onPress={onClose}
                  variant="secondary"
                  className="!px-6 !py-2"
                  textClass="text-lg"
                />
                <Button
                  title="Logout"
                  onPress={onConfirmLogout}
                  variant="danger"
                  className="!px-6 !py-2"
                  textClass="text-lg"
                />
              </View>
            </>
          )}
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default CustomModal;
