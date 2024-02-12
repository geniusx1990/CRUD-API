export function checkData(username, age, hobbies) {
    if (username === undefined ||
        age === undefined ||
        hobbies === undefined ||
        typeof username !== 'string' ||
        typeof age !== 'number' ||
        username.trim() === '' ||
        !Number.isInteger(age) ||
        !Array.isArray(hobbies) ||
        age < 0 ||
        hobbies.some(hobby => typeof hobby !== 'string' || hobby.trim() === '' || Number(hobby))) {
        return false
    }
    return true
}

