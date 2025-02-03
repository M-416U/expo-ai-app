import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "expo-router";
import DialogComponent from "../../components/Dialog";

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
    <View className="flex-1 justify-center bg-slate-50 p-6">
      <Text className="text-3xl font-bold text-slate-800 mb-8 text-center">
        Create Account
      </Text>
      <DialogComponent
        visible={modalVisible}
        title="Registration Error"
        message={error}
        onClose={() => setModalVisible(false)}
      />
      <TextInput
        className="w-full bg-white border border-slate-200 rounded-lg p-4 mb-4 focus:border-primary-500"
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        className="w-full bg-white border border-slate-200 rounded-lg p-4 mb-4 focus:border-primary-500"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        className="w-full bg-white border border-slate-200 rounded-lg p-4 mb-6 focus:border-primary-500"
        placeholder="Confirm Password"
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleRegister} color="#3b82f6" />
      <Text className="text-slate-500 mt-6 text-center">
        Already have an account?{" "}
        <Text
          className="text-primary-600 font-semibold"
          onPress={() => router.push("/(auth)/Login")}
        >
          Log In
        </Text>
      </Text>
    </View>
  );
};

export default Register;
