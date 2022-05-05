import {useEffect, useState } from 'react';
import './App.css';

function App() {
  //estado para armazenar tarefas
  const [tasks, setTasks] = useState([
       /*{
         id:0,
         task: 'Minha tarefa atual',
         finish: false,
       },

       {
        id:0,
        task: 'Minha tarefa atual',
        finish: true,
      }
      */

  ]);
  const[modal, setModal] = useState(false); 

  const saveTask=() => {
    var task = document.getElementById('content-task');

    setTasks([
      ...tasks,//recura oq ta no array e adiciona o outro em ultimo

      { id: new Date().getTime(),
        task: task.value,
        finish:false
      
      }
      
    ])
    

    setModal(false);

  }
  
  const markCompleted=(id)=>{
    let newTasks = tasks.filter(function(val){
      if (val.id===id){
        val.finish = true;
      }
      return val;
    })

    setTasks(newTasks);
     window.localStorage.setItem('tasks', JSON.stringify(newTasks));
  }

  const openModal = ()=> {
    setModal(!modal);
  }

  
  useEffect(()=>{
    //caso queira transformar em aplicativo
    if(window.localStorage.getItem('tarefas')!=undefined){
      setTasks(JSON.parse(window.localStorage.getItem('tasks')));
         console.log(window.localStorage.getItem('tasks'));
    }
  });

  return (
    <div className='App'>
     {
        modal?
        <div className='modal'> 
        <div className='modalContent'>
          <h3> Add Your Task!</h3>
          <input id='content-task' type='text'/>
          <button onClick={()=>saveTask()} >Add</button>
  
          
          
        </div>
        

        </div>
        :
        <div> </div>
      }

      <div onClick={()=>openModal()} className='addTask'>+</div>
  
      <div className='boxTask'>
        <h2>Today's Tasks</h2>
        {
          tasks.map((val)=>{
            if(!val.finish){
              return(
                <p onClick={()=>markCompleted(val.id)}>{val.task} </p>

              );
               } else{
                  return(
                    <p onClick={()=>markCompleted(val.id)} style= {{textDecoration:'line-through', textDecorationColor: 'green' }}> {val.task} </p>

                  );

                }
              
          })
        }


      </div>
    </div>
  );
}

export default App;
