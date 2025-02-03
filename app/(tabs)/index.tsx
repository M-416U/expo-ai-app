import React, { useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../../lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import { ThemeButton } from "@/components/ThemeButton";

const HomeScreen = () => {
  const router = useRouter();

  const [user, setUser] = useState<User>();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/(auth)/Login");
      } else {
        setUser(session.user);
      }
    };

    checkUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/(auth)/Login");
  };

  return (
    <View className="flex-1 bg-surface p-md">
      <View className="items-center mb-xl">
        <Text className="text-3xl font-bold text-primary font-sans">
          Welcome Back
        </Text>
        <Text className="text-lg text-secondary font-mono mt-xs">
          {user?.email}
        </Text>
      </View>

      <View className="bg-primary/10 p-md rounded-lg mb-lg">
        <Text className="text-base text-primary font-sans mb-sm">
          Account Status
        </Text>
        <View className="flex-row items-center">
          <View className="w-2 h-2 bg-accent rounded-full mr-sm" />
          <Text className="text-mono text-secondary">Email Verified ✓</Text>
        </View>
      </View>

      <View className="flex-row gap-md">
        <ThemeButton />
        <TouchableOpacity
          className="bg-accent p-md rounded-lg items-center active:opacity-75 flex-1"
          onPress={handleLogout}
        >
          <Text className="text-surface font-sans-bold text-lg">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
