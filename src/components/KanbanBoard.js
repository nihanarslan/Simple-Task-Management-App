import "../styles.css";
import { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import TaskGroup from "./TaskGroup";
import { db } from "../firebase";
import {
  query,
  collection,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "@firebase/firestore";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";


function KanbanBoard() {
  //Lists will be an array of objects in case other properties are added in the future.
  const [toDoListItems, setToDoListItems] = useState([]);
  const [progListItems, setProgListItems] = useState([]);
  const [doneListItems, setDoneListItems] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [input, setInput] = useState("");

  //Create new Task
  const createTask = async (e) => {
    e.preventDefault(e);

    if (input === null || input === "") return;

    await addDoc(collection(db, "Tasks"), {
      title: input,
      state: "todo",
    });
    setInput("");
    handleClose();
  };

  // Read Lists from Firebase
  useEffect(() => {
    const q = query(collection(db, "Tasks"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todoArr = [];
      let inProgArr = [];
      let doneArr = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().state === "todo")
          todoArr.push({ ...doc.data(), id: doc.id });
        else if (doc.data().state === "inprogress")
          inProgArr.push({ ...doc.data(), id: doc.id });
        else if (doc.data().state === "done")
          doneArr.push({ ...doc.data(), id: doc.id });
      });
      setToDoListItems(todoArr);
      setProgListItems(inProgArr);
      setDoneListItems(doneArr);
    });
    return () => unsubscribe();
  }, []);

  //Update Lists in Firebase
  const update = async (id, destination) => {
    await updateDoc(doc(db, "Tasks", id), {
      state: destination,
    });
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return;

    update(draggableId, destination.droppableId);
  };

  //Delete Completed Tasks
  const clearDoneTasks = async () => {
    console.log(doneListItems);
    const promises = doneListItems.map((docId) =>
      deleteDoc(doc(db, "Tasks", docId.id))
    );
    await Promise.all(promises);
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

          <Button
            variant="light"
            style={{
              backgroundImage: "url(/addIcon.png)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "70px, 70px",
              backgroundPosition: "center",
              height: 50,
              width: 50,
              borderRadius: "70%",
              border:"none",
              marginTop: 10,
            }}
            onClick={handleShow}
          ></Button>

          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Add New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    autoFocus
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={createTask}>
                Add
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        <TaskGroup
          title={"IN PROGRESS"}
          tasks={progListItems}
          id={"inprogress"}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <TaskGroup title={"DONE"} tasks={doneListItems} id={"done"} />

          <Button
            variant="light"
            style={{
              backgroundImage: "url(/deleteAll.png)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "60px, 60px",
              backgroundPosition: "center",
              height: 50,
              width: 50,
              borderRadius: "70%",
              border:"none",
              marginTop: 10,
            }}
            onClick={clearDoneTasks}
          ></Button>
        </div>
      </div>
    </DragDropContext>
  );
}

export default KanbanBoard;
