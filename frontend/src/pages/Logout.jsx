import { useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const Logout = () => {
    const { logout } = useContext(AuthContext)

    useEffect(() => {

        logout()
    }, [])

    return (
        <div>
            <h1>Logout</h1>
        </div>
    )
}

export default Logout