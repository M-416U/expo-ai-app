import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-2xl mb-4 text-red-500">
        Welcome, {"user.email"}
      </Text>
      {/* <Text className="mb-4">
        {"user.email_verified"
          ? "Your email is verified."
          : "Please verify your email."}
      </Text> */}
      {/* <Button title="Logout" onPress={handleLogout} /> */}
    </View>
  );
};

export default HomeScreen;
