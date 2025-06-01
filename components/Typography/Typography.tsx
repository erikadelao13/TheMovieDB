import React from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";
import { styles } from "./Typography.styles";

export type TTypographyVariant =
  | "headline"
  | "headline2"
  | "body"
  | "bodySemiBold"
  | "body2";

interface ITypographyProps extends TextProps {
  variant?: TTypographyVariant;
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export const Typography: React.FC<ITypographyProps> = ({
  variant = "body",
  children,
  style,
  ...rest
}) => {
  return (
    <Text style={[styles[variant], style]} {...rest}>
      {children}
    </Text>
  );
};
