import React from 'react';
import {IEpisode} from "../../interfaces";

interface IEpisodeCardProps {
  episode: IEpisode,
  toggleFav: (episode: IEpisode) => void,
  favorites: IEpisode[]
}

const EpisodeCard = ({episode, toggleFav, favorites}: IEpisodeCardProps): JSX.Element => (
  <div style={{display: "flex", flexDirection: "column"}}>

    {
      episode.image ? <img src={episode.image.medium} alt={`Rick & Morty ${episode.name}`}/> : 'loading . . .'
    }

    <div style={{display: "flex", flexDirection: "column"}}>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <span style={{fontSize: '1.4rem'}}>{episode.name}</span>
        <span style={{fontSize: '1.4rem'}}>Season: {episode.season} Episode: {episode.number}</span>
      </div>
      <button onClick={() => toggleFav(episode)} style={{fontSize: '1.4rem', alignSelf: 'flex-start', padding: '.3rem 1.5rem'}}>
        {
          favorites.find((epi: IEpisode) => epi.id === episode.id) ? 'UnFav' : 'Fav'
        }
      </button>
    </div>
  </div>
)

export default EpisodeCard;
