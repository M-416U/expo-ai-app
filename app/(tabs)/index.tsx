import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../../lib/supabaseClient";

const HomeScreen = () => {
  const router = useRouter();

  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/(tabs)/Login");
      } else {
        setUserEmail(session.user.email || "");
      }
    };

    checkUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/(tabs)/Login");
  };

  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-2xl mb-4">Welcome, {userEmail}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
