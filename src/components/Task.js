import React from "react";
import { Draggable } from "react-beautiful-dnd";

export default function Task(props) {
  return (
    <Draggable
      draggableId={`${props.task.id}`}
      key={props.task.id}
      index={props.index}
    >
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div
            style={{
              backgroundColor: snapshot.isDragging ? "#1E88E5" : "#6C6C6C",
              margin: 5,
              textAlign: "left",
              fontSize:20,
              color: "#E1E1E1"
            }}
          > 
          {props.task.title}

          </div>
        </div>
      )}
    </Draggable>
  );
}
