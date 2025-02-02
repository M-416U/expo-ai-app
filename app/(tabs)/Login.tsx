import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "expo-router";
import DialogComponent from "../components/Dialog";
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

  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-2xl font-bold mb-4">Login</Text>
      <DialogComponent
        visible={modalVisible}
        title="Login Error"
        message={error}
        onClose={() => setModalVisible(false)}
        icon={<Ionicons name="warning-outline" size={40} color="red" />}
      />
      <TextInput
        className="border p-2 mb-4 w-full"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        className="border p-2 mb-4 w-full"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default Login;
