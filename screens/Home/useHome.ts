import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies
} from "@/api/services";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";

export const useHome = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<string>("Now Playing");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchTerm] = useState<string>("");
  const {
    data: popularData,
    isLoading: isPopularDataLoading,
    refetch
  } = useQuery({
    queryKey: ["popular-movies"],
    queryFn: async () => {
      const response = await getPopularMovies();
      return response;
    }
  });
  // 3) Now Playing query
  const {
    data: nowPlayingData = [],
    isLoading: isNowPlayingLoading,
    isError: isNowPlayingError,
    refetch: refetchNowPlaying
  } = useQuery({
    queryKey: ["now-playing-movies"],
    queryFn: async () => {
      const response = await getNowPlayingMovies(1);
      return response;
    },
    enabled: selectedTab === "Now Playing",
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    staleTime: 1000 * 60 * 5
  });

  // 4) Upcoming query
  const {
    data: upcomingData = [],
    isLoading: isUpcomingLoading,
    isError: isUpcomingError,
    refetch: refetchUpcoming
  } = useQuery({
    queryKey: ["upcoming-movies"],
    queryFn: async () => {
      const response = await getUpcomingMovies(1);
      return response;
    },
    enabled: selectedTab === "Upcoming"
  });

  // 5) Top Rated query
  const {
    data: topRatedData = [],
    isLoading: isTopRatedLoading,
    isError: isTopRatedError,
    refetch: refetchTopRated
  } = useQuery({
    queryKey: ["top-rated-movies"],
    queryFn: async () => {
      const response = await getTopRatedMovies(1);
      return response;
    },
    enabled: selectedTab === "Top rated"
  });

  const onSearchDebounced = useCallback((text: string) => {
    setSearchTerm(text);
  }, []);

  const handleTabSelection = useCallback(
    async (option: string) => {
      setSelectedTab(option);
      if (option === "Now Playing") {
        await refetchNowPlaying();
      } else if (option === "Upcoming") {
        await refetchUpcoming();
      } else if (option === "Top rated") {
        await refetchTopRated();
      }
    },
    [refetchNowPlaying, refetchUpcoming, refetchTopRated]
  );

  const handleSubmit = (rawText: string) => {
    const trimmed = rawText.trim();
    if (trimmed.length > 0) {
      // Navigate to the “Search” tab, passing { query }
      router.push({
        pathname: "/(tabs)/search",
        params: {
          query: rawText.trim()
        }
      });
    }
  };

  const goToDetail = (id: number) => {
    router.push(`/detail/${id}`);
  };

  return {
    popularData,
    isPopularDataLoading,
    refetch,
    onSearchDebounced,
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
    handleTabSelection,
    handleSubmit,
    goToDetail
  };
};
