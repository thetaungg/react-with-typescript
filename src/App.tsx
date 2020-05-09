import React, {useContext, useEffect, useState} from 'react';
import {Store} from "./store/store";
import {IEpisode} from "./interfaces";
import EpisodeCard from "./components/episode-card/episode-card";

function App(): JSX.Element{
  const {state, dispatch} = useContext(Store)
  const [route, setRoute] = useState('home')

  useEffect(() => {
    state.episodes.length === 0 && fetchData('https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes')
  })

  const fetchData = async (URL: string) => {
    const data = await fetch(URL);
    const dataJSON = await data.json();

    return dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON._embedded.episodes
    })
  }
  const toggleFav = (episode: IEpisode): void => {
    if(state.favorites.includes(episode) ) {
      dispatch({type: 'REMOVE_FAV', payload: episode.id})
    } else {
      dispatch({type: 'ADD_FAV', payload: episode})
    }
  }

  console.log(state)

  return (
    <div className="App">
      <header style={{display: 'flex', justifyContent: 'space-around', fontSize: '1.6rem', padding: '2rem 0', backgroundColor: '#eee'}}>
        <h1 style={{fontSize: "inherit"}}>Rick and Morty!</h1>
        <h5 style={{fontSize: "inherit"}}>Pick your favorite episode!!</h5>
        <span style={{display: 'flex'}}>
          <span onClick={() => setRoute('home')} style={{fontSize: '1.4rem', color: 'blue', cursor: 'pointer', marginRight: '2rem'}}>Home</span>
          <span onClick={() => setRoute('fav')} style={{fontSize: '1.4rem', color: 'blue', cursor: 'pointer'}}>Favorites ({state.favorites.length})</span>
        </span>
      </header>

      <div style={{display: "grid", rowGap: '2rem',columnGap: '2rem', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: '2rem 4rem'}}>

        {
          (route === 'home' ? state.episodes.length !== 0 : state.favorites.length) ?
            ( route === 'home' ?
              state.episodes.map((episode: IEpisode) => (
                <EpisodeCard key={episode.id} favorites={state.favorites} toggleFav={toggleFav} episode={episode}/>
                )) :
              state.favorites.map((episode: IEpisode) => (
                <EpisodeCard key={episode.id} favorites={state.favorites} toggleFav={toggleFav} episode={episode}/>
                ))
            ): <h5 style={{fontSize: '3rem'}}>Nothing to display</h5>
        }
      </div>
    </div>
  );
}

export default React.memo(App);
