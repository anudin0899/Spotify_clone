import { useDispatch, useSelector } from "react-redux";

import { Error, Loader, SongCard } from "../components";
import { genres } from '../assets/constants';
import { useGetNewReleasesQuery } from '../redux/Services/Spotify'
import { selectGenreListId } from "../redux/features/playerSlice";

const Discover = () => {

    const dispatch = useDispatch();
    const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player);

    const { data, isFetching, error } = useGetNewReleasesQuery()

    const genreTitle = 'pop'

    if (isFetching) {
        return <Loader title="Loading Songs..." />;
    }

    if (error) {
        return <Error />;
    }

    let properties = {};
    let tracks = [];

    if (data) {
        properties = data?.properties || {};
        tracks = data?.tracks || [];
    }



    return (
        <div className="flex flex-col ">
            <div className="w-full  flex justify-between items-center 
            sm:flex-row flex-col mt-4 mb-10 ">
                <h2 className="font-bold text-3xl text-white text-left ">Discover {genreTitle}</h2>
                <select
                    onChange={(e) => dispatch(selectGenreListId(e.target.value))}
                    value={genreListId || 'pop'}
                    className="bg-black text-gray-300 p-3 text-sm rounded-lg
                 outline-none sm:mt-0 mt-5 "
                >
                    {genres.map((genres) => <option key={genres.value} value={genres.value}>{genres.title}</option>)}
                </select>
            </div>
            <div className="flex flex-wrap justify-center gap-8 ">
                {tracks?.map((song, i) => {
                    return (
                        <SongCard
                            key={song.key}
                            song={song}
                            i={i}
                            activeSong={activeSong}
                            isPlaying={isPlaying}
                            data={data}
                        />
                    )
                })}
            </div>
        </div>

    )
}
export default Discover;
