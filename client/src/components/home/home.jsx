import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs, getTemperaments } from "../../redux/actions";
import Card from "../dogCard/dogCard";
import FilterBar from "../filterBar/filterBar";
import Paginated from "../paginated/paginated";
import Nav from "../nav/nav";
import styles from '../home/home.module.css';

const Home = () => {
    const dispatch = useDispatch();
    //con useSelector traeme todo lo que esta en el estado global de dogs
    const allDogs = useSelector((state) => state.dogs)
    //----Estados locales
    const [currentPage, setCurrentPage] = useState(1)
    const [currentDogs, setCurrentDogs] = useState(8)
    const lastI = currentPage * currentDogs
    const firstI = lastI - currentDogs
    const pagedDogs = allDogs.slice(firstI, lastI)

    const[order, setOrder] = useState(' ');
    const paginated = (pageN) => {
        setCurrentPage(pageN)
    }
    useEffect(() => {
        dispatch(getAllDogs())
    }, [dispatch])


    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])


    return (
        <div className={styles.background}>
        <Nav setCurrentPage={setCurrentPage}/>

        <FilterBar setCurrentPage={setCurrentPage} setOrder={setOrder} />

        <Paginated setCurrentPage={setCurrentPage} currentPage={currentPage} currentDogs={currentDogs} allDogs={allDogs.length} paginated={paginated} />

            <div className={styles.container}>
                { pagedDogs.length? 
                pagedDogs.map(e => {
                    return(
                        <div key={e.id+'div'}>
                            <Card name={e.name} image={ e.image} temperament={!e.createdInDb ? e.temperament : e.Temperaments.map(d => d.name + " ")} id={e.id} height={e.height} weight={e.weight} key={e.id} />

                        </div>
                    )
                }) :
                <><div className={styles.cargar}> <h1> Cargando...</h1> </div><div className={styles.loader}></div></>
                }
            </div>
        </div>
    )
    
}
export default Home;