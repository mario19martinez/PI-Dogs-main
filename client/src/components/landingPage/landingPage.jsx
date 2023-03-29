import React from "react";
import { Link } from "react-router-dom";
import styles from '../landingPage/landingPage.module.css'

const landingPage = () => {
    return(

        <div className={styles.back_image} >
            <div className={ styles.divStyle} >
            <Link to="/home">
                <button className={styles.boton}> let's go </button>
            </Link>
            </div>
            <div className={styles.texto}>
                <h1 >Mi Landing Page</h1>
                <p className={styles.message}>Bienvenidos a mi pagina de Dogs, espero que sea de su agrado.</p>
            </div>
        </div>
    )
}
export default landingPage