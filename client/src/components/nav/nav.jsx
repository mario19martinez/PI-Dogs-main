import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllDogs } from "../../redux/actions";
import SearchBar from "../searchBar/searchBar";
import styles from '../nav/nav.module.css'

const Nav = ({setCurrentPage}) => {

    const dispatch = useDispatch();
    const [errors, setErrors] = useState(null)

    const handleDogs = () => {
        dispatch(getAllDogs()
        )
        setCurrentPage(1)
    }

    useEffect(() => {
        dispatch(getAllDogs())
        .then(() => {
            setErrors(null);
        })
        .catch((err) => {
            console.log(err);
            setErrors('No se pudieron obtener todos los perros. Intente nuevamente mas tarde.')
        });
    }, [dispatch]);

    return(
        <div className={styles.navStyle}>
        
        <nav className={styles.navMenu}>
            <Link to="/home">
            <h1 onClick={(e) => handleDogs(e)}> Home </h1>
            </Link>

            <h1> <Link to="/dogs"> Crear Perro </Link> </h1>
        <SearchBar />
        </nav>
        {errors && <p className="error">{errors}</p>}
        </div>
    )
}
export default Nav;