import "../styles.css";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import TaskGroup from "./TaskGroup";

let maxID=9;  //Max id for the predefined list


function KanbanBoard() {
  //Lists will be an array of objects in case other properties are added in the future.
  const [toDoListItems, setToDoListItems] = useState([
    { id: 1, title: "Add the finished project on Github" },
    { id: 2, title: "Finish reading a book" },
    { id: 3, title: "Clean the house" },
    { id: 4, title: "Make a job application" },
    { id: 5, title: "Buy ingredients from the market" },
  ]);
  const [progListItems, setProgListItems] = useState([
    { id: 6, title: "Work on the project" },
    { id: 7, title: "Take a shower" },
  ]);
  const [doneListItems, setDoneListItems] = useState([
    { id: 8, title: "Go for a walk" },
    { id: 9, title: "Finish the one work that never ends" },
  ]);

  

  const handleDragEnd = (result) => {

    const { destination, source, draggableId } = result;


    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    ) return;
      
    if (source.droppableId == "inprogress") {
      const newList = [...progListItems];
      const [removedTask] = newList.splice(source.index, 1);

      if(destination.droppableId == "inprogress"){
        newList.splice(destination.index, 0, removedTask);
        return setProgListItems(newList);
      }

      setProgListItems([...newList]);
    } else if (source.droppableId == "done") {
      const newList = [...doneListItems];
      const [removedTask] = newList.splice(source.index, 1);

      if(destination.droppableId == "done"){
        
        newList.splice(destination.index, 0, removedTask);
        return setDoneListItems(newList);
      }

      setDoneListItems([...newList]);
    } else if (source.droppableId == "todo") {
      const newList = [...toDoListItems];
      const [removedTask] = newList.splice(source.index, 1);

      if(destination.droppableId == "todo"){
        newList.splice(destination.index, 0, removedTask);
        return setToDoListItems(newList);
      }

      setToDoListItems([...newList]);
    }

    const task = findItemById(draggableId, [
      ...toDoListItems,
      ...progListItems,
      ...doneListItems,
    ]);


    if (destination.droppableId == "inprogress") {

      const newList = Array.from(progListItems);
      newList.splice(destination.index, 0, task);
      setProgListItems([...newList]);

      // setProgListItems([{ ...task }, ...progListItems]);
    } else if (destination.droppableId == "done") {

      const newList = Array.from(doneListItems);
      newList.splice(destination.index, 0, task);
      setDoneListItems([...newList]);
      // setDoneListItems([{ ...task }, ...doneListItems]);
    } else {

      const newList = Array.from(toDoListItems);
      newList.splice(destination.index, 0, task);
      setToDoListItems([...newList]);
      // setToDoListItems([{ ...task }, ...toDoListItems]);
    }

  };

  function findItemById(id, array) {
    return array.find((item) => item.id == id);
  }

  const addNewItem = () => {
    const item = prompt("Add a task to TODO List");
    maxID += 1;//ID will be set as max id number + 1. ID should be unique
    setToDoListItems((prev) => [{ id: maxID, title: item }, ...prev]); 

    console.log(toDoListItems);
  };

  const clearAll = () => {
    const changedList = [];
    setDoneListItems(changedList);
  };


  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "start",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <TaskGroup title={"TO DO"} tasks={toDoListItems} id={"todo"} />
         
          <button
            style={{
              backgroundImage: "url(/addIcon.png)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "70px, 70px",
              backgroundOrigin: "padding-box",
              backgroundPosition: "center",
              height: 50,
              width: 50,
              borderRadius: "70%",
              display: "inline-block",
              marginTop:10
            }}
            onClick={addNewItem}
          ></button>

        </div>

        <TaskGroup title={"IN PROGRESS"} tasks={progListItems} id={"inprogress"}/>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <TaskGroup title={"DONE"} tasks={doneListItems} id={"done"} />

          <button
            style={{
              backgroundImage: "url(/deleteAll.png)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "60px, 60px",
              backgroundPosition: "center",
              height: 50,
              width: 50,
              borderRadius: "70%",
              display: "inline-block",
              marginTop:10
            }}
            onClick={clearAll}
          ></button>

        </div>
      </div>
    </DragDropContext>
  );
}

export default KanbanBoard;
