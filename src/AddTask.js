import React, { useEffect, useState } from 'react';


const AddTask = ()=>{

    const dateA = new Date();
    const year = dateA.getFullYear();
    const month = dateA.getMonth();
    const day = dateA.getDate();
    const actualDate  = `${year}-${month < 9 ? "0" + (month + 1) : month + 1}-${day < 9 ? "0" + day : day}`;

    const [ taskList, setTaskList ] = useState([{task: "Zatankować procesor", date:"2023-07-20"}, {task: "wymienić powietrze w klawiaturze", date:"2023-06-26"}]);
    const [ doneTaskList, setDoneTaskList ] = useState([]);
    const [ giveUpTaskList, setGiveUpTaskList ] = useState([]);
    const [ newTask, setNewTask ] = useState({
        task: "",
        date: "",
    });

    const handleDateOnChange = (event) => {
        setNewTask((prevState) => ({
            ...prevState,
            'date': event.target.value
        }))
    };

    const handleInputTextChange = (event) => {
        setNewTask((prevState) => ({
            ...prevState,
            'task': event.target.value
        }))
    };
    
    const handleOnSubmit = (event) =>{
        event.preventDefault();
        if(newTask.task !== ""){
        setTaskList((prevState) => ([...prevState, newTask]) )
        setNewTask((prevState) => ({
            ...prevState,
            task: "",            
        }))
    } else{
        alert(`complete the field with the task`)
    }
    };

    useEffect(() => {
        setNewTask((prevState) => ({
            ...prevState,
            'date': actualDate
        }))
    }, []);

    const taskListMap = taskList.map((oneTask, index) => {
        const { task, date } = oneTask;
        const taskDate = new Date(date);
        // taskDate.setHours(0, 0, 0, 0);
        // dateA.setHours(0, 0, 0, 0);
        const compereDate =     taskDate.getTime() - dateA.getTime();
        const daysDiff = Math.ceil(compereDate / (1000 * 60 * 60 * 24));
        
        return(
            <li key={index} className='task'>
                <p>{daysDiff} days left. Deadline { date } </p>
                <p> {task} </p>
                <button onClick={ () => { didItHandleOnClick(index) }}>I did it!</button>
                <button onClick={ () => { delateTaskHandleOnClick(index) }}>delate, give up</button>
            </li>
        );
    });
    
    const delateTaskHandleOnClick = (delateIndex) =>{
        setGiveUpTaskList((prevState) => ([...prevState, taskList[delateIndex]]))
        setTaskList( taskList.filter((task, index) => (index !== delateIndex)));
    };

    const didItHandleOnClick = (indexToMove) => {    
        setDoneTaskList((prevState) => ([...prevState, taskList[indexToMove]]));
        setTaskList( taskList.filter((task, index) => (index !== indexToMove)));
    }

    const doneTaskListMap = doneTaskList.map((oneTask, index) => {
        const { task } = oneTask;        
        return(
                <li key={index}> {task} </li>
        );
    });
    const giveUpTaskListMap = giveUpTaskList.map((oneTask, index) => {
        const { task } = oneTask;        
        return(
                <li key={index}> {task} </li>
        );        
    });
    

    return(
        <div className="addTask">
            <form className='form' onSubmit={handleOnSubmit}>
                <label htmlFor="inputText">Enter the task to add:</label>
                <input type="text" size="50" id="inputText" onChange={handleInputTextChange} value={newTask.task}/>
                <label htmlFor="inputData"> Select an end date</label>
                <input type="date" id="inputData" min={actualDate} onChange={handleDateOnChange} value={newTask.date}/>
                <button type="submit">AddTask</button>
            </form>
            <div className='taskList'>
                <h3>You have {taskList.length} active tasks</h3>
                <ol>
                    {taskListMap}
                </ol>
                { doneTaskList.length !== 0 ? <h3> Congratulations! These tasks have been completed:</h3> : null}
                <ol>
                    {doneTaskListMap}
                </ol>
                { giveUpTaskList.length !== 0 ? <h3>This tasks you give up</h3> : null } 
                <ol>
                    {giveUpTaskListMap}
                </ol>
            </div>
        </div>
    );
};

export default AddTask;