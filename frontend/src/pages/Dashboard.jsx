import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'

function Dashboard() {
  const navigate = useNavigate()

  //useSelector always takes in function that takes in state and here assigns 'user' to 'auth' prop of state
  const {user} = useSelector((state) => state.auth)

  useEffect(() => {
    if(!user) {
      navigate('/login')
    }
  }, [user, navigate])

  return <div>Dashboard</div>;
}

export default Dashboard;
