import { Header } from '../components/Header'
import '../styles/global.scss'
import styles from '../styles/app.module.scss'
import { Player } from '../components/Player'
import { PlayerContextProvider } from '../contexts/PlayerContext'

export default function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
      <div className={styles.container}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContextProvider>
  )
}