import Info from "./Info"
import { useState } from "react"

const Country = ({ country }) => {
    const [showView, setShowView] = useState(false)

    if (showView)
        return (
            <div>
                {country.name.common}
                <button onClick={() => setShowView(!showView)}>
                    show
                </button>
                <Info country={country} />
            </div>
        )
    else
        return (
            <div>
                {country.name.common}
                <button onClick={() => setShowView(!showView)}>
                    show
                </button>
            </div>
        )
}

export default Country