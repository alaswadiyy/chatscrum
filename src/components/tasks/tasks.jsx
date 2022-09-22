import React, { useEffect, useState } from 'react'
import taskList from '../../static/tasks'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// const Container = styled.div`
//     border: 1px solid lightgrey;
//     border-radius: 2px;
//     padding: 8px;
//     margin-bottom: 8px;
//     cursor: pointer ;
// `;

export default function Tasks() {
    const [weeklyTasks, updateWeeklyTasks] = useState(taskList); 
    const [dailyTasks, setDailyTasks] = useState([]);

    useEffect(() => {
        updateWeeklyTasks(taskList)
    }, [taskList])
    

    const handleOnDragEnd = result => {
        if (!result.destination){
            return;
        };
    
        if (result.source.droppableId === result.destination.droppableId) {
            if(result.source.droppableId === "weekly"){
                let tempWeeklyTasks = Array.from(weeklyTasks);
                const [reorderedItem] = tempWeeklyTasks.splice(result.source.index, 1);
                tempWeeklyTasks.splice(result.destination.index, 0, reorderedItem);
                updateWeeklyTasks(tempWeeklyTasks);
            } else {
                let tempDailyTasks = Array.from(dailyTasks);
                const [reorderedItem] = tempDailyTasks.splice(result.source.index, 1);
                tempDailyTasks.splice(result.destination.index, 0, reorderedItem);
                setDailyTasks(tempDailyTasks);
            }
        } else {
            let tempWeeklyTasks = weeklyTasks;
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
                            {weeklyTasks.map(({id, item}, index) => {
                                return (
                                    <Draggable key={id} draggableId={id} index={index} >
                                        {(provided) => (
                                            <p className='task' ref={provided.innerRef} 
                                            {...provided.draggableProps} {...provided.dragHandleProps} >
                                                {item}
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
                            {dailyTasks.map(({id, item}, index) => {
                                return (
                                    <Draggable key={id} draggableId={id} index={index}>
                                        {(provided) => (
                                            <p className='task' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                                {item}
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
