import React from "react";

export interface IEpisode {
  id: number
  image: any
  name: string
  season: number
  number: number
  [propName: string]: any
}

export interface IState {
  episodes: Array<IEpisode>,
  favorites: Array<IEpisode>
}
export interface IAction {
  type: string,
  payload: Array<IEpisode> | any
}

export interface IReducer {
  state: IState,
  dispatch: React.Dispatch<any>
}