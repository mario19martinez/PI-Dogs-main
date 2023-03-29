let validate = ({name, height, image, life_span, weightMax, weightMin}) => {

  let errors= {};
  let regexImg= /(http(s?):)([/|.|\w|\s|-])*.(?:jpg|gif|png|pnj)/;
  let regexName= /([0-9])+/;

  if(!name.trim()) {
      errors.name= "Please choose a name"
  } else if (name.length >40 || name.length <2) {
      errors.name= "Please choose a name which is longer than 1 character and shorter than 40 characters"
  } else if (regexName.test(name.trim())) {
      errors.name= "Numbers are not allowed"
  }

  if(!weightMin){
      errors.weightMin= "Please choose a minimun weight"
  } else if (weightMin.trim() > 100 || weightMin.trim() < 1){
      errors.weightMin= "Minimun weight can not be higher than 100 or lesser than 1" 
  }

  if(!weightMax){
      errors.weightMax= "Please choose a maximun weight"
  } else if (weightMax.trim() > 100 || weightMax.trim() < 1){
      errors.weightMax= "Maximun weight can not be higher than 100 or lesser than 1" 
  } else if (weightMin >= weightMax){
      errors.weightMax= "Maximun weight can not be inferior or equal than minimun weight"
  }

  if(!height){
      errors.height= "Please choose a maximun height and a maximun height"
  } 

  if(!life_span){
      errors.life_span= "Please choose an approximate life span"
  } 


  if (!image.trim()) {
      errors.image= "Please insert an image"
  } else if (!regexImg.test(image.trim())) {
      errors.image= "Please insert a valid file"
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