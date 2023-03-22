import React from "react";
import { Link } from "react-router-dom";
import styles from '../dogCard/dogCard.module.css'

export default function Card({ id, name, image, temperament, weight, height}){
    return(
        <div className={styles.card}>
            <div className="cardImg" >
                <img src={ image ? image : image = "https://holavet.com.ar/wp-content/uploads/2023/01/27903969-ilustracion-de-dibujos-animados-funny-dogs-caracteres-grupo-1.webp"} alt="woof" width="200" height="250" />
            </div>

            <div className={styles.cardInfo}>
                <div className={styles.titleStyle}>
                    <Link to={`/home/${id}`}>
                        <h1>{name}</h1>
                    </Link>
                </div>
                <h2>{temperament}</h2>
                <h2>Peso minimo/ peso maximo: {weight}</h2>
            </div>
        </div>
    )
}