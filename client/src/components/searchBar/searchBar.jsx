import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogName } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import styles from'../searchBar/searchBar.module.css'

export default function SearchBar() {

    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const history = useHistory();
    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getDogName(name))
        setName("")
        history.push("/home")
    }

    return(
        <div>
            <form>
                <input className={styles.inputStyle} onChange={(e) => handleInputChange(e) } value={name} placeholder="Buscar guau guau"/>
                <button className={styles.searchBtn} onClick={e =>  handleSubmit(e)} type="submit">Buscar woof</button>
            </form>
        </div>
    )
}