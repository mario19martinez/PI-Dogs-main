import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getTemperaments, postDog } from "../../redux/actions";
import validate from "./validate";
import styles from '../createDog/createDog.module.css'
import axios from "axios";




const CreateDog = () => {

    const dispatch = useDispatch();
    const temperaments = useSelector((state) => state.temperaments); //estado global
    console.log(temperaments);
    const dogs = useSelector((state) => state.allDogs);
  
    const history = useHistory();
    const [errors, setErrors] = useState({
      name: "",
      height: "",
      weightMin: "",
      weightMax: "",
      life_span: "",
      image: "",
      temperament: [],
    });
  
    const [input, setInput] = useState({
      name: "",
      height: "",
      weightMin: "",
      weightMax: "",
      life_span: "",
      image: "",
      temperament: [],
    });
    console.log(input);
  
    useEffect(() => {
      dispatch(postDog());
      dispatch(getTemperaments());
    }, [dispatch]);
  
    const handlerChange = (e) => {
      setInput({
        ...input,
        [e.target.name]: e.target.value, //al 'name' de los input se los modifico con los 'value' que pase el usuario
      });
      setErrors(
        validate(
          {
            ...input,
            [e.target.name]: e.target.value,
          },
        )
      );
    };
  
    const handlerSelectTemp = (e) => {
      setInput({ ...input, temperament: [...input.temperament, e.target.value] });
    };
    function handleDelete(el) {
      setInput({
        ...input,
        temperament: input.temperament.filter((temp) => temp !== el),
      });
    }
  
    const handlerSubmit = async (e) => {
      e.preventDefault();
        await axios.post('http://localhost:3001/dogs', {
          name: input.name,
          image: input.image,
          weight: input.weightMin + ' - ' + input.weightMax,
          height: input.height,
          life_span: input.life_span,
          temperament: input.temperament,
        });
      //dispatch(postDog(input));
      alert("Raza creada con éxito! Se te redirigirá al inicio...");
      setInput({
        name: "",
        weightMin: "0",
        weightMax: "0",
        height: "",
        life_span: "",
        image: "",
        temperament: [],
      });
      history.push("/home"); //me manda al home
    };
  
    // const handleDelete = (e) => {
    //   setInput({
    //     ...input,
    //     temperament: input.temperament.filter((temp) => temp !== e), //deja todo lo que no sea el elemento clickeado apra eliminar
    //   });
    // };
  
    return (
      <>
        <div className={styles.container}>
          <div>
            <Link to="/home">
              <button className={styles.back}>← Back</button>
            </Link>
          </div>
          <div className={styles.divProd}>
            <div className={styles.form}>
              <h1>Crea una Raza</h1>
              <form onSubmit={(e) => handlerSubmit(e)}>
                <div>
                  <label>Name: </label>
                  <input
                    type="text"
                    name="name"
                    value={input.name}
                    placeholder={"Choose a name"}
                    onChange={(e) => handlerChange(e)}
                  ></input>
                  {errors.name && <p className={styles.errors}>{errors.name}</p>}
                  <br />
                  <label>Height (cm): </label>
                  <input
                    type="text"
                    value={input.height}
                    name="height"
                    placeholder={"For example: 25 - 45"}
                    onChange={(e) => handlerChange(e)}
                  ></input>
                  {errors.height && (
                    <p className={styles.errors}>{errors.height}</p>
                  )}
                  <br />
                  <label>Weight (kg): </label>
                  <br />
                  <label>Min: </label>
                  <input
                    type="text"
                    value={input.weightMin}
                    name="weightMin"
                    onChange={(e) => handlerChange(e)}
                  ></input>
                  {errors.weightMin && (
                    <p className={styles.errors}>{errors.weightMin}</p>
                  )}
                  <br />
                  <label>Max: </label>
                  <input
                    type="text"
                    value={input.weightMax}
                    name="weightMax"
                    onChange={(e) => handlerChange(e)}></input>
                    {errors.weightMax && (
                    <p className={styles.errors}>{errors.weightMax}</p>
                  )}
                  <br />
                  <label>Years of Life: </label>
                  <input
                    type="text"
                    value={input.life_span}
                    name="life_span"
                    onChange={(e) => handlerChange(e)}
                  ></input>
                  {errors.life_span && (
                    <p className={styles.errors}>{errors.life_span}</p>
                  )}
                  <br />
                  <label>Image: </label>
                  <input
                    type="text"
                    value={input.image}
                    name="image"
                    alt="for sell"
                    placeholder={"Add an image"}
                    onChange={(e) => handlerChange(e)}
                  ></input>
                  {errors.image && !errors.image && (
                    <p className={styles.errors}>{errors.image}</p>
                  )}
                  <br />
                  <label>Temperament: </label>
                  <select
                    onChange={(e) => handlerSelectTemp(e)}
                    name="temperament"
                  >
                    {temperaments?.map((temp) => (
                      <option value={temp.name} key={temp.name}>
                        {temp.name}
                      </option>
                    ))}
                  </select>
  
                  <h4>Selected Temperament:</h4>
                  {input.temperament.map((el) => (
                    <div key={el}>
                      <p className={styles.p}>*{el}*</p>
                      <button
                        className={styles.btn}
                        onClick={() => handleDelete(el)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
  
                  <button
                    type="submit"
                    className={styles.crear}
                    disabled={
                      !input.name || errors.name || errors.height || errors.weightMin || errors.weightMax
                    }
                  >
                    Crear raza!
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }

export default CreateDog;