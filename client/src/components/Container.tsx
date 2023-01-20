import '../styles/sass/container.scss'

export const Container = ({children}:any) => {
    return (
        <div className="container">
            {children}
        </div>
    )
}