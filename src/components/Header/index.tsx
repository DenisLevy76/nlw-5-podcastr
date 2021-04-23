import React from 'react';
import Link from 'next/link'

import {format} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import styles from './styles.module.scss';

export function Header(): JSX.Element {
  const currentDate = format(new Date(), 'EEEEEE, d MMM', {
    locale: ptBR
  })
  return (
    <header className={styles.headerContainer}>
      <Link href="/">
        <a>
          <img src="/logo.svg" alt="logo podcastr"/>
        </a>
      </Link>

      <p>O melhor para você</p>

      <span>{currentDate}</span>
    </header>
  );
}
