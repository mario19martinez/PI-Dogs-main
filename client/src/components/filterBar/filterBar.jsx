import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterAbc, filterCreatedDog, filterByWeight, getTemperaments, filterByTemperaments, getAllDogs } from "../../redux/actions";
import styles from '../filterBar/filterBar.module.css';

const FilterBar = ({setCurrentPage, setOrder}) => {
    const dispatch = useDispatch();
    // const [allDogs, setAllDogs] = useState('');
    // const [selectTemp, setSelectTemp] = useState("");

    const temperamentName = useSelector(state => { return state.temperaments })

    const handleClick = (e) => { //la función handleClick se utiliza para cargar
        //todos los perros disponibles y para restablecer el número de
        //página a 1 en una aplicación React que utiliza Redux.
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

    const handleTempFilter = (e) => {
        console.log(handleTempFilter)
        e.preventDefault()
        dispatch(filterByTemperaments(e.target.value))
        setCurrentPage(1)
    }
    //const filteredDogs = allDogs.filter((dog) => dog.temperaments === selectTemp)
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
            <h3>Dogs</h3>
            <select className={styles.temperamentStyle} onChange={e => handleFilterCreated(e)}>
                <option key={1} value="all">All </option>
                <option key={2} value="created">Dogs Created </option>
                <option key={3} value="api">Dogs of Api </option>
            </select>
            {/* <select className={styles.selectStyle} onChange={e => handleFilterCreated(e)}>
                <option key={1} value="all">All </option>
                <option key={2} value="created">Dogs Created </option>
                <option key={3} value="api">Dogs of Api </option>
            </select> */}
            </div>

            <div>
            <h3>Temperamentos</h3>
            <select className={styles.temperamentStyle} onChange={e => handleTempFilter(e)} >
                <option key={1} value='All Temperaments'>All </option>
                <option value="All Temperaments" key="All Temperaments"></option>
                {temperamentName && temperamentName?.map((el) => (
                    <option value={el.name} key={el.id}>{el.name}</option>
                ))}
                
                {/* {
                    temperamentName.map(e => {
                        return(
                            <option value={e.name} key={e.id}>{e.name}</option>
                        )
                    })
                } */}
            </select>
            </div>

            <div>
            <h3>Por peso</h3>
            <select className={styles.temperamentStyle} onChange={e => handleWeightFilter(e)}>
                <option key={1} value="all">All</option>
                <option key={2} value="min">Max a Min</option>
                <option key={3} value="max">Min a Max</option>
            </select>
            </div>

            <button className={styles.btn} onClick={e => { handleClick(e) }}>Rewoof</button>
        </div>
    )
}
export default FilterBar;