import { Image, View } from "react-native";
import { Typography } from "../Typography";
import { styles } from "./EmptyState.styles";

export const EmptyState = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <Image
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-require-imports
          source={require("../../assets/images/emptysearch.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Typography style={styles.title} variant="headline">
          we are sorry, we can not find the movie :(
        </Typography>
        <Typography style={styles.subtitle}>
          Find your movie by Type title, categories, years, etc
        </Typography>
      </View>
    </View>
  );
};
