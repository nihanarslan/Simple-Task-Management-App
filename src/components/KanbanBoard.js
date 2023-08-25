import "../styles.css";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import TaskGroup from "./TaskGroup";

function KanbanBoard() {
  //Lists will be an array of objects in case other properties are added in the future.
  const [toDoListItems, setToDoListItems] = useState([{"id":1, "title": "Add the finished project on Github"}, {"id":2, "title": "Finish reading a book"}, {"id":3, "title": "Clean the house"}, {"id":4, "title": "Make a job application"}, {"id":5, "title": "But ingredients from the market"}]);
  const [progListItems, setProgListItems] = useState([{"id":6, "title": "Work on the project"}, {"id":7, "title": "Take a shower"}]);
  const [doneListItems, setDoneListItems] = useState([{"id":8, "title": "Go for a walk"}]);


  const handleDragEnd = (result) => {
    console.log("Hello There", result);

    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return;

    if (source.droppableId == "inprogress") {
      setProgListItems(removeItemById(draggableId, progListItems));
      console.log("Prog list items updated");
    } else if (source.droppableId == "done") {
      setDoneListItems(removeItemById(draggableId, doneListItems));
      console.log("Done list items updated");
    } else {
      setToDoListItems(removeItemById(draggableId, toDoListItems));
      console.log("Todo list items updated");
    }

    const task = findItemById(draggableId, [
      ...toDoListItems,
      ...progListItems,
      ...doneListItems,
    ]);

    console.log(task);

    if (destination.droppableId == "inprogress") {
      setProgListItems([{ ...task }, ...progListItems]);
    } else if (destination.droppableId == "done") {
      setDoneListItems([{ ...task }, ...doneListItems]);
    } else {
      setToDoListItems([{ ...task }, ...toDoListItems]);
    }
  };

  function findItemById(id, array) {
    return array.find((item) => item.id == id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item.id != id);
  }



  const addNewItem = () => {

    const item = prompt('Add a task to TODO List')

    setToDoListItems(prev => [{ "id": "XX", "title": item }, ...prev]);  //ID should be set according to the all the tasks in the app. ID should be unique

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
          <button type="button" style={{ background: "none", margin:".5em", borderRadius: "80px", height:"70px", width:"70px"}}>
            <img src="/addIcon.png" alt="Add" onClick={addNewItem} style={{height:"100%", width:"100%", objectFit:"cover"}} />
          </button>


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
          <button type="button" style={{ background: "none", margin:".5em", borderRadius: "80px", height:"70px", width:"70px"}}>
            <img src="/deleteAll.png" alt="Add" onClick={clearAll} style={{height:"100%", width:"100%", objectFit:"cover"}} />
          </button>
        </div>
        
      </div>
    </DragDropContext>
  );
}

export default KanbanBoard;
