
import { useSelector } from "react-redux";
import { Error, SongCard, Loader } from "../components";
import { useGetSongsBySearchQuery } from "../redux/Services/Spotify";
import { useParams } from "react-router-dom";

const Search = () => {

  const { searchTerm } = useParams();

  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);

  console.log(data, "search");

  const songs = data?.tracks?.hits?.map((song) => song.track);


  if (isFetching) return <Loader title="Loading Songs around you..." />;
  if (error) return <Error />;


  return (
    <div className="flex flex-col ">
      <h2 className="font-bold text-3xl
             text-white text-left mt-4 mb-10">
        Showing results for <span className="font-black">{searchTerm}</span>
      </h2>
      <div className="flex flex-wrap  justify-center gap-8">
        {songs.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={songs}
            i={i}
          />
        ))}
      </div>
    </div>
  )
}



export default Search;
