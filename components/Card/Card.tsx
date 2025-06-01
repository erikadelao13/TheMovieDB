import { buildImgUrl } from "@/utils/api";
import React from "react";
import {
  GestureResponderEvent,
  Image,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import { styles } from "./Card.styles";

interface MovieCardProps {
  imageUrl: string | null;
  popularityNumber?: string;
  onPress?: (event: GestureResponderEvent) => void;
  style?: ViewStyle | ViewStyle[];
  width?: number;
  height?: number;
}

export const Card: React.FC<MovieCardProps> = ({
  imageUrl,
  popularityNumber,
  onPress,
  style,
  width,
  height
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.cardContainer,
        style,
        width ? { width } : {},
        height ? { height } : {}
      ]}
    >
      {/* Poster Image */}
      {imageUrl ? (
        <Image
          source={{ uri: buildImgUrl(imageUrl) }}
          style={[
            styles.posterImage,
            width ? { width } : {},
            height ? { height } : {}
          ]}
        />
      ) : null}

      {/* If a popularityNumber was passed, render it as a big overlay */}
      {typeof popularityNumber === "string" && popularityNumber.length > 0 && (
        <View style={styles.numberOverlay}>
          <Text style={styles.numberText}>{popularityNumber}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
