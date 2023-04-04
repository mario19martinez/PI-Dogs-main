import React from "react";
import { getDog, clearDetail } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../nav/nav";
import styles from '../dogDetail/dogDetail.module.css'

const DogDetail = () => {

    const dispatch = useDispatch();
    const dog = useSelector((state) => state.dogDetail)
    const {id} = useParams();
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        dispatch(getDog(id))
        return dispatch(clearDetail())
    }, [dispatch, id])

    return(
        <div className={styles.background}>
            <Nav setCurrentPage={setCurrentPage}/>
            <Link to="/home">
                <button className={styles.btn}>Volver</button>
            </Link>
            {Object.keys(dog).length ?
            <div className={styles.general}>
                <img src={dog.image ? dog.image : dog.image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWuj7_Yp_STbTtvooO1tCTmQBj1CkT7a62tZ21Pv3bW_5AgQzU7BZPeGcv2ijxj-IkO5w&usqp=CAU"} alt="woof" width="500" height="500" />
            <div className={styles.dogdetail}>

            <h1>Nombre de la raza: {dog.name}</h1>
            <h2>Años de vida: {dog.life_span}</h2>
            <h2>Peso Minimo: {dog.weight}</h2>
            <h2>Altura: {dog.height}</h2>
            <div>
            <h2>Temperamentos:</h2>
            <h3>{!dog.createInDb
                ? dog.temperament + ", "
                : dog.temperaments.map((el) => el.name + ", ")}</h3>
            </div>
            </div>
            </div>
                    : <div><h1>Cragando...</h1></div> }
        </div>
    )
}
export default DogDetail;