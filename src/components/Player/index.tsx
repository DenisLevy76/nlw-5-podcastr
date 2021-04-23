import Image from 'next/image';
import React, { useContext, useEffect, useRef } from 'react';
import { PlayerContext } from '../../contexts/PlayerContext';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import styles from './styles.module.scss';


export function Player(): JSX.Element {
  const audioRef = useRef<HTMLAudioElement>(null)

  const {currentEpisodeIndex,
    episodeList,
    isPlaying,
    togglePlay,
    setPlayingState,
    playNext,
    playPrevious
  } = useContext(PlayerContext);

  const currentEpisode = episodeList ? episodeList[currentEpisodeIndex] : null;

  useEffect(() => {
    if(audioRef.current){
      if(isPlaying){
        audioRef.current.play();
      }else{
        audioRef.current.pause();
      }
    }
  }, [isPlaying])

  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="headset estilizado"/>
        <strong>Tocando agora</strong>
      </header>

      {currentEpisode? (
        <div className={styles.currentEpisodeContainer}>
          <Image width={296} height={346} src={currentEpisode.thumbnail} alt="Thumbnail do episódio" objectFit="cover"/>
          <h2>{currentEpisode.title}</h2>
          <p>{currentEpisode.members}</p>

        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}


      <footer className={!currentEpisode? styles.empty : ''}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            {currentEpisode? (
              <Slider
                trackStyle={{ backgroundColor: '#04D361'}}
                railStyle={{backgroundColor: '#9F75FF'}}
                handleStyle={{borderColor: '#04D361', borderWidth: 4}}
              />
            ) : (
              <div className={styles.emptySlider} />

            )}
          </div>
          <span>00:00</span>
        </div>

        {currentEpisode && (
          <audio
            src={currentEpisode.file.url}
            ref={audioRef}
            autoPlay
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
          />
        )}

        <div className={styles.buttons}>
          <button type="button" disabled={!currentEpisode}><img src="/shuffle.svg" alt="Aleatório"/></button>
          <button type="button" disabled={!currentEpisode} onClick={playPrevious}><img src="/play-previous.svg" alt="Voltar"/></button>
          <button
            type="button"
            disabled={!currentEpisode}
            className={styles.playButton}
            onClick={togglePlay}
          >
            {isPlaying ? <img src="/pause.svg" alt="Play"/> : <img src="/play.svg" alt="Play"/>}
          </button>
          <button type="button" disabled={!currentEpisode} onClick={playNext}><img src="/play-next.svg" alt="Próximo"/></button>
          <button type="button" disabled={!currentEpisode}><img src="/repeat.svg" alt="Loop"/></button>
        </div>

      </footer>
    </div>
  )
}
