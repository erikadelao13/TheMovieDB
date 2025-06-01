import { Header } from "@/components/Header";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./WatchList.styles";
import { useWatchList } from "./useWatchList";

export const WatchListScreen = () => {
  const {} = useWatchList();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Watch list" />
      <ScrollView style={styles.scrollViewContainer}></ScrollView>
    </SafeAreaView>
  );
};
