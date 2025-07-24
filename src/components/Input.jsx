import { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  inputStyle,
  secureTextEntry = false,
  keyboardType,
  autoCapitalize = "none",
  autoCorrect = false,
  className = "",
  wrapClass = "mb-3",
  icon,
  disabled = false,
  onClear,
  onSend,
  isCommentInput = false,
  height,
  multiline = false,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = secureTextEntry;

  return (
    <View>
      {/* Label */}
      {label && !isCommentInput && (
        <Text className="text-base font-medium text-gray-800 mb-2">
          {label}
        </Text>
      )}

      {/* Container */}
      <View
        className={`
          flex-row items-center px-4 border rounded-xl bg-white 
          ${height ? height : multiline ? "min-h-40" : "h-14"} 
          ${disabled ? "border-gray-200 bg-gray-100" : "border-gray-300"}
          ${wrapClass}
        `}
      >
        {/* Left Icon */}
        {icon && !isCommentInput && (
          <Feather
            name={icon}
            size={22}
            color={disabled ? "#aaa" : "#666"}
            style={{ marginRight: 6 }}
          />
        )}

        {/* ===== COMMENT MODE WITH MENTION HIGHLIGHTING ===== */}
        {isCommentInput ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            {/* Mention Highlight Layer */}
            <Text
              style={{
                position: "absolute",
                fontSize: 16,
                paddingVertical: multiline ? 12 : 0,
                paddingTop:
                  Platform.OS === "android" && !multiline
                    ? 1
                    : multiline
                    ? 12
                    : 0,
              }}
              className={className}
            >
              {(value || "").split(/(\s+)/).map((part, index) => {
                if (part.startsWith("@")) {
                  return (
                    <Text key={index} className="text-primary">
                      {part}
                    </Text>
                  );
                }
                return (
                  <Text key={index} className="text-black">
                    {part}
                  </Text>
                );
              })}
            </Text>

            {/* Transparent Input Field */}
            <TextInput
              autoCorrect={autoCorrect}
              value={value}
              onChangeText={onChangeText}
              placeholder={placeholder}
              keyboardType={keyboardType || "default"}
              autoCapitalize={autoCapitalize}
              editable={!disabled}
              placeholderTextColor="#999"
              multiline={multiline}
              textAlignVertical={multiline ? "top" : "center"}
              style={{
                flex: 1,
                fontSize: 16,
                color: "transparent",
                height: "100%",
                paddingVertical: multiline ? 12 : 0,
                paddingTop:
                  Platform.OS === "android" && !multiline
                    ? 1
                    : multiline
                    ? 12
                    : 0,
                ...inputStyle,
              }}
              className={className}
            />
          </View>
        ) : (
          // ===== NORMAL INPUT MODE =====
          <TextInput
            autoCorrect={autoCorrect}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            secureTextEntry={isPassword && !isPasswordVisible}
            keyboardType={keyboardType || "default"}
            autoCapitalize={autoCapitalize}
            editable={!disabled}
            placeholderTextColor="#999"
            multiline={multiline}
            textAlignVertical={multiline ? "top" : "center"}
            style={{
              flex: 1,
              fontSize: 16,
              color: disabled ? "#888" : "#000",
              height: "100%",
              paddingVertical: multiline ? 12 : 0,
              paddingTop:
                Platform.OS === "android" && !multiline
                  ? 1
                  : multiline
                  ? 12
                  : 0,
              ...inputStyle,
            }}
            className={className}
          />
        )}

        {/* Right Icon for Clear */}
        {value?.length > 0 &&
          onClear &&
          !isPassword &&
          !isCommentInput &&
          !multiline && (
            <TouchableOpacity onPress={onClear}>
              <Feather name="x" size={20} color="#888" />
            </TouchableOpacity>
          )}

        {/* Right Icon for Password Toggle */}
        {isPassword && !disabled && !isCommentInput && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Feather
              name={isPasswordVisible ? "eye" : "eye-off"}
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        )}

        {/* Right Icon for Comment Send */}
        {isCommentInput && (
          <TouchableOpacity
            onPress={onSend}
            disabled={disabled || !value.trim()}
            style={{ marginLeft: 8 }}
          >
            <Feather
              name="send"
              size={20}
              color={disabled || !value.trim() ? "#aaa" : "#2563EB"}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Input;
