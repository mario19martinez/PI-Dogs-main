import React from "react";
import { Link } from "react-router-dom";
import styles from '../landingPage/landingPage.module.css'

const landingPage = () => {
    return(

        <div className={styles.back_image} >
            <div className={ styles.divStyle} >
            <Link to="/home">
                <button className={styles.boton}> WOOF WOOF </button>
            </Link>
            </div>
            <div>
                <h1 className={styles.texto}>Mi Landing Page</h1>
                <p>Bienvenidos a mi pagina de Dogs, espero que sea de su agrado</p>
                <p className={styles.anuncio}>Henry Bootcamp</p>
            </div>
        </div>
    )
}
export default landingPage