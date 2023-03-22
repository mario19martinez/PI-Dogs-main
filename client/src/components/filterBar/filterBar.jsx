import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterAbc, filterCreatedDog, filterByWeight, filterByTemperaments, getTemperaments, getAllDogs } from "../../redux/actions";
import styles from '../filterBar/filterBar.module.css';

const FilterBar = ({setCurrentPage, setOrder}) => {
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getAllDogs())
        setCurrentPage(1);
    }

    const handleAbcFilter = (e) => {
        e.preventDefault()
        dispatch(filterAbc(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
    }

    const handleFilterCreated = (e) => {
        dispatch(filterCreatedDog(e.target.value))
    }

    const handleWeightFilter = (e) => {
        e.preventDefault()
        dispatch(filterByWeight(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
    }
    
    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    const temperamentName = useSelector(state => { return state.allTemperaments })

    const handleTempFilter = (e) => {
        e.preventDefault()
        dispatch(filterByTemperaments(e.target.value))
        setCurrentPage(1)
    }
    return(
        <div className={styles.main_bar}>
            <div>
            <h3>Orden Alfabetico</h3>
            <select className={styles.temperamentStyle} onChange={e => handleAbcFilter(e)}>
                <option key={1} value="asc">Ascendente </option>
                <option key={2} value="desc">Descendente </option>
            </select>
            </div>

            <div>
            <h3>Creados</h3>
            <select className={styles.selectStyle} onChange={e => handleFilterCreated(e)}>
                <option key={1} value="all">All</option>
                <option key={2} value="created">Created</option>
                <option key={3} value="api">Api</option>
            </select>
            </div>

            <div>
            <h3>Temperamentos</h3>
            <select className={styles.selectStyle} onChange={e => handleTempFilter(e)}>
                <option key={ 1 + "e"} value="all">ProtoTemperament</option>
                {
                    temperamentName.map(e => {
                        return(
                            <option value={e.name} key={e.id}>{e.name}</option>
                        )
                    })
                }
            </select>
            </div>

            <div>
            <h3>Por peso</h3>
            <select className={styles.selectStyle} onChange={e => handleWeightFilter(e)}>
                <option key={1} value="all">All</option>
                <option key={2} value="min">Ligero a pesado</option>
                <option key={3} value="max">Pesado a ligero</option>
            </select>
            </div>

            <button className={styles.btn} onClick={e => { handleClick(e) }}>Rewoof</button>
        </div>
    )
}
export default FilterBar;