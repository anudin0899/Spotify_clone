import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DetailsHeader, Loader, Error, RelatedSongs } from '../components'
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetReleatedSongQuery, useGetSongDetailsQuery } from "../redux/Services/Spotify";


const SongDetails = () => {

    const dispatch = useDispatch();
    const { songid } = useParams();
    const { activeSong, isPlaying } = useSelector((state) => state.player)
    const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songid })
    const { data, isFetching: isFetchingReleatedSong, error } = useGetReleatedSongQuery({ songid })

    console.log(data,"data");
    
    let tracks = [];

    if (data) {
        tracks = data?.tracks || [];
    }

    console.log(tracks,"tracks");

    if (isFetchingSongDetails || isFetchingReleatedSong) {
        return (
            <Loader />
        )
    }

    if (error) return <Error />;

    const handlePauseClick = () => {
        dispatch(playPause(false));
    }

    const handlePlayClick = (song, i) => {
        dispatch(setActiveSong({ song, i, data }));
        dispatch(playPause(true));
    }



    return (
        <div className="flex flex-col">
            <DetailsHeader artistId="" songData={songData} />
            <div className="mb-10">
                <h2 className="text-white text-3xl font-bold">Lyrics : </h2>

                <div className="mt-5">
                    {songData?.sections[1].type === 'LYRICS' ?
                        songData?.sections[1].text.map((line, i) => (
                            <p className="text-gray-400 text-base my-1">{line}</p>
                        ))
                        : <p className="text-gray-400 text-base my-1" >Sorry,no lyrics found!</p>
                    }
                </div>
            </div>
            <RelatedSongs
                data={tracks}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
            />
        </div>
    )
};

export default SongDetails;
