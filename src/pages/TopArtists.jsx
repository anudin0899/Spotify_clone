import { ArtistCard, Error, Loader } from "../components";
import { useGetNewReleasesQuery } from "../redux/Services/Spotify";

const TopArtists = () => {


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
                Top Artists
            </h2>
            <div className="flex flex-wrap  justify-center gap-8">
                {tracks.map((track) => (
                    <ArtistCard
                        key={track.key}
                        track={track}
                    />
                ))}
            </div>
        </div>
    )
}



export default TopArtists;
