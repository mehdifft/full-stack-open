import Person from './Person'

const Persons = ({ persons, eventHandler }) => {
    return (
        <div>
            {persons.map((person) => <Person key={person.id} person={person} deletePerson={eventHandler} />)}
        </div>
    )
}

export default Persons