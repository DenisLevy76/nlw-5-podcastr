import React, {ReactNode, useContext} from 'react';
import Image from 'next/image'
import Link from 'next/link'


import styles from './styles.module.scss';
import { Episode } from '../../pages/index'
import { PlayerContext } from '../../contexts/PlayerContext';

type latestEpisodesProps = {
  latestEpisodes : Episode[],
  children?: ReactNode,
}

export const LatestEpisodes = ({ latestEpisodes }: latestEpisodesProps) => {
  const {play} = useContext(PlayerContext)
  return (
    <section className={styles.lastEpisodesContainer}>
        <h2>Últimos lançamentos</h2>
        <ul>
          {latestEpisodes.map((ep) => (
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

              <button type="button"><img src="/play-green.svg" onClick={() => play(ep)} alt="Ouvir o podcast"/></button>
            </li>)
          )}
        </ul>
      </section>
  );
}

