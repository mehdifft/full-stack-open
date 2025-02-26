import Input from './Input'

const Filter = ({ value, handler }) => {
    return (
        <>
            <form>
                <Input text='filter shown with' value={value} handler={handler} />
            </form>
        </>
    )
}

export default Filter