import React, {ReactNode, useContext} from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { Episode } from '../../pages/index'


import styles from './styles.module.scss';
import { PlayerContext } from '../../contexts/PlayerContext';

type allEpisodesProps = {
  allEpisodes : Episode[],
  children?: ReactNode,
}

export const AllEpisodes = ({allEpisodes}: allEpisodesProps) => {
  const {play} = useContext(PlayerContext)
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
          {allEpisodes.map(ep => {
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
                <button><img src="/play-green.svg" onClick={() => play(ep)} alt="Ouvir podcast"/></button>
              </td>
            </tr>)
          })}
        </tbody>
      </table>
    </section>
  );
}
