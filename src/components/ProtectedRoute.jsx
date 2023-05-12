import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext"
import { Spinner } from "./Spinner"
import PropTypes from 'prop-types';

export function ProtectedRoute({ children }) {
   const { user, loading } = useAuthContext()

   if (loading) return <div className="container"><Spinner className="active spinner-general" /></div>
   if (!user) return <Navigate to="/login" />
   return <>{children}</>
}

ProtectedRoute.propTypes = {
   children: PropTypes.object.isRequired
}