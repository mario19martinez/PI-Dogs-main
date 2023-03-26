let validate = (value) => {
    let errors = {}
    if(value.name){
        if(!/^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/.test(value.name)){
            errors.name = 'Name cannot contain numbers or special characters.';
            console.log(errors)
        }
        else errors.name = '';
    }
    else errors.name = 'Name is required.';

    if(parseInt(value.minWeight) && parseInt(value.maxWeight)){
        if(parseInt(value.minWeight) <= 0 || parseInt(value.maxWeight) <= 0){
            errors.weight= 'Weight cannot be negative or zero.'
        }
        else if(parseInt(value.minWeight) > parseInt(value.maxWeight)){
            errors.weight= 'Minimum weight cannot be greater than maximum weight.'
        }
        else errors.weight = '';
    }
    else errors.weight = 'Weight is required.';

    if(parseInt(value.minHeight) && parseInt(value.maxHeight)){
        if(parseInt(value.minHeight) <= 0 || parseInt(value.maxHeight) <= 0){
            errors.height= 'Height cannot be negative or zero.'
        }
        else if(parseInt(value.minHeight) > parseInt(value.maxHeight)){
            errors.height= 'Minimum height cannot be greater than maximum height.'
        }
        else errors.height = '';
    }
    else errors.height = 'Height is required.';

    if(parseInt(value.minLife_span) && parseInt(value.maxLife_span)){
        if(parseInt(value.minLife_span) <= 0 || parseInt(value.maxLife_span) <= 0){
            errors.life_span= 'Age cannot be negative or zero.'
        }
        else if(parseInt(value.minLife_span) > parseInt(value.maxLife_span)){
            errors.life_span= 'Minimum age cannot be greater than maximum age.'
        }
        else errors.life_span = '';
    }
    else errors.life_span = 'Age is required.';

    if(/^(ftp|http|https):\/\/[^ "]+$/.test(value.image)){
        errors.image = '';
    }else errors.image = 'Must have a valid link image.'

    return errors;
}

export default validate;