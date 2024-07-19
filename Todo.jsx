import { useEffect, useState } from "react";
import "../Day5/todo.css"



function Todo() {

    const[value,setValue]=useState("")
    const[Ctask,setCTask]=useState(0)
    const[Rtask,setRTask]=useState(0)



   let AllTask = JSON.parse(localStorage.getItem("Set_todo")) || [{Task:"Buy Iphone",completed:true},{Task:"Buy Car",completed:false},{Task:"Learn Guitar",completed:true}]


    const [todo,setTodo]=useState(AllTask)


 
function handleSubmit(){
    if(value){

    setTodo([...todo,{Task:value,completed:false}])
    setValue("")

    }
    

}



function handleCheck(index){

   let mynewArray =  [...todo]
   mynewArray[index].completed =  !mynewArray[index].completed
    setTodo(mynewArray)



   let completeTask =  mynewArray.filter((value,index)=>{
         return value.completed 

    })

    

 let RemainingTask =   mynewArray.filter((value,index)=>{

         return !value.completed

    })

    setCTask(completeTask.length)

    setRTask(RemainingTask.length)




}


function handleDelete(index){

   const myNewDelete  = [...todo]

   let DeleteTask =  myNewDelete.filter((value,id)=>{
        console.log(id)
         return id !== index

    })

    setTodo(DeleteTask)



}


function handleupdate(index){

   const myedit =  [...todo]


  let newValue =  myedit[index].Task
    

  setValue(newValue)





  let ChangeValue =   prompt(`Edit Value ${newValue}`,newValue)

    if(ChangeValue){
        let newObj =  {Task:ChangeValue,completed:false}


        myedit.splice(index,1,newObj)  
 
 
 
        setTodo(myedit)

    }

  


}




    useEffect(()=>{
        
   let mynewArray =  [...todo]

   let completeTask =  mynewArray.filter((value,index)=>{
    return value.completed 

},[todo])



let RemainingTask =   mynewArray.filter((value,index)=>{

    return !value.completed

})

setCTask(completeTask.length)

setRTask(RemainingTask.length)



    localStorage.setItem("Set_todo",JSON.stringify(mynewArray))



    },[todo])







    return (  
         <>
       <div className="todo">
        <div className="box">
        <h1> My Todo App</h1>
        <input type="text" className="todoInput" value={value}  onChange={(e)=>setValue(e.target.value)} />

        <button className="todobtn" onClick={handleSubmit}>Add Task</button>    
        
        {todo.map((value,index)=>(

                <ul>
                    <div className="myDiv">
                  <input type="checkbox" checked={value.completed} onClick={()=>handleCheck(index)} />

              
                  <span style={{border: value.completed ? "1px solid green":"1px solid red"}} >{value.Task}</span>
                 <span class="material-symbols-outlined delete_icon" onClick={()=>handleDelete(index)}>cancel</span>

                 <span class="material-symbols-outlined edit_icon" onClick={()=>handleupdate(index)} >edit</span>
                 </div>
                </ul>

                  
               

               
                 
        ))}

                        <p>Completed Task:- {Ctask}</p>
                        <p>Remaining Task:-{Rtask} </p>
        </div>
   

       </div>
       


        
        
        </>
     );
}

export default Todo;