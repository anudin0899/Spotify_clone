import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const API_KEY = import.meta.env.VITE_SPOTIFY_CLONE_RAPID_API_KEY;



export const SpotifyApi = createApi({
    reducerPath: 'SpotifyApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam.p.rapidapi.com',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', API_KEY);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getNewReleases: builder.query({ query: () => '/charts/track?country=in' }),

        getSongDetails: builder.query({ query: ({ songid }) => `/songs/get-details?key=${songid}` }),
        getReleatedSong: builder.query({ query: ({ songid }) => `/songs/list-recommendations?key=${songid}` }),
        getArtistsDetails: builder.query({ query: (artistId) => `/artists/get-summary?id=${artistId}` }),
        getSongsByCountry: builder.query({ query: (countryCode) => `/charts/track?country=${countryCode}` }),
        getSongsBySearch: builder.query({ query: (searchTerm) => `/search?term=${searchTerm}` })

    }),
})


export const {
    useGetNewReleasesQuery,
    useGetSongDetailsQuery,
    useGetReleatedSongQuery,
    useGetArtistsDetailsQuery,
    useGetSongsByCountryQuery,
    useGetSongsBySearchQuery,
} = SpotifyApi;