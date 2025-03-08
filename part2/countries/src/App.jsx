import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryDisplay from './components/CountryDisplay'

const App = () => {
  const [value, setValue] = useState('')
  const [search, setSearch] = useState(null)
  const [countries, setCountries] = useState([])
  const [targetedCountries, setTargetedCountries] = useState([])
  const contriesInfoUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

  useEffect(() => {
    axios
      .get(contriesInfoUrl)
      .then((response) => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    if (search) {
      setTargetedCountries(countries.filter(v => v.name.common.toLowerCase().includes(search.toLowerCase())))
    }
  }, [search])


  const handleSearch = (event) => {
    event.preventDefault()

    setSearch(value)
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        find countries <input type="text" value={value} onChange={event => setValue(event.target.value)} />
      </form>
      <CountryDisplay countries={targetedCountries} />
    </div>
  )
}

export default App
