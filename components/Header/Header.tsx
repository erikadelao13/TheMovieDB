import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import { Typography } from "../Typography";
import { styles } from "./Header.styles";

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={20} color={"white"} />
      </Pressable>
      <Typography style={styles.titleStyle} variant="headline">
        {title}
      </Typography>
      <View />
    </View>
  );
};
