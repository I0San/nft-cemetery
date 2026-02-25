import styles from './index.module.css'
import useBodyClass from '../../hooks/useBodyClass'
import { Link } from "react-router-dom"
import { PageTransition } from '../../components/@layout/pageTransition'


export default function PageHome() {
  useBodyClass('home-bg')
  return (
    <PageTransition>
      <Link to="/funeral" className={styles.glowingCircle}></Link>
    </PageTransition>
  )
}
