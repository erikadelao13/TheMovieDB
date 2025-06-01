import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions, View } from "react-native";
import { Card } from "../Card/Card";
import { Typography } from "../Typography";
import { styles } from "./CardWithContent.styles";

interface CardWithContentProps {
  title: string;
  rating: number;
  genre: string;
  year: string;
  duration: string;
  imageUrl: string | null;
  onPress?: () => void;
}

export const CardWithContent: React.FC<CardWithContentProps> = ({
  title,
  rating,
  genre,
  year,
  duration,
  imageUrl,
  onPress
}) => {
  return (
    <View style={styles.container}>
      <Card
        imageUrl={imageUrl}
        width={(Dimensions.get("window").width - 100) / 2}
        height={((Dimensions.get("window").width - 100) / 2) * 1.5}
        onPress={onPress}
      />
      <View style={styles.rightContent}>
        <Typography style={styles.titleMovie} variant="headline2">
          {title}
        </Typography>
        <View style={styles.iconContainer}>
          <Ionicons
            name="star-outline"
            size={20}
            color={Colors.darkOrange}
            style={styles.icon}
          />
          <Typography style={styles.iconText} variant="body">
            {rating}
          </Typography>
        </View>
        <View style={styles.iconContainer}>
          <Ionicons
            name="ticket-outline"
            size={20}
            color={"white"}
            style={styles.icon}
          />
          <Typography style={styles.iconText} variant="body">
            {genre}
          </Typography>
        </View>
        <View style={styles.iconContainer}>
          <Ionicons
            name="calendar-outline"
            size={20}
            color={"white"}
            style={styles.icon}
          />
          <Typography style={styles.iconText} variant="body">
            {year}
          </Typography>
        </View>
        <View style={styles.iconContainer}>
          <Ionicons
            name="time-outline"
            size={20}
            color={"white"}
            style={styles.icon}
          />
          <Typography style={styles.iconText} variant="body">
            {duration}
          </Typography>
        </View>
      </View>
    </View>
  );
};
