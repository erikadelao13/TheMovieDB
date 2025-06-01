import { CardWithContent } from "@/components/CardWithContent";
import { EmptyState } from "@/components/EmptyState";
import { Header } from "@/components/Header";
import { SearchInput } from "@/components/SearchInput";
import { FlatList, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./Search.styles";
import { useSearch } from "./useSearch";

export const SearchScreen = () => {
  const {
    searchResults,
    onSearchDebounced,
    handleSubmit,
    isError,
    goToDetail
  } = useSearch();
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Search" />
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.searchInputContainer}>
          <SearchInput
            placeholder="Search movies..."
            onSearch={onSearchDebounced}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit}
          />
        </View>
        {isError || !searchResults.length ? (
          <EmptyState />
        ) : (
          <FlatList
            data={searchResults}
            ItemSeparatorComponent={() => <View style={{ marginBottom: 20 }} />}
            renderItem={({ item }) => {
              return (
                <CardWithContent
                  title={item.title}
                  imageUrl={item.poster_path}
                  rating={item.vote_average}
                  year={item.release_date}
                  duration={item.original_language}
                  genre={"genre"}
                  onPress={() => goToDetail(item.id)}
                />
              );
            }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
