import { Header } from "@/components/Header";
import { Typography } from "@/components/Typography";
import { Colors } from "@/constants/Colors";
import { buildImgUrl } from "@/utils/api";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Image, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { styles } from "./MovieDetail.styles";
import { useMovieDetail } from "./useMovieDetail";

export const MovieDetailScreen = () => {
  const { trailer, movie, isMovieLoading, isVideosLoading, isVideosError } =
    useMovieDetail();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Detail" />
      <ScrollView style={styles.scrollViewContainer}>
        {isMovieLoading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <>
            {isVideosLoading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : isVideosError ? (
              <Typography style={styles.errorText}>
                Unable to load trailers.
              </Typography>
            ) : trailer ? (
              // Embed the YouTube trailer via WebView
              <View style={styles.webviewContainer}>
                <WebView
                  source={{
                    uri: `https://www.youtube.com/embed/${trailer.key}?rel=0&controls=1&autoplay=0`
                  }}
                  style={styles.webview}
                  javaScriptEnabled={true}
                  allowsFullscreenVideo
                />
              </View>
            ) : (
              <Typography style={styles.noTrailerText}>
                No trailer available.
              </Typography>
            )}
            <View style={styles.topDescriptionContainer}>
              <Image
                source={{ uri: buildImgUrl(movie?.poster_path ?? "") }}
                style={styles.posterImage}
              />
              <Typography style={styles.movieTitle} variant="headline">
                {movie?.title}
              </Typography>
            </View>
            <View style={styles.metaRowContainer}>
              <View style={styles.metaRow}>
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color={Colors.grey}
                  style={styles.icon}
                />
                <Typography style={styles.iconText} variant="body">
                  {movie?.release_date} |{" "}
                </Typography>
              </View>
              <View style={styles.metaRow}>
                <Ionicons
                  name="time-outline"
                  size={20}
                  color={Colors.grey}
                  style={styles.icon}
                />
                <Typography style={styles.iconText} variant="body">
                  {movie?.release_date} |{" "}
                </Typography>
              </View>

              <View style={styles.metaRow}>
                <Ionicons
                  name="ticket-outline"
                  size={20}
                  color={Colors.grey}
                  style={styles.icon}
                />
                <Typography style={styles.iconText} variant="body">
                  {movie?.release_date}
                </Typography>
              </View>
            </View>
            <Typography variant="headline" style={styles.description}>
              {movie?.overview}
            </Typography>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
