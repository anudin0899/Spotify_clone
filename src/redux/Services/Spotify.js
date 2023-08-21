import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const SpotifyApi = createApi({
    reducerPath: 'SpotifyApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam.p.rapidapi.com',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', '2ca56c79cemshfc10f7f4f7d53d5p1e8f0fjsn3bdf2a72f247');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getNewReleases: builder.query({ query: () => '/charts/track?country=in' }),
        getPlaylist: builder.query({ query: () => '/spotify_playlist/?url=https%3A%2F%2Fopen.spotify.com%2Fplaylist%2F3nS8d7ekVjFLM4jVyqbDGY' }),
        getSongDetails: builder.query({ query: ({ songid }) => `/songs/get-details?key=${songid}` }),
        getReleatedSong:builder.query({query:({songid})=>`/songs/list-recommendations?key=${songid}`}),
        getArtistsDetails:builder.query({query:(artistId)=>`/artists/get-summary?id=${artistId}`}),



    }),
})


export const {
    useGetNewReleasesQuery, useGetPlaylistQuery,useGetSongDetailsQuery,useGetReleatedSongQuery,useGetArtistsDetailsQuery,
} = SpotifyApi;