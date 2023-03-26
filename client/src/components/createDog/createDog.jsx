import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getTemperaments, postDog } from "../../redux/actions";
import validate from "./validate";
import styles from '../createDog/createDog.module.css'




const CreateDog = () => {
    const dispatch = useDispatch();
    let temper = useSelector((state) => state.temperaments)
    //console.log(temper)

    const [input, setInput] = useState({
        name: "",
        height: "",
        weight: "",
        life_span:"",
        // minWeight: "",
        // maxWeight: "",
        // minHeight: "",
        // maxHeight: "",
        // minLife_span: "",
        // maxLife_span: "",
        image: "",
        temperaments: []
    })

    const [errors,setErrors] = useState({});

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])
    //console.log(getTemperaments)

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    
    const handleChangeTemp = (e) => {
        e.preventDefault();

        if(input.temperaments.length === 0) setInput({ ...input, temperaments:[...input.temperaments, e.target.value]})
        else{
            if(input.temperaments.find(element => element === e.target.value)){

            }else{
                setInput({...input, temperaments: [...input.temperaments, e.target.value]})
            }
        }
    }

    const handleDelete = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            temperaments: input.temperaments.filter( temp => temp !== e.target.value)
        })
    };

    let id = 0;
    function addKey () {
        return id++
    }

    const val = () => {
        if(errors.life_span !== "" || errors.height !== "" || errors.image !== "" || errors.name !== "" || errors.weight !== ""){
            return false;
        }
        else if( input.name && input.image && input.minHeight && input.maxHeight && input.minWeight && input.maxWeight &&
            input.minLife_span && input.maxLife_span && input.temperaments){
                return true
            }else{
                return "empy"
            }
            
    }
    //console.log(val)

    const handleSubmit = (e) => {
        console.log(handleSubmit)
        e.preventDefault();
        if( val() === true ){
            dispatch(postDog(input));
            alert("Dog was created successfully");

            setInput({
                name: "",
                height: "",
                weight: "",
                life_span:"",
                // minHeight: "",
                // maxHeight: "",
                // minWeight: "",
                // maxWeight: "",
                // minLife_span: "",
                // maxLife_span: "",
                image: "",
                temperaments: [],
            })
            console.log(setInput)
        }
        else if(val() === "empty"){
            (alert("Must complete all the data required."));
        }
        else (alert("Please complete correctly."));
    }

    return(
        <div className={styles.containerForm}>
            <div className={styles.containerBtnHome}>
                <Link to={"/home"} >
                    <button className={styles.btnHome}>Home</button>
                </Link>
            </div>
          <form className={styles.divForm} id="dogForm" onSubmit={handleSubmit}>
            <div>
                <label>Name: </label>
                <input className={styles.inputStyle} autoComplete="off" name="name" value={input.name} onChange={handleChange} />
                {errors.name && (<p className="danger">{errors.name}</p>)}
            </div>
            <div>
            <h4>Weight (Kg)</h4>
                <label> Min: </label>
                <input autoComplete='off' className={styles.inputStyle} type="text" name='minWeight' value={input.minWeight} onChange={handleChange}  />
                <label> Max: </label>
                <input autoComplete='off' className={styles.inputStyle} type="text" name='maxWeight' value={input.maxWeight} onChange={handleChange} />
                {errors.weight && (<h6 className='danger'>{errors.weight}</h6>)}
            </div>
            <div>
            <h4>Height (cm) </h4>
                <label> Min:  </label>
                <input autoComplete='off' className={styles.inputStyle} type="text" name='minHeight' value={input.minHeight} onChange={handleChange} />
                <label> Max:  </label>
                <input autoComplete='off' className={styles.inputStyle} type="text" name='maxHeight' value={input.maxHeight} onChange={handleChange} />
                {errors.height && (<h6 className={styles.danger}>{errors.height}</h6>)}
            </div>
            <div>
            <h4>Life span (years) </h4>
                <label> Min: </label>
                <input autoComplete='off' className={styles.inputStyle} type='text' name='minLife_span' max='35' value={input.minLife_span} onChange={handleChange} />
                <label> Max: </label>
                <input autoComplete='off' className={styles.inputStyle} type='text' name='maxLife_span' max='35' value={input.maxLife_span} onChange={handleChange} />
                {errors.life_span && (<h6 className='danger'>{errors.life_span}</h6>)}
            </div>
            <div>
            <label>Image url: </label>
                <input autoComplete='off' className={styles.inputStyle} type='text' name='image' placeholder='Paste your image link...' value={input.image} onChange={(e) => handleChange(e)} />
                {errors.image && (<h6 className='danger'>{errors.image}</h6>)}
            </div>
            <div>
                <label>Temperamentos </label>
                <select onChange={handleChangeTemp} className={styles.tempSelect}>
                    {temper && temper.map((temper) => (
                        <option key={temper.id} value={temper.name}>{temper.name}</option>
                    ))}
                </select>
            </div>
            <div className={styles.temp}>
                {input.temperaments.map(e => (
                    <div className={styles.btnt} key={addKey()}>
                        <p>{e}</p>
                        <button className={styles.delete} onClick={handleDelete} value={e}>X</button>
                    </div>
                ))}
            </div>
            <div>
                <button className={styles.btn01} type="submit">Create Dog</button>
            </div>
          </form>
        </div>
    )
}

// const CreateDog = () => {
//     const dispatch = useDispatch();
//     const history = useHistory()
//     const allTemperaments = useSelector((state) => state.allTemperaments)
//     const [errors, setErrors] = useState({})

//     const [input, setInput] = useState({
//         name: "",
//         height: 0,
//         weight: 0,
//         life_span: 0,
//         image: "",
//         temperament: []
//     })

//     const handleChange = (e) => {
//         setInput({
//             ...input,
//             [e.target.name]: e.target.value,
//         })
//         console.log(e.target.value)
//         setErrors(validate({
//             ...input,
//             [e.target.name]: e.target.value
//         }))
//         console.log(input)
//     }

//     useEffect(() => {
//         dispatch(getTemperaments())
//     }, [dispatch])

//     const handleSelect = (e) => {
//         setInput({
//             ...input,
//             temperament : [...input.temperament, e.target.value]
//         })
//     }
    
//     const handleSubmit = (e) => {
//         e.preventDefault()
//         console.log(input)
//         dispatch(postDog(input))

//         alert('Perro creado con exito')
//         setInput({
//             name: "",
//             height: 0,
//             weight: 0,
//             life_span: 0,
//             temperament: []
//         })
//         history.push('/home')
//     }

//     const handleErase = (e) => {
//         setInput({
//             ...input,
//             temperament: input.temperament.filter(d => d !== e)
//         })
//     }

//     //Hacer un handle que los borre del estado

//     return(

//         <div className={styles.background}>
//             <Link to ="/home">
//                 <button className={styles.btn}>Volver</button>
//             </Link>
//             <h1>Crear Dog</h1>
        
//         <div className={styles.contenedor}>
//             <form className={styles.formStyle} onSubmit={e => handleSubmit(e)}>
        
//         <div>
//             <h3>Nombre:</h3>
//             <input className={styles.numInput} type="text" value={input.name} name="name" onChange={e => handleChange(e)}></input>
//         </div>

//         <div>
//             <h3>Altura</h3>
//             <input className={styles.numInput} type="number" value={input.height} name="height" onChange={e => handleChange(e)} />
//         </div>

//         <div>
//             <h3>Peso</h3>
//             <input className={styles.numInput} type="number" value={input.weight} name="weight" onChange={e => handleChange(e)} />
//         </div>

//         <div>
//             <h3>Tiempo de vida</h3>
//             <input className={styles.numInput} type="number" value={input.life_span} name="life_span" onChange={e => handleChange(e)} />
//         </div>

//         <div>
//             <label>Imagen</label>
//             <input className={styles.numInput} type="text" value={input.image} name="image" onChange={e => handleChange(e)} />
//         </div>
//             <h2>Temperamentos</h2>
//             <select className={styles.temperamentStyle} onChange={e => handleChange(e)}>
//                 <option value="all">prototemperament</option>
//                 {
//                     allTemperaments.map(e => {
//                         return(
//                             <option value={e.name} key={e.id}>{e.name}</option>
//                         )
//                     })
//                 }
//             </select>

//             {
//                 errors &&
//                 errors.name ||
//                 errors.height ||
//                 errors.weight ||
//                 errors.image ||
//                 errors.life_span ||
//                 errors.temperament ||
//                 !input.name.length ||
//                 input.height <= 0 ||
//                 input.weight <= 0 ||
//                 input.image ||
//                 input.life_span <=0 ||
//                 !input.temperament.length
//                 ?
//                 <h3>El perro no puede ser creado aun</h3>
//                 :
//                 <button className={styles.btn} type="submit">Crear Perro</button>
//             }
//             </form>

//                 <div className={styles.temperamentDiv}>
//                     {input.temperament.map((d, i) => {
//                         return(
//                             <div key={i++}>
//                         <h2>{d}</h2>
//                         <button className={styles.searchBtn} onClick={() => handleErase(d)}>X</button>
//                             </div>
//                         )
//                     })}
//                 </div>

//             <div className={styles.errorStyle}>
//             <h1>Errores :</h1>
//             <div>
//                 <div className={styles.errorStyle}>
//         <h2>{errors.name && (<p>{errors.name}</p>)}</h2>
//         <h2>{errors.height && (<p>{errors.height}</p>)}</h2>
//         <h2>{errors.weight && (<p>{errors.weight}</p>)}</h2>
//         <h2>{errors.life_span && (<p>{errors.life_span}</p>)}</h2>
//                     <h1>Esto debe quedar vacio par crear tu perro</h1>
//                 </div>
//             </div>
//             </div>
//         </div>
//         </div>
//     )
// }
export default CreateDog;