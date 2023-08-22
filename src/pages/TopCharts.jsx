
import { useSelector } from "react-redux";
import { Error, SongCard, Loader } from "../components";
import { useGetNewReleasesQuery } from "../redux/Services/Spotify";

const TopCharts = () => {


    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data, isFetching, error } = useGetNewReleasesQuery();



    let properties = {};
    let tracks = [];

    if (data) {
        properties = data?.properties || {};
        tracks = data?.tracks || [];
    }


    if (isFetching) return <Loader title="Loading Songs around you..." />;
    if (error) return <Error />;


    return (
        <div className="flex flex-col ">
            <h2 className="font-bold text-3xl
             text-white text-left mt-4 mb-10">
                Discover top charts
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



export default TopCharts;
