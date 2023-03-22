import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getTemperaments, postDog } from "../../redux/actions";
import styles from '../createDog/createDog.module.css'

const validate = (input) => {
    const errors = {}
    if(!input.name){
        errors.name = 'Indica el nombre!!!'
    }
    if(!input.height || !input.height <= 0){
        errors.height = 'Indica un numero mayor!!!'
    }
    if(input.height){
        if(!/^[0-9]*$/){
            errors.height = 'Woof...estas poniendo letras, son solo numeros'
        }
    }
    if(!input.weight || !input.weight <= 0){
        errors.weight = 'Indica un numero mayor!!!'
    }
    if(input.weight){
        if(input.weight){
            if(!/^[0-9]*$/){
                errors.weight = 'Woof... no puedes poner letras'
            }
        }
    }
    if(!input.life_span || !input.life_span <= 0){
        errors.life_span = 'solo espero que nadie tenga ese tiempo de vida'
    }
    if(input.life_span){
        if(!/^[0-9]*$/){
            errors.life_span = 'No se puede poner letras'
        }
    }
    return errors;
}

const CreateDog = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const allTemperaments = useSelector((state) => state.allTemperaments)
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name: "",
        height: 0,
        weight: 0,
        life_span: 0,
        image: "",
        temperament: []
    })

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
        console.log(e.target.value)
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        console.log(input)
    }

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    const handleSelect = (e) => {
        setInput({
            ...input,
            temperament : [...input.temperament, e.target.value]
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(input)
        dispatch(postDog(input))

        alert('Perro creado con exito')
        setInput({
            name: "",
            height: 0,
            weight: 0,
            life_span: 0,
            temperament: []
        })
        history.push('/home')
    }

    const handleErase = (e) => {
        setInput({
            ...input,
            temperament: input.temperament.filter(d => d !== e)
        })
    }

    //Hacer un handle que los borre del estado

    return(

        <div className={styles.background}>
            <Link to ="/home">
                <button className={styles.btn}>Volver</button>
            </Link>
            <h1>Crear Dog</h1>
        
        <div className={styles.contenedor}>
            <form className={styles.formStyle} onSubmit={e => handleSubmit(e)}>
        
        <div>
            <h3>Nombre:</h3>
            <input className={styles.numInput} type="text" value={input.name} name="name" onChange={e => handleChange(e)}></input>
        </div>

        <div>
            <h3>Altura</h3>
            <input className={styles.numInput} type="number" value={input.height} name="height" onChange={e => handleChange(e)} />
        </div>

        <div>
            <h3>Peso</h3>
            <input className={styles.numInput} type="number" value={input.weight} name="weight" onChange={e => handleChange(e)} />
        </div>

        <div>
            <h3>Tiempo de vida</h3>
            <input className={styles.numInput} type="number" value={input.life_span} name="life_span" onChange={e => handleChange(e)} />
        </div>

        <div>
            <label>Imagen</label>
            <input className={styles.numInput} type="text" value={input.image} name="image" onChange={e => handleChange(e)} />
        </div>
            <h2>Temperamentos</h2>
            <select className={styles.temperamentStyle} onChange={e => handleChange(e)}>
                <option value="all">prototemperament</option>
                {
                    allTemperaments.map(e => {
                        return(
                            <option value={e.name} key={e.id}>{e.name}</option>
                        )
                    })
                }
            </select>

            {
                errors &&
                errors.name ||
                errors.height ||
                errors.weight ||
                errors.image ||
                errors.life_span ||
                errors.temperament ||
                !input.name.length ||
                input.height <= 0 ||
                input.weight <= 0 ||
                input.image ||
                input.life_span <=0 ||
                !input.temperament.length
                ?
                <h3>El perro no puede ser creado aun</h3>
                :
                <button className={styles.btn} type="submit">Crear Perro</button>
            }
            </form>

                <div className={styles.temperamentDiv}>
                    {input.temperament.map((d, i) => {
                        return(
                            <div key={i++}>
                        <h2>{d}</h2>
                        <button className={styles.searchBtn} onClick={() => handleErase(d)}>X</button>
                            </div>
                        )
                    })}
                </div>

            <div className={styles.errorStyle}>
            <h1>Errores :</h1>
            <div>
                <div className={styles.errorStyle}>
        <h2>{errors.name && (<p>{errors.name}</p>)}</h2>
        <h2>{errors.height && (<p>{errors.height}</p>)}</h2>
        <h2>{errors.weight && (<p>{errors.weight}</p>)}</h2>
        <h2>{errors.life_span && (<p>{errors.life_span}</p>)}</h2>
                    <h1>Esto debe quedar vacio par crear tu perro</h1>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}
export default CreateDog;