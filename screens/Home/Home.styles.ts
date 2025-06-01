import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";
export const SCREEN_WIDTH = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  title: {
    color: "white",
    marginTop: 40,
    marginBottom: 40
  },
  container: {
    backgroundColor: Colors.darkBlue,
    flex: 1
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: Colors.darkBlue,
    paddingHorizontal: 16
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16
  },
  gridItemContainer: {
    flex: 1,
    alignItems: "center"
  },
  errorColor: {
    color: "white"
  },
  searchInputContainer: {
    marginBottom: 20
  },
  popularContainer: {
    marginBottom: 40
  },
  topTabsContainer: {
    marginBottom: 10
  }
});
