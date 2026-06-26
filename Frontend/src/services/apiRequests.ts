import { useState, useEffect } from 'react';
import { type Media, type Genre } from "../types";

export const BASE_URL = "http://localhost:5000/api";

export const getPopularMovies = async (): Promise<Media[]> => {
  const response = await fetch(`${BASE_URL}/movie/popular`);
  if (!response.ok) throw new Error("Failed to fetch movies");
  const data = await response.json();
  return data.results;
};

export const getPopularTVShow = async (): Promise<Media[]> => {
  const response = await fetch(`${BASE_URL}/tv/popular`);
  if (!response.ok) throw new Error("Failed to fetch TV");
  const data = await response.json();
  return data.results;
};

export const getDayTrending = async (): Promise<Media[]> => {
  const response = await fetch(
    `${BASE_URL}/trending/all/day`,
  );
  if (!response.ok) throw new Error("Failed to fetch trending");
  const data = await response.json();
  return data.results;
};

export const getCinemaDetails = async (id?: string): Promise<Media> => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if(!response.ok) throw new Error('Failed to fetch details');
  const data = await response.json();
  return data;
}

export const getGenreNames = async (mediaType?: string): Promise<Record<number, string>> => {
  const response = await fetch(
    `${BASE_URL}/genre/${mediaType}/list`,
  );
  if (!response.ok) throw new Error("Failed to fetch genre list");
  const data = await response.json();

  // Ensure data.genres exists and is an array
  if (!Array.isArray(data.genres)) {
    console.warn("Unexpected response format for genre list");
    return {};
  }

  // Type-safe reduce: maps id → name
  return data.genres.reduce((genreName: Record<number, string>, genre: Genre) => {
    genreName[genre.id] = genre.name;
    return genreName;
  }, {});
};;

// export const getCinemaDetails = async (
//   mediaType: "movie" | "tv",
//   id: string,
// ): Promise<Media> => {
//   const url =
//     mediaType === "movie"
//       ? `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
//       : `${BASE_URL}/tv/${id}?api_key=${API_KEY}`;

//   const response = await fetch(url);
//   if (!response.ok)
//     throw new Error(`Failed to fetch ${mediaType} with ID ${id}`);

//   const data = await response.json();
  
//   return data.results;
// };