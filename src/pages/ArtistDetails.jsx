
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DetailsHeader, Loader, Error, RelatedSongs } from '../components'
import { useGetArtistsDetailsQuery } from "../redux/Services/Spotify";


const ArtistDetails = () => {

 
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  const { data, isFetching: isFetchingArtistsDetails, error } = useGetArtistsDetailsQuery(artistId)

  const artistData = data?.resources
  
  if (isFetchingArtistsDetails) {
    return (
      <Loader title='Loading Artists Details...' />
    )
  }

  if (error) return <Error />;




  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData} />

      <RelatedSongs
        data={Object.values(artistData?.songs)}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />

    </div>
  )
};

export default ArtistDetails;
