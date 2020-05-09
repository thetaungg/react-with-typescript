import React, {useReducer} from 'react'
import {IState, IAction, IReducer, IEpisode} from "../interfaces";

const initialState: IState = {
  episodes: [],
  favorites: []
}

function dispatchGeneric<T>(data: T) {
  return data;
}

export const Store = React.createContext<IReducer>({state: initialState, dispatch: dispatchGeneric})

function reducer(state: IState, action: IAction): IState {
  switch (action.type) {

    case 'FETCH_DATA':
      return {...state, episodes: action.payload}
    case 'ADD_FAV':
      return {...state, favorites: [...state.favorites, action.payload]}
    case 'REMOVE_FAV':
      const newFav: Array<IEpisode> = state.favorites.filter(fav => fav.id !== action.payload)
      return {...state, favorites: [...newFav]}
    default:
      return state
  }
}

export function StoreProvider({children}: JSX.ElementChildrenAttribute): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Store.Provider value={{state, dispatch}}>{children}</Store.Provider>
}