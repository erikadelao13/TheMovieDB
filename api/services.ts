import instance from "./apiConfig";
import {
  Movie,
  MovieDetail,
  MovieListResponse,
  MovieVideoList,
  SearchResultItem
} from "./types";
import { THE_MOVIE_DB_URLS } from "./urls";

export async function getPopularMovies(page = 1): Promise<Movie[]> {
  try {
    const response = await instance.get<{ results: Movie[] }>(
      THE_MOVIE_DB_URLS.popular,
      {
        params: { page }
      }
    );
    return response.data.results;
  } catch (err) {
    console.error("getPopularMovies error:", err);
    return [];
  }
}

export async function getNowPlayingMovies(page = 1): Promise<Movie[]> {
  try {
    const response = await instance.get<{ results: Movie[] }>(
      THE_MOVIE_DB_URLS.nowPlaying,
      {
        params: { page }
      }
    );
    return response.data.results;
  } catch (err) {
    console.error("getNowPlayingMovies error:", err);
    return [];
  }
}

export async function getUpcomingMovies(page = 1): Promise<MovieListResponse> {
  const response = await instance.get<{ results: Movie[] }>(
    THE_MOVIE_DB_URLS.upcoming,
    {
      params: { page }
    }
  );
  return response.data.results;
}

export async function getTopRatedMovies(page = 1): Promise<MovieListResponse> {
  const response = await instance.get<{ results: Movie[] }>(
    THE_MOVIE_DB_URLS.topRated,
    {
      params: { page }
    }
  );
  return response.data.results;
}

export async function searchMovies(
  query: string,
  page = 1
): Promise<SearchResultItem[]> {
  try {
    if (!query || query.trim().length === 0) {
      return [];
    }

    const response = await instance.get<{ results: SearchResultItem[] }>(
      THE_MOVIE_DB_URLS.search,
      {
        params: { query, page }
      }
    );
    return response.data.results;
  } catch (err) {
    console.log("err", JSON.stringify(err));
    return [];
  }
}

export async function getMovieDetails(movieId: string): Promise<MovieDetail> {
  const response = await instance.get<MovieDetail>(
    `${THE_MOVIE_DB_URLS.movieDetail}/${movieId}`
  );
  return response.data;
}

export async function getMovieVideos(movieId: string): Promise<MovieVideoList> {
  const url = THE_MOVIE_DB_URLS.movieVideos.replace("{id}", movieId.toString());

  const response = await instance.get<{ results: MovieVideoList }>(url);
  return response.data.results;
}
