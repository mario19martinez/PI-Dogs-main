let validate = (input) => {
    let errors = {};
  if (!/^[ a-zA-Z]+$/.test(input.name)) {
    errors.name =
      "Este dato es incorrecto... Es obligatorio, no se permiten caracteres especiales, números o espacios";
  }
//   if (dogs?.some((e) => e.name.toUpperCase() === input.name.toUpperCase())) {
//     errors.name = "Esta raza de perro ya existe!";
//   }
  if (!/^[0-9]+$/.test(input.height)) {
    errors.height =
      "Este dato es incorrecto... Es obligatorio, solo números decimales, positivos, sin caracteres especiales o LETRAS";
  }
  if (!/^[0-9]+$/.test(input.weight)) {
    errors.weight =
      "Este dato es incorrecto... Es obligatorio, solo números decimales, positivos, sin caracteres especiales o LETRAS";
  }
  if (!/^[ 0-9-]+$/.test(input.life_span)) {
    errors.life_span =
      "Este dato es incorrecto... No se permiten caracteres especiales o letras";
  }
  if (input.image.length > 255) {
    errors.image = "la cantidad de caracter de la URL es demasiado larga";
  }
  return errors;
}

export default validate;