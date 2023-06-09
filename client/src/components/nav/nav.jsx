import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllDogs } from "../../redux/actions";
import SearchBar from "../searchBar/searchBar";
import styles from '../nav/nav.module.css'

const Nav = ({setCurrentPage}) => {

    const dispatch = useDispatch();

    const handleDogs = () => {
        dispatch(getAllDogs()
        )
        setCurrentPage(1)
    }

    useEffect(() => {
        dispatch(getAllDogs())
    }, [dispatch])

    return(
        <div className={styles.navStyle}>
        
        <nav className={styles.navMenu}>
            <Link to="/home">
            <h1 onClick={(e) => handleDogs(e)}> Home </h1>
            </Link>

            <h1> <Link to="/dogs"> Crear Perro </Link> </h1>
        <SearchBar />
        </nav>
        </div>
    )
}
export default Nav;