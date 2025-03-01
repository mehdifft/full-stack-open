import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
          setSuccessMessage(`Added ${newName}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            `Information of ${person.name} has already been removed from server`
          )
          setPersons(persons.filter(p => p.id !== person.id))
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
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
            setSuccessMessage(`Added ${newName}`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              `Information of ${person.name} has already been removed from server`
            )
            setPersons(persons.filter(p => p.id !== person.id))
            setNewName('')
            setNewNumber('')
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
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
        .catch(error => {
          setErrorMessage(
            `Information of ${person.name} has already been removed from server`
          )
          setPersons(persons.filter(p => p.id !== person.id))
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={successMessage} state="success" />
      <Notification message={errorMessage} state="error" />

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