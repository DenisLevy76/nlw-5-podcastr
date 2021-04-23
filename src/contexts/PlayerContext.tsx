import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GetStaticProps } from 'next';
import React, { createContext, ReactNode, useState } from 'react';
import { api } from '../services/api';
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';

export type Episode = {
  id: string;
  title: string;
  members:string;
  publishedAt: string;
  thumbnail: string;
  description: string;
  file: {
    url: string;
    type: string;
    duration: number;
    durationAsString: string;
  }
};

interface PlayerContextData {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
  allEpisodesList: Episode[];
  play: (episode: Episode) => void;
  playAList: (list: Episode[], index: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  togglePlay: () => void;
  setPlayingState: (state: boolean) => void;
}

interface PlayerContextProviderProps{
  children: ReactNode;
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
}


export const PlayerContext = createContext({} as PlayerContextData);

export const PlayerContextProvider: React.FC = ({children, latestEpisodes, allEpisodes}: PlayerContextProviderProps) => {

  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false)
  const allEpisodesList = [...latestEpisodes, ...allEpisodes]


  function play(episode : Episode){
    setEpisodeList( () => [episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playAList(list: Episode[], index: number): void{
    setEpisodeList( () => list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function playNext(){
    if (currentEpisodeIndex < episodeList.length) {
      setCurrentEpisodeIndex(c => c - 1)
    }
  }

  function playPrevious(){
    if(currentEpisodeIndex > 0){
      setCurrentEpisodeIndex(c => c + 1)
    }
  }

  function togglePlay(){
    setIsPlaying(c => !c)
  }

  function setPlayingState(state:boolean) {
    setIsPlaying(state);
  }

  return (
    <PlayerContext.Provider value={{
      episodeList,
      currentEpisodeIndex,
      isPlaying,
      latestEpisodes,
      allEpisodes,
      allEpisodesList,
      play,
      playNext,
      playPrevious,
      togglePlay,
      setPlayingState,
      playAList
    }}>
      {children}
    </PlayerContext.Provider>
  )
}

export const getStaticProps: GetStaticProps = async() => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const episodes: Episode[] = data.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {locale: ptBR}),
      thumbnail: episode.thumbnail,
      description: episode.description,
      file: {
        url: episode.file.url,
        type: episode.file.type,
        duration: Number(episode.file.duration),
        durationAsString: convertDurationToTimeString(Number(episode.file.duration))
      }
    }
  })

  const latestEpisodes = episodes.slice(0, 2)
  const allEpisodes = episodes.slice(2, episodes.length)


  return {
    props: {
      latestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 12,
  }
}
