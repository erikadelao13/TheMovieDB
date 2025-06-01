import { StyleSheet, TextStyle } from "react-native";
import { TTypographyVariant } from "./Typography";

type TypographyStyleMap = Record<TTypographyVariant, TextStyle>;

export const styles: TypographyStyleMap = StyleSheet.create({
  // Body texts
  headline: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    lineHeight: 27
  },
  headline2: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    lineHeight: 24
  },
  body: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    lineHeight: 18
  },
  bodySemiBold: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 12,
    lineHeight: 18
  },
  body2: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    lineHeight: 21
  }
});
