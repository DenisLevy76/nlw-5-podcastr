import React, { createContext, useState } from 'react';

// import { Container } from './styles';

interface Episode {
  title: string;
  members: string;
  thumbnail: string;
  file: {
    url: string;
    duration: number;
  }
}

interface PlayerContexData {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  play: (episode: Episode) => void;
  togglePlay: () => void;
  setPlayingState: (state: boolean) => void;
}

export const PlayerContext = createContext({} as PlayerContexData);

export const PlayerContextProvider: React.FC = ({children}) => {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false)

  function play(episode : Episode){
    setEpisodeList( () => [episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
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
      togglePlay,
      setPlayingState
    }}>
      {children}
    </PlayerContext.Provider>
  )
}