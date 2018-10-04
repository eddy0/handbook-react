interface Person {
    firstName: string
    lastName: string
}

function greeter(person: Person) {
    return 'hello' + person.firstName + person.lastName
}

let user = {
    firstName: 'e',
    lastName: 'doo'
}

document.body.innerHTML = greeter(user)
