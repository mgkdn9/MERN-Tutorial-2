import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from "../components/GoalForm";
import Spinner from '../components/Spinner'
import { getGoals, reset } from "../features/goals/goalSlice";
import GoalItem from '../components/GoalItem'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //useSelector always takes in function that takes in state and here assigns 'user' to 'auth' prop of state. It 'selects' which global state variable you want (auth) to be loaded into the local variable you're creating (user)
  const {user} = useSelector((state) => state.auth)
  const {goals, isLoading, isError, message} = useSelector((state) => state.goals)

  useEffect(() => {
    if(isError) {
      console.log(message)
    }

    if(!user) {
      navigate('/login')
    }

    dispatch(getGoals())

    return () => {
      // try adding back in if problems arise...
      // dispatch(reset()) //return from useEffect what you want to happen if component unmounts. In this case, we want the goals to reset if they leave Dashboard
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (<>
    <section className="heading">
      <h1>Welcome {user && user.name}</h1>
      <p>Goals Dashboard</p>
    </section>

    <GoalForm />

    <section className="content">
      {goals.length > 0 ? (
        <div className="goals">
          {goals.map((goal) => (
            <GoalItem key={goal._id} goal={goal} />
          ))}
        </div>
      ) : (<h3>You have not set any goals</h3>)}
    </section>
  </>);
}

export default Dashboard;
