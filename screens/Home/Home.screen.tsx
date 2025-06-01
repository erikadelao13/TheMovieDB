import { Movie } from "@/api/types";
import { Card } from "@/components/Card";
import { SearchInput } from "@/components/SearchInput";
import { SwipeableTopTabs } from "@/components/SwipeableTopTabs/SwipeableTopTabs";
import { Typography } from "@/components/Typography";
import { ActivityIndicator, FlatList, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SCREEN_WIDTH, styles } from "./Home.styles";
import { useHome } from "./useHome";
const tabOptions = ["Now Playing", "Upcoming", "Top rated"];

export const HomeScreen = () => {
  const {
    popularData,
    isPopularDataLoading,
    onSearchDebounced,
    handleTabSelection,
    selectedTab,
    nowPlayingData,
    isNowPlayingLoading,
    isNowPlayingError,

    upcomingData,
    isUpcomingLoading,
    isUpcomingError,

    topRatedData,
    isTopRatedLoading,
    isTopRatedError,
    handleSubmit,
    goToDetail
  } = useHome();
  let activeCategoryData: Movie[] = [];
  let isCategoryLoading = false;
  let isCategoryError = false;

  if (selectedTab === "Now Playing") {
    activeCategoryData = nowPlayingData;
    isCategoryLoading = isNowPlayingLoading;
    isCategoryError = isNowPlayingError;
  } else if (selectedTab === "Upcoming") {
    activeCategoryData = upcomingData;
    isCategoryLoading = isUpcomingLoading;
    isCategoryError = isUpcomingError;
  } else if (selectedTab === "Top rated") {
    activeCategoryData = topRatedData;
    isCategoryLoading = isTopRatedLoading;
    isCategoryError = isTopRatedError;
  }
  const gridData = activeCategoryData.slice(0, 6);
  const renderGridItem = ({ item }: { item: Movie; index: number }) => {
    return (
      <View style={styles.gridItemContainer}>
        <Card
          imageUrl={item.poster_path}
          width={(SCREEN_WIDTH - 100) / 2}
          height={((SCREEN_WIDTH - 100) / 2) * 1.5} // 1.5:1 aspect ratio
          onPress={() => goToDetail(item.id)}
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {isPopularDataLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView style={styles.scrollViewContainer}>
          <Typography style={styles.title} variant="headline">
            What do you want to watch?
          </Typography>
          <View style={styles.searchInputContainer}>
            <SearchInput
              placeholder="Search movies..."
              onSearch={onSearchDebounced}
              onSubmit={handleSubmit}
            />
          </View>
          <FlatList
            horizontal
            data={popularData}
            style={styles.popularContainer}
            renderItem={({ item, index }) => {
              return (
                <View style={{ marginRight: 12 }}>
                  <Card
                    imageUrl={item.poster_path}
                    popularityNumber={(index + 1).toString()}
                    width={(SCREEN_WIDTH - 48) / 2}
                    height={((SCREEN_WIDTH - 48) / 2) * 1.5}
                    onPress={() => goToDetail(item.id)}
                  />
                </View>
              );
            }}
          />
          <View style={styles.topTabsContainer}>
            <SwipeableTopTabs
              options={tabOptions}
              initialSelected={tabOptions[0]}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onOptionSelect={handleTabSelection}
            />
          </View>
          {isCategoryLoading ? (
            <ActivityIndicator
              style={{ marginTop: 24 }}
              size="large"
              color="#fff"
            />
          ) : isCategoryError ? (
            <Typography style={styles.errorColor} variant="headline">
              Error loading {selectedTab} movies.
            </Typography>
          ) : (
            <FlatList
              data={gridData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderGridItem}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapper}
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 24
              }}
            />
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
