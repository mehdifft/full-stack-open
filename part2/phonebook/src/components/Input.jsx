const Input = ({ text, value, handler }) => {
    return (
        <div>{text} <input value={value} onChange={handler}></input></div>
    )
}

export default Input