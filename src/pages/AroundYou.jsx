import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Error, SongCard, Loader } from "../components";
import { useGetSongsByCountryQuery } from "../redux/Services/Spotify";


const CountryTracks = () => {


    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState(true);
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data, isFetching, error } = useGetSongsByCountryQuery(country)

    const GEO_KEY = import.meta.env.VITE_GEO_API_KEY;
    console.log(GEO_KEY, "Geo key");



    let properties = {};
    let tracks = [];

    if (data) {
        properties = data?.properties || {};
        tracks = data?.tracks || [];
    }


    useEffect(() => {
        axios.get(`https://geo.ipify.org/api/v2/country?apiKey=${GEO_KEY}`).then((Response) => {
            setCountry(Response?.data?.location?.country)
        }).catch((err) => {
            console.log(err);
        }).finally(() => setLoading(false));
    }, [country])

    if (isFetching && loading) return <Loader title="Loading Songs around you..." />;
    if (error && country) return <Error />;


    return (
        <div className="flex flex-col ">
            <h2 className="font-bold text-3xl
             text-white text-left mt-4 mb-10">
                Around You
                <span className="font-black"> {country}
                </span>
            </h2>
            <div className="flex flex-wrap  justify-center gap-8">
                {tracks.map((song, i) => (
                    <SongCard
                        key={song.key}
                        song={song}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        data={tracks}
                        i={i}
                    />
                ))}
            </div>
        </div>
    )
}



export default CountryTracks;
