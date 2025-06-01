// src/components/Card.styles.ts

import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 8,
    backgroundColor: "#000",
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android shadow
    elevation: 5,

    // Default size (unless overridden via props)
    width: 120,
    height: 180,

    // On Android, overflow:'hidden' is required for rounded corners to clip children.
    // On iOS, overflow:'hidden' would clip the shadow, so we only apply it on Android.
    overflow: Platform.OS === "android" ? "hidden" : "visible"
  },

  posterImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8
  },

  /**
   * Position the number in the bottom-left corner.
   * We give it a small amount of padding from the edges.
   */
  numberOverlay: {
    position: "absolute",
    bottom: 8,
    left: 8
    // No need to fill entire area—only the bottom-left.
    // If you want a semi-transparent box behind the number, you could add:
    // backgroundColor: 'rgba(0,0,0,0.3)',
    // paddingHorizontal: 4,
    // paddingVertical: 2,
    // borderRadius: 4,
  },

  numberText: {
    fontSize: 70, // slightly smaller than center version
    fontWeight: "bold",
    color: "rgba(255,255,255,0.85)",
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4
  }
});
