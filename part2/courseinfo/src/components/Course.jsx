const Part = ({ part }) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

const Content = ({ parts }) => {
    const total =
        parts.reduce((first, second) => first + second.exercises, 0)
    return (
        <>
            {parts.map(
                part => <Part key={part.id} part={part} />
            )}

            <h3>total of {total} exercises</h3>
        </>
    )
}

const Header = ({ name }) => {
    return (
        <h2>{name}</h2>
    )
}


const Course = ({ course }) => {
    return (
        <>
            <Header name={course.name} />
            <Content parts={course.parts} />
        </>
    )
}

export default Course