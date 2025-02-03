import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "expo-router";
import DialogComponent from "../../components/Dialog";
import { Ionicons } from "@expo/vector-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      setModalVisible(true);
    } else {
      router.push("/(tabs)");
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      setError(error.message);
      setModalVisible(true);
    } else {
      router.push("/(tabs)");
    }
  };

  return (
    <View className="flex-1 justify-center p-6 bg-slate-50">
      <View className="mb-8">
        <Text className="text-3xl font-bold text-gray-800">Welcome Back</Text>
        <Text className="text-gray-500 mt-2">Sign in to continue</Text>
      </View>
      <DialogComponent
        visible={modalVisible}
        title="Login Error"
        message={error}
        onClose={() => setModalVisible(false)}
        icon={<Ionicons name="warning-outline" size={40} color="red" />}
      />
      {/* Email Input */}
      <View className="mb-4">
        <Text className="text-gray-700 mb-2">Email</Text>
        <View className="flex-row items-center border border-gray-200 rounded-lg p-3 bg-white">
          <Ionicons
            name="mail-outline"
            size={20}
            color="#6b7280"
            className="mr-2"
          />
          <TextInput
            className="flex-1"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      {/* Password Input */}
      <View className="mb-6">
        <Text className="text-gray-700 mb-2">Password</Text>
        <View className="flex-row items-center border border-gray-200 rounded-lg p-3 bg-white">
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#6b7280"
            className="mr-2"
          />
          <TextInput
            className="flex-1"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
      </View>

      {/* Login Button */}
      <Pressable
        className="w-full bg-primary p-md rounded-md mb-4"
        onPress={handleLogin}
      >
        <Text className="text-white text-center font-semibold">Sign In</Text>
      </Pressable>

      {/* Google Login Button */}
      <Pressable
        className="w-full border border-surface p-md rounded-md mb-6 bg-surface"
        onPress={handleGoogleLogin}
      >
        <View className="flex-row items-center justify-center">
          <Ionicons
            name="logo-google"
            size={20}
            color="#db4437"
            className="mr-2"
          />
          <Text className="text-gray-700 font-semibold">
            Continue with Google
          </Text>
        </View>
      </Pressable>

      {/* Links */}
      <View className="flex-row justify-center space-x-2">
        <Pressable onPress={() => router.push("/(auth)/ResetPassword")}>
          <Text className="text-primary font-semibold">Forgot Password?</Text>
        </Pressable>
        <Text className="text-gray-500">•</Text>
        <Pressable onPress={() => router.push("/(auth)/Register")}>
          <Text className="text-primary font-semibold">Create Account</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default Login;
