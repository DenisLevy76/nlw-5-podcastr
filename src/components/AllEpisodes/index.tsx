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

type allEpisodesProps = {
  allEpisodes : Episode[],
  latestEpisodes : Episode[],
  allEpisodesList : Episode[],
  children?: ReactNode,
}

export const AllEpisodes = ({allEpisodes, latestEpisodes, allEpisodesList}: allEpisodesProps) => {
  const {playList} = useContext(PlayerContext)
  return (
    <section className={styles.allEpisodesContainer}>
      <h2>Todos os episódios</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Podcast</th>
            <th>Integrantes</th>
            <th>Data</th>
            <th>Duração</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allEpisodes.map((ep, index) => {
            return (<tr key={ep.id}>
              <td>
                <Image 
                  width={120} 
                  height={120} 
                  src={ep.thumbnail} 
                  alt={ep.title}
                  objectFit='cover'
                />
              </td>
              <td>
                <Link href={`/episode/${ep.id}`}>
                  <a>{ep.title}</a>
                </Link>
              </td>
              <td>
                <p>{ep.members}</p>
              </td>
              <td>
                <p style={{width: '6rem'}}>{ep.publishedAt}</p>
              </td>
              <td>
                <p>{ep.file.durationAsString}</p>
              </td>
              <td>
                <button><img src="/play-green.svg" onClick={() => playList(allEpisodesList, index + latestEpisodes.length)} alt="Ouvir podcast"/></button>
              </td>
            </tr>)
          })}
        </tbody>
      </table>
    </section>
  );
}
