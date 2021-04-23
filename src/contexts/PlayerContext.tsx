import React, { createContext, useState } from 'react';

// import { Container } from './styles';

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
  hasPrevious: boolean;
  hasNext: boolean;
  isLooping: boolean;
  isShuffle: boolean;
  play: (episode: Episode) => void;
  playNext: () => void;
  playPrevious: () => void;
  playList:(list: Episode[], index: number) => void;
  togglePlay: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  setPlayingState: (state: boolean) => void;
}

export const PlayerContext = createContext({} as PlayerContextData);

export const PlayerContextProvider: React.FC = ({children}) => {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const hasPrevious = currentEpisodeIndex < episodeList.length - 1;
  const hasNext = currentEpisodeIndex > 0;

  function play(episode : Episode){
    setEpisodeList( () => [episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list : Episode[], index : number){
    setEpisodeList( () => list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function playNext(){    
    if (hasNext) {
      if (isShuffle){
        const nextRandomIndex = Math.floor(Math.random() * episodeList.length)
        setCurrentEpisodeIndex(nextRandomIndex)


      }else{
        setCurrentEpisodeIndex(currentEpisodeIndex - 1)
      }
    }
    
  }
  
  function playPrevious(){
    
    if (isShuffle){
      const nextRandomIndex = Math.floor(Math.random() * episodeList.length)
      setCurrentEpisodeIndex(nextRandomIndex)
      
    } 
    else if (hasPrevious){
      setCurrentEpisodeIndex(currentEpisodeIndex + 1)
    }
  }

  function togglePlay(){
    setIsPlaying(c => !c);
  }
  
  function toggleLoop(){
    setIsLooping(c => !c);
  }

  function toggleShuffle(){
    setIsShuffle(c => !c);

  }

  function setPlayingState(state:boolean) {
    setIsPlaying(state);
  }

  return (
    <PlayerContext.Provider value={{
      episodeList, 
      currentEpisodeIndex, 
      isPlaying,
      hasPrevious,
      hasNext,
      isLooping,
      isShuffle,
      playNext,
      playPrevious,
      play,
      playList,
      togglePlay,
      toggleLoop,
      toggleShuffle,
      setPlayingState
    }}>
      {children}
    </PlayerContext.Provider>
  )
}
