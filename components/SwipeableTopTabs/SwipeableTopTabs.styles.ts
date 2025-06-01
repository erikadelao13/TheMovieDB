import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    borderRadius: 6,
    position: "relative",
    overflow: "hidden",
    alignItems: "center"
  },
  animatedChip: {
    position: "absolute",
    width: "50%",
    height: 30,
    backgroundColor: "#FFF", // TODO: Pedir al equipo de diseño el token
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 3
  },
  option: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
