const validations = (newActivity) => {
    const errors = {};
    // i => no matter upper case or minus
    const regexName = /[a-zñüáéíóúøäåöß ,."'-]+/gi; 



    if (!newActivity.name) {
        errors.name = "The name is required";
    } else if (!regexName.test(newActivity.name)) {
        errors.name = "Invalid name. Only letters, commas, spaces, periods, quotes, and hyphens are allowed."
    } else if (newActivity.name.length > 30) {
        errors.name = "Name exceeds the maximum length of 30 characters."
    }

    if (!newActivity.difficulty) {
        errors.difficulty = "The difficulty is required";
    }

    if (!newActivity.duration) {
        errors.duration = "The duration is required";
    }

    if (!newActivity.season) {
        errors.season = "The season is required";
    }

    if (!newActivity.countries || newActivity.countries.length === 0) {
        errors.countries = "Please select at least one country before creating the activity."
    }


    return errors;
}

export default validations;