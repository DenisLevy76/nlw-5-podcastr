import React, { useContext } from 'react'
import {useRouter} from 'next/router'
import { GetStaticProps, GetStaticPaths } from 'next';
import { api } from '../../services/api';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';
import styles from '../../styles/pageStyles/episode.module.scss'
import Image from 'next/image'
import Link from 'next/link'
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

type EpisodeProps = {
  episode: Episode
}

export default function Episode({ episode }: EpisodeProps) {
  const {play} = useContext(PlayerContext)
  return (
    <div className={styles.episodeContainer}>
      <div className={styles.thumbnailContainer}>
        <Link href="/">
          <button type="button">
            <img src="/arrow-left.svg" alt="Voltar"/>
          </button>
        </Link>

        <Image width={700} height={160} src={episode.thumbnail} objectFit="cover"/>

        <button type="button">
          <img src="/play.svg" onClick={() => play(episode)} alt="Ouvir episódio"/>
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span> • </span>
        <span>{episode.publishedAt}</span>
        <span> • </span>
        <span>{episode.file.durationAsString}</span>
      </header>

      <div className={styles.description} dangerouslySetInnerHTML={{__html: episode.description}}/>

    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 2,
      _sort: 'published_at',
      _order: 'desc'
    }
  })
  
  const paths = data.map(ep => {
    return {
      params: {
        slug: ep.id
      }
    }
  })


  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const {slug} = ctx.params
  const {data} = await api.get(`episodes/${slug}`)

  const episode = {
    id: data.id,
    title: data.title,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', {locale: ptBR}),
    thumbnail: data.thumbnail,
    description: data.description,
    file: {
      url: data.file.url,
      type: data.file.type,
      duration: Number(data.file.duration),
      durationAsString: convertDurationToTimeString(Number(data.file.duration))
    }
  }

  return { 
    props: {
      episode
    },
    revalidate: 60 * 60 * 6, //24 hours
  }
}