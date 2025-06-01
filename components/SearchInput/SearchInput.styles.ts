import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.darkGrey,
    borderRadius: 20,
    height: 50,
    paddingHorizontal: 24
  },
  textInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    paddingVertical: 0,
    fontFamily: "Poppins-Regular"
  },
  icon: {
    marginLeft: 8
  }
});
