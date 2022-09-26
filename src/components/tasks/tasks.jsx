import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function Tasks({data, deleteTasks}) {
    const [updateWeeklyTasks] = useState(data); 
    const [dailyTasks, setDailyTasks] = useState([]);

    // useEffect(() => {
    //     updateWeeklyTasks(data)
    // }, [data])
    

    const handleOnDragEnd = result => {
        if (!result.destination){
            return;
        };
    
        if (result.source.droppableId === result.destination.droppableId) {
            if(result.source.droppableId === "weekly"){
                // let tasks = Array.from(weeklyTasks);
                const [reorderedItem] = data.splice(result.source.index, 1);
                data.splice(result.destination.index, 0, reorderedItem);
                // setDailyTasks([...dailyTasks], reorderedItem);
                updateWeeklyTasks(data);
            } else {
                let tempDailyTasks = Array.from(dailyTasks);
                const [reorderedItem] = tempDailyTasks.splice(result.source.index, 1);
                tempDailyTasks.splice(result.destination.index, 0, reorderedItem);
                setDailyTasks(tempDailyTasks);
            }
        } else {
            let tempWeeklyTasks = data;
            let tempDailyTasks = dailyTasks;

            if(result.source.droppableId === "weekly"){
                const [removed] = tempWeeklyTasks.splice(result.source.index, 1);
                tempDailyTasks.splice(result.destination.index, 0, removed);
                updateWeeklyTasks(tempWeeklyTasks);
                setDailyTasks(tempDailyTasks);
            } else {
                const [removed] = tempDailyTasks.splice(result.source.index, 1);
                tempWeeklyTasks.splice(result.destination.index, 0, removed);
                updateWeeklyTasks(tempWeeklyTasks);
                setDailyTasks(tempDailyTasks);
            }
        }
    }
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
        <div>
            <div className='container'>
                <Droppable droppableId='weekly'>
                    {(provided) => (
                        <div className='weekly box'{...provided.droppableProps} ref={provided.innerRef} >
                            <h3>Weekly Tasks</h3>
                            {dailyTasks.map(({id, name, time_created, scrumgoalhistory_set}, index) => {
                                return (
                                    <Draggable key={id} draggableId={id} index={index} >
                                        {(provided) => (
                                            <p className='task' onClick={() => {deleteTasks(id)}} ref={provided.innerRef} 
                                            {...provided.draggableProps} {...provided.dragHandleProps} >
                                                {name}
                                                <div>{time_created.slice(0,10)} at {time_created.slice(12,16)}</div>
                                                <div className='blue'>
                                                    {scrumgoalhistory_set.map(({id, done_by}) => {
                                                        return(
                                                            <p key={id}>{done_by}</p>
                                                        )
                                                    })}
                                                </div>
                                            </p>
                                        )}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <Droppable droppableId='daily'>
                    {(provided) => (
                        <div className='daily box'{...provided.droppableProps} ref={provided.innerRef} >
                            <h3>Daily Target</h3>
                            {data.map(({id, content}, index) => {
                                return (
                                    <Draggable key={id} draggableId={id} index={index}>
                                        {(provided) => (
                                            <p className='task' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                                {content}
                                            </p>
                                        )}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder} 
                        </div>
                    )}
                </Droppable>
            </div>
        </div>
        
    </DragDropContext>
  )
}
