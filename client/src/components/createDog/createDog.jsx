import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getTemperaments, postDog } from "../../redux/actions";
import validate from "./validate";
import styles from '../createDog/createDog.module.css'




const CreateDog = () => {

    const dispatch = useDispatch();
    const temperaments = useSelector((state) => state.temperaments);
    console.log(temperaments);
    const dogs = useSelector((state) => state.allDogs);
  
    const history = useHistory();
    const [errors, setErrors] = useState({
      name: "",
      height: "",
      weight: "",
      life_span: "",
      image: "",
      temperament: [],
    });
  
    const [input, setInput] = useState({
      name: "",
      height: "",
      weight: "",
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
          dogs
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
  
    const handlerSubmit = (e) => {
      e.preventDefault();
      console.log(input);
      dispatch(postDog(input));
      alert("Raza creada con éxito! Se te redirigirá al inicio...");
      setInput({
        name: "",
        weight: "",
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
              <button className={styles.cta}>← Back</button>
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
                    onChange={(e) => handlerChange(e)}
                  ></input>
                  {errors.name && <p className={styles.errors}>{errors.name}</p>}
                  <br />
                  <label>Average Height (cm): </label>
                  <input
                    type="number"
                    value={input.height}
                    name="height"
                    onChange={(e) => handlerChange(e)}
                    disabled={!input.name || errors.name}
                  ></input>
                  {errors.height && !errors.name && (
                    <p className={styles.errors}>{errors.height}</p>
                  )}
                  <br />
                  <label>Average Weight (kg): </label>
                  <input
                    type="number"
                    value={input.weight}
                    name="weight"
                    onChange={(e) => handlerChange(e)}
                    disabled={!input.name || errors.height}
                  ></input>
                  {errors.weight && !errors.height && (
                    <p className={styles.errors}>{errors.weight}</p>
                  )}
                  <br />
                  <label>Years of Life: </label>
                  <input
                    type="text"
                    value={input.life_span}
                    name="life_span"
                    onChange={(e) => handlerChange(e)}
                    disabled={!input.name || errors.weight}
                  ></input>
                  {errors.life_span && !errors.weight && (
                    <p className={styles.errors}>{errors.life_span}</p>
                  )}
                  <br />
                  <label>Image: </label>
                  <input
                    type="text"
                    value={input.image}
                    name="image"
                    alt="for sell"
                    onChange={(e) => handlerChange(e)}
                    disabled={!input.name || errors.weight}
                  ></input>
                  {errors.image && !errors.weight && (
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
                    type="create"
                    className={styles.crear}
                    disabled={
                      !input.name || errors.name || errors.height || errors.weight
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