import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";
export const SCREEN_WIDTH = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  title: {
    color: "white",
    marginTop: 40,
    marginBottom: 40
  },
  container: {
    backgroundColor: Colors.darkBlue,
    flex: 1
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: Colors.darkBlue,
    paddingHorizontal: 16
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16
  },
  cardContent: {
    flexDirection: "row"
  },
  errorColor: {
    color: "white"
  },
  centered: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center"
  },
  errorText: {
    color: "white"
  },
  posterImage: {
    width: (SCREEN_WIDTH - 48) / 2,
    height: ((SCREEN_WIDTH - 48) / 2) * 1.5,
    borderRadius: 8
  },
  detailsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  movieTitle: {
    color: "#fff",
    marginLeft: 20
  },
  topDescriptionContainer: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center"
  },
  metaRowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  releaseDate: {
    color: "#ccc",
    marginLeft: 4,
    fontSize: 14
  },
  rating: {
    color: "#ccc",
    marginLeft: 4,
    fontSize: 14
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 8
  },
  overviewText: {
    color: "#ddd",
    fontSize: 16,
    lineHeight: 22
  },
  webviewContainer: {
    width: "100%",
    aspectRatio: 16 / 9, // maintain 16:9 ratio
    backgroundColor: "#000",
    marginTop: 8
  },
  webview: {
    flex: 1
  },
  noTrailerText: {
    color: "#ccc",
    fontSize: 16,
    marginTop: 4
  },
  icon: {
    marginRight: 8
  },
  iconText: {
    color: Colors.grey
  },
  description: {
    color: "white",
    marginTop: 20
  }
});
