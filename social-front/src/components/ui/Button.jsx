
export default function Button({ children, onClick }) {
    return (
        <button onClick={onClick} className='bg-primary p-2 w-fit rounded hover:bg-primary/50'>{children}</button>
    )
}
