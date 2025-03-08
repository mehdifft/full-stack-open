import Info from "./Info"
import Country from "./Country"


const CountryDisplay = ({ countries }) => {
    if (countries.length === 1) {
        const country = countries[0]

        return (
            <Info country={country} />
        )
    } else if (countries.length > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    } else if (countries.length > 1) {
        return (
            <div>
                {countries.map(country => <Country
                    key={country.name.common}
                    country={country} />
                )}
            </div>
        )
    }
}

export default CountryDisplay