import React, { useState } from "react";
import styled from "styled-components";
import Horoscope from "./Horoscope";
import News from "./News";
import Weather from "./Weather";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Widgets = () => {
  let componentsArray = [Weather, News, Horoscope];

  const [compPosition, setCompPosition] = useState(componentsArray);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(compPosition);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCompPosition(items);
  };

  return (
    <Master>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="widgets">
          {(provided) => (
            <ComponentsList
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {compPosition?.map((Component, index) => {
                return (
                  <Draggable
                    key={index}
                    draggableId={`${Component}+${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <ComponentItem
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <Component />
                      </ComponentItem>
                    )}
                  </Draggable>
                );
              })}

              {provided.placeholder}
            </ComponentsList>
          )}
        </Droppable>
      </DragDropContext>
    </Master>
  );
};

const Master = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 0.3;
  width: 100%;
  height: auto;
  background-color: var(--brown-color);
  border-left: 1px solid var(--yellow-color);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 25px;
  overflow-y: scroll;
  -ms-overflow-style: none; /*for IE*/
  scrollbar-width: none; /*for Firefox*/
  /*for Chrome*/
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ComponentsList = styled.ul`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style-type: none;
`;

const ComponentItem = styled.li`
  height: 100%;
  width: auto;
`;
export default Widgets;
