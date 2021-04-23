import React, {ReactNode, useContext} from 'react';
import Image from 'next/image'
import Link from 'next/link'


import styles from './styles.module.scss';
import { PlayerContext } from '../../contexts/PlayerContext';

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

type latestEpisodesProps = {
  latestEpisodes : Episode[],
  allEpisodesList : Episode[],
  children?: ReactNode,
}

export const LatestEpisodes = ({ latestEpisodes, allEpisodesList }: latestEpisodesProps) => {
  const {playList} = useContext(PlayerContext)
  return (
    <section className={styles.lastEpisodesContainer}>
        <h2>Últimos lançamentos</h2>
        <ul>
          {latestEpisodes.map((ep, index) => (
            <li key={ep.id}>
              <Image
                className={styles.epThumbnail}
                width={192}
                height={192}
                src={ep.thumbnail} 
                alt="Thumbnail do podcast"
                objectFit="cover"
              />

              <div className={styles.episodeDetails}>
                <Link href={`/episode/${ep.id}`}>
                  <a>{ep.title}</a>
                </Link>

                <p>{ep.members}</p>

                <span>{ep.publishedAt}</span>
                <span> • </span>
                <span>{ep.file.durationAsString}</span>
              </div>

              <button type="button"><img src="/play-green.svg" onClick={() => playList(allEpisodesList, index)} alt="Ouvir o podcast"/></button>
            </li>)
          )}
        </ul>
      </section>
  );
}

