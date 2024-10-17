import React from 'react'
import styles from "./style.module.scss"


const HeaderDennis = () => {
  return (
      <div className={styles.header}>
        <div className={styles.logo}>

          <div className={styles.copyright}>©</div>

          <div className={styles.name}>
            <p className={styles.codeBy}>Code by</p>
            <p className={styles.firstName}>John</p>
            <p className={styles.lastName}>Smith</p>
          </div>
        </div>

        <div className={styles.nav}>
            
            <div className={styles.el}>
              <p>About</p>
              <div className={styles.indicator}></div>
            </div>

            <div className={styles.el}>
              <p>Albums</p>
              <div className={styles.indicator}></div>
            </div>

            <div className={styles.el}>
              <p>Concerts</p>
              <div className={styles.indicator}></div>
            </div>
        </div>

      </div>
  )
}

export default HeaderDennis