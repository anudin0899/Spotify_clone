import SongBar from './SongBar'


const RelatedSongs = ({ data, artistId, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => {

  console.log(data,"releated");
  

  return (
    <div className='flex flex-col'>
      <h1 className='font-bold text-3xl text-white'>Releated Songs</h1>

      <div className='mt-6 w-full flex flex-col'>
        {data?.map((song, i) => {
          return (
            <SongBar
              key={`${song.key}-${artistId}`}
              song={song}
              i={i}
              artistId={artistId}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={handlePlayClick}
            />
          )
        })}

      </div>
    </div>
  )
}


export default RelatedSongs;
