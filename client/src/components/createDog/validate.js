let validate = (input) => {

  let errors= {};
  let regexImg= /(http(s?):)([/|.|\w|\s|-])*.(?:jpg|gif|png|pnj)/;
  let regexName= /([0-9])+/;

  if(!input.name.trim()) {
      errors.name= "Por favor elige un nombre"
  } else if (input.name.length >40 || input.name.length <2) {
      errors.name= "Elija un nombre que tenga más de 1 carácter y menos de 20 caracteres"
  } else if (regexName.test(input.name.trim())) {
      errors.name= "No se permiten números"
  }

  if(!input.weightMin){
      errors.weightMin= "Por favor elige un peso mínimo"
  } else if (input.weightMin.trim() > 60 || input.weightMin.trim() < 1){
      errors.weightMin= "El peso mínimo no puede ser mayor al peso maximo ni menor a 1" 
  }

  if(!input.weightMax){
      errors.weightMax= "Por favor elige un peso máximo"
  } else if (input.weightMax.trim() > 61 || input.weightMax.trim() < 1){
      errors.weightMax= "El peso máximo no puede ser superior a 100 ni inferior al peso minimo" 
  } else if (input.weightMin >= input.weightMax){
      errors.weightMax= "El peso máximo no puede ser inferior o igual al peso mínimo"
  }

  if(!input.height){
    if(input.height < 0) return errors.height = 'debes poner una altura valida'
      errors.height= "Por favor elige una altura"
  } 

  if(!input.life_span){
      errors.life_span= "Elija una vida útil aproximada"
  } 


  if (!input.image.trim()) {
      errors.image= "Por favor inserta una Url valida para la imagen"
  } else if (!regexImg.test(input.image.trim())) {
      errors.image= "Por favor, inserte una url válida"
  }

  // if (!temperaments) {
  //     errors.temperaments= "Please choose at least one temperament"
  // }

  return errors
//     let errors = {};
//   if (!/^[ a-zA-Z]+$/.test(input.name)) {
//     errors.name =
//       "Este dato es incorrecto... Es obligatorio, no se permiten caracteres especiales, números o espacios";
//   }
// //   if (dogs?.some((e) => e.name.toUpperCase() === input.name.toUpperCase())) {
// //     errors.name = "Esta raza de perro ya existe!";
// //   }
//   if (!/^[0-9]+$/.test(input.height)) {
//     errors.height =
//       "Este dato es incorrecto... Es obligatorio, solo números decimales, positivos, sin caracteres especiales o LETRAS";
//   }
//   if (!/^[0-9]+$/.test(input.weight)) {
//     errors.weight =
//       "Este dato es incorrecto... Es obligatorio, solo números decimales, positivos, sin caracteres especiales o LETRAS";
//   }
//   if (!/^[ 0-9-]+$/.test(input.life_span)) {
//     errors.life_span =
//       "Este dato es incorrecto... No se permiten caracteres especiales o letras";
//   }
//   if (input.image.length > 255) {
//     errors.image = "la cantidad de caracter de la URL es demasiado larga";
//   }
//   return errors;
}

export default validate;