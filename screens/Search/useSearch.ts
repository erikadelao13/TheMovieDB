import { searchMovies } from "@/api/services";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";

export const useSearch = () => {
  const router = useRouter();
  const { query } = useLocalSearchParams<{ query: string }>();
  const [searchTerm, setSearchTerm] = useState<string>(query || "");

  useEffect(() => {
    if (typeof query === "string") {
      setSearchTerm(query);
    }
  }, [query]);

  const {
    data: searchResults = [],
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ["search-movies", searchTerm],
    queryFn: async () => await searchMovies(searchTerm, 1),
    enabled: !!searchTerm && searchTerm.trim().length > 0,
    staleTime: 1000 * 60 * 5
  });

  const onSearchDebounced = useCallback((text: string) => {
    setSearchTerm(text);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (searchTerm.trim().length > 0) {
      await refetch();
    }
  }, [refetch, searchTerm]);

  const goToDetail = (id: number) => {
    router.push(`/detail/${id}`);
  };
  return {
    query,
    searchResults,
    onSearchDebounced,
    handleSubmit,
    isLoading,
    isError,
    goToDetail
  };
};
