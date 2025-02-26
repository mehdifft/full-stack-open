import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1)
    }

    let ok = true
    persons.forEach((value) => {
      if (value.name === newName) {
        ok = false
      }
    })

    if (ok) {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(newSearch.toLocaleLowerCase()))

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

      <Persons persons={personsToShow} />
    </div>
  )
}

export default App