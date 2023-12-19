import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux"

const PrivateRoute = ({children}) => {
    const router = useNavigate();
    const isAuth = Boolean(useSelector((state) => state?.auth?.token));

    useEffect(() => {
        if (!isAuth) {
            router('/login');
        }
    },[])

    return children;
}

export default PrivateRoute