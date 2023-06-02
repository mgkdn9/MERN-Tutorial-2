import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import GoalForm from "../components/GoalForm";

function Dashboard() {
  const navigate = useNavigate()

  //useSelector always takes in function that takes in state and here assigns 'user' to 'auth' prop of state. It 'selects' which global state variable you want (auth) to be loaded into the local variable you're creating (user)
  const {user} = useSelector((state) => state.auth)

  useEffect(() => {
    if(!user) {
      navigate('/login')
    }
  }, [user, navigate])

  return (<>
    <section className="heading">
      <h1>Welcome {user && user.name}</h1>
      <p>Goals Dashboard</p>
    </section>

    <GoalForm />
  </>);
}

export default Dashboard;
