import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "expo-router";
import DialogComponent from "../components/Dialog";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({
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
      <Text className="text-2xl font-bold mb-4">Register</Text>
      <DialogComponent
        visible={modalVisible}
        title="Registration Error"
        message={error}
        onClose={() => setModalVisible(false)}
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
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default Register;
