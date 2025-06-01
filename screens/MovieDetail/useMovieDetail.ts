import { getMovieDetails, getMovieVideos } from "@/api/services";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
export const useMovieDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: movie,
    isLoading: isMovieLoading,
    isError: isMovieError
  } = useQuery({
    queryKey: ["movie-details", id],
    queryFn: async () => getMovieDetails(id),
    staleTime: 1000 * 60 * 10 // cache for 10m
  });
  // 3) Fetch movie videos (trailers, teasers)
  const {
    data: videos = [],
    isLoading: isVideosLoading,
    isError: isVideosError
  } = useQuery({
    queryKey: ["movie-videos", id],
    queryFn: async () => getMovieVideos(id),
    staleTime: 1000 * 60 * 10
  });

  const trailer = useMemo(() => {
    if (!videos || videos.length === 0) return undefined;
    // Prefer type="Trailer", site="YouTube", official first:
    const officialYoutubeTrailer = videos.find(
      (v) => v.type === "Trailer" && v.site === "YouTube" && v.official === true
    );
    if (officialYoutubeTrailer) return officialYoutubeTrailer;
    // Else, pick any YouTube trailer
    return videos.find((v) => v.type === "Trailer" && v.site === "YouTube");
  }, [videos]);

  return {
    trailer,
    movie,
    isMovieLoading,
    isMovieError,
    videos,
    isVideosLoading,
    isVideosError
  };
};
