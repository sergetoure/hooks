import React, { useState,createContext,useContext } from 'react'
// import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'

const initialState={
   
  goal:"",
  by:""


}
const initialStateProvider=[]
const AppContext=createContext(null)

export default function App() {
  const {goalList}=useContext(AppContext)


  useEffect(()=>{
    if (goalList.length>=1){
      document.title=goalList[0].goal
    } else {
      document.title="no data"
    }
    
  
      },[])


  return (
    <>
    <img src={viteLogo}/>
    <h1>My Little Lemon Goaol App</h1>
    <GoalForm />
    <DisplayGoal/>
    
</>
   
     
    
  )
}

const GoalForm=()=>{

  const {setGoal}=useContext(AppContext)

  const [state,setFormState]=useState(initialState)

  const handleChange=(e)=>{

    setFormState((prevState)=>({
      ...prevState,
      [e.target.id]:e.target.value
      
    }))

    //console.log(state)
  }


    const handleSubmit=(e)=>{
      e.preventDefault()
      const {goal,by}=state

      setGoal((prevState)=>([...prevState,{goal,by}]))
   
      setFormState(prevState=>({...prevState,goal:"",by:""}))
    

    }



  return(
    <>
    <form onSubmit={handleSubmit}>
    <input type="text" name="goal" id="goal" placeholder='Goal' value={state.goal} onChange={handleChange}/>
    <input type="text" name="by" id="by" placeholder='By' value={state.by} onChange={handleChange}/>
    <button type="submit">Submit Goal</button>
    </form>

    </>
  )
}
const DisplayGoal=()=>{
  const {goalList}=useContext(AppContext)

  return (
    <>
   
      <ul>
        {goalList.map(({goal,by},index)=><li key={index}>My Goal is to {goal} by {by} </li> )}
         
      </ul>
       
    </>
  )
}

export const AppProvider=({children})=>{
  const [goalList, setGoal] = useState(initialStateProvider)

return(
  <>
  <AppContext.Provider value={{goalList,setGoal}}>
    {children}
  </AppContext.Provider>
  </>
)
}