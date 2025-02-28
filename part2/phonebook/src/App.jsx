import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    personService
      .get()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    let ok = true
    persons.forEach((value) => {
      if (value.name === newName) {
        ok = false
      }
    })

    if (ok) {
      personService
        .create(newPerson)
        .then(newObject => {
          setPersons(persons.concat(newObject))
          setNewName('')
          setNewNumber('')
        })
    } else {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = { ...person, number: newNumber }

        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id === person.id ? returnedPerson : p))
            setNewName('')
            setNewNumber('')
          })
      }
    }
  }

  const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(newSearch.toLocaleLowerCase()))

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (confirm(`Delete ${person.name}`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id != id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={newSearch} handler={(event) => setNewSearch(event.target.value)} />

      <h3>Add a new</h3>

      <PersonForm
        handler={addPerson}
        name={{ value: newName, handler: (event) => setNewName(event.target.value) }}
        number={{ value: newNumber, handler: (event) => setNewNumber(event.target.value) }}
      />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} eventHandler={deletePerson} />
    </div>
  )
}

export default App