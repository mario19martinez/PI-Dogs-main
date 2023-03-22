import React from "react";
import styles from '../paginated/paginated.module.css'

export default function Paginated({currentDogs, allDogs, paginated}) {
    const pages = []

    for(let i = 1; i <= Math.ceil(allDogs/currentDogs); i++){
        pages.push(i)
    }

    return(
        <nav className={styles.back}>
        <ul>
            {pages?.map((n) => {
                return(
                    <li key={n} className={styles.list}>
                    <button key={n} onClick={() => paginated(n)}>{n}</button>
                    </li>
                )
            })}
        </ul>
        </nav>
    )
    
}