import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";
export const SCREEN_WIDTH = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  title: {
    color: "white"
  },
  container: {
    backgroundColor: Colors.darkBlue,
    flex: 1
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.darkBlue,
    paddingHorizontal: 16
  },
  subtitle: {
    color: "white"
  },
  image: {
    width: 80,
    height: 80
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center"
  }
});
