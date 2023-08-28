import Card from "react-bootstrap/Card";
import { Droppable } from "react-beautiful-dnd";
import "./taskgroup.css";
import Task from "./Task";
import React from "react";


export default function TaskGroup(props) {
  return (
    <div style={{ padding: 10 }}>
      <Card style={{ width: "20rem", height: 400, background: "#121212"}}>
        <Card.Header style={{color: "#A5A5A5"}}>{props.title}</Card.Header>

        <div className="taskgroup">
          <Droppable droppableId={props.id} type="taskgroup">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
                style={
                    {
                        display: "flex",
                        flexDirection: "column",
                        transition: "background-color 0.2s ease",
                        background: snapshot.isDraggingOver ? "#212121" : "#101010",
                        minHeight: 500,
                    }
                }
              >
                {props.tasks.map((task, index) => (
                  <Task key={index} index={index} task={task} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </Card>
    </div>
  );
}
