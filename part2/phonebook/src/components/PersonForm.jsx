import Input from "./Input"

const PersonForm = ({ handler, name, number }) => {
    return (
        <>
            <form onSubmit={handler}>
                <Input text='name:' value={name.value} handler={name.handler} />
                <Input text='number:' value={number.value} handler={number.handler} />
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

export default PersonForm