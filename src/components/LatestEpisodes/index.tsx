import React, {ReactNode, useContext} from 'react';
import Image from 'next/image'
import Link from 'next/link'


import styles from './styles.module.scss';
import { Episode } from '../../pages/index'
import { PlayerContext } from '../../contexts/PlayerContext';

type latestEpisodesProps = {
  latestEpisodes : Episode[],
  allEpisodes : Episode[],
  children?: ReactNode,
}

export const LatestEpisodes = ({ latestEpisodes, allEpisodes }: latestEpisodesProps): JSX.Element => {
  const {playAList} = useContext(PlayerContext)
  const allEpisodesList = [...latestEpisodes, ...allEpisodes]

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

              <button type="button"><img src="/play-green.svg" onClick={() => playAList(allEpisodesList, index)} alt="Ouvir o podcast"/></button>
            </li>)
          )}
        </ul>
      </section>
  );
}

