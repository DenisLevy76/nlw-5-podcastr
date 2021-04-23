import React, { createContext, ReactNode, useState } from 'react';

interface Episode {
  title: string;
  members: string;
  thumbnail: string;
  file: {
    url: string;
    duration: number;
  }
}

interface PlayerContextData {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  play: (episode: Episode) => void;
  playAList: (list: Episode[], index: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  togglePlay: () => void;
  setPlayingState: (state: boolean) => void;
}

interface PlayerContextProviderProps{
  children: ReactNode
}

export const PlayerContext = createContext({} as PlayerContextData);

export const PlayerContextProvider: React.FC = ({children}: PlayerContextProviderProps) => {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false)

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
