import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { GetStaticProps } from "next";
import React from "react";
import { api } from "../services/api";
import styles from '../styles/pageStyles/index.module.scss'
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";
import {LatestEpisodes} from '../components/LatestEpisodes'
import {AllEpisodes} from '../components/AllEpisodes'

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

type HomeProps = {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
}

export default function Home(): JSX.Element {
  return (
    <div className={styles.homeContainer}>
      <LatestEpisodes/>
      <AllEpisodes />
    </div>
  )
}

// SSG - renderiza o HTML do lado do servidor next de forma estática e salva em cache e esse HTML é distribuido ao publico para que não haja uma nova
// requisição ao backend a cada novo acesso.
// export const getStaticProps: GetStaticProps = async() => {
//   const { data } = await api.get('episodes', {
//     params: {
//       _limit: 12,
//       _sort: 'published_at',
//       _order: 'desc'
//     }
//   })

//   const episodes: Episode[] = data.map((episode) => {
//     return {
//       id: episode.id,
//       title: episode.title,
//       members: episode.members,
//       publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {locale: ptBR}),
//       thumbnail: episode.thumbnail,
//       description: episode.description,
//       file: {
//         url: episode.file.url,
//         type: episode.file.type,
//         duration: Number(episode.file.duration),
//         durationAsString: convertDurationToTimeString(Number(episode.file.duration))
//       }
//     }
//   })

//   const latestEpisodes = episodes.slice(0, 2)
//   const allEpisodes = episodes.slice(2, episodes.length)


//   return {
//     props: {
//       latestEpisodes,
//       allEpisodes
//     },
//     revalidate: 60 * 60 * 12,
//   }
// }
