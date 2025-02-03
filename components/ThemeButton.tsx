import { TouchableOpacity, Text } from "react-native";
import { useColorScheme } from "nativewind";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeButton = () => {
  const { colorScheme, setColorScheme } = useColorScheme();

  const toggleTheme = async () => {
    const newTheme = colorScheme === "light" ? "dark" : "light";
    setColorScheme(newTheme);
    Appearance.setColorScheme(newTheme);
    await AsyncStorage.setItem("theme", newTheme);
  };

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      className="px-4 py-2 bg-primary dark:bg-primary-dark rounded-lg"
      accessibilityLabel="Toggle theme"
    >
      <Text className="text-surface dark:text-surface-dark font-medium">
        {colorScheme === "light" ? "🌞" : "🌙"} Toggle Theme
      </Text>
    </TouchableOpacity>
  );
};
