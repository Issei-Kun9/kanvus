"use client";

import * as React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import { TaskCard } from "@/components/tasks/task-card";
import { cn } from "@/lib/utils";
import { TASK_STATUS_CONFIG } from "@/lib/utils";
import type { Task, TaskStatus } from "@/types";

interface KanbanBoardProps {
  tasks: Task[];
  onTaskMove: (taskId: string, newStatus: TaskStatus, newOrder: number) => void;
  onTaskClick: (task: Task) => void;
}

const COLUMNS: TaskStatus[] = ["BACKLOG", "TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"];

export function KanbanBoard({ tasks, onTaskMove, onTaskClick }: KanbanBoardProps) {
  const [columnTasks, setColumnTasks] = React.useState<Record<TaskStatus, Task[]>>(
    () => {
      const grouped: Record<TaskStatus, Task[]> = {
        BACKLOG: [],
        TODO: [],
        IN_PROGRESS: [],
        IN_REVIEW: [],
        DONE: [],
      };
      tasks.forEach((task) => {
        grouped[task.status].push(task);
      });
      Object.keys(grouped).forEach((key) => {
        grouped[key as TaskStatus].sort((a, b) => a.order - b.order);
      });
      return grouped;
    }
  );

  React.useEffect(() => {
    const grouped: Record<TaskStatus, Task[]> = {
      BACKLOG: [],
      TODO: [],
      IN_PROGRESS: [],
      IN_REVIEW: [],
      DONE: [],
    };
    tasks.forEach((task) => {
      grouped[task.status].push(task);
    });
    Object.keys(grouped).forEach((key) => {
      grouped[key as TaskStatus].sort((a, b) => a.order - b.order);
    });
    setColumnTasks(grouped);
  }, [tasks]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceStatus = source.droppableId as TaskStatus;
    const destStatus = destination.droppableId as TaskStatus;

    const newColumnTasks = { ...columnTasks };
    const sourceItems = [...newColumnTasks[sourceStatus]];
    const destItems =
      sourceStatus === destStatus ? sourceItems : [...newColumnTasks[destStatus]];

    const [movedTask] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, movedTask);

    newColumnTasks[sourceStatus] = sourceItems;
    newColumnTasks[destStatus] = destItems;

    setColumnTasks(newColumnTasks);

    onTaskMove(draggableId, destStatus, destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4 h-full">
        {COLUMNS.map((status) => {
          const config = TASK_STATUS_CONFIG[status as keyof typeof TASK_STATUS_CONFIG];
          const columnTasksList = columnTasks[status] || [];

          return (
            <div key={status} className="flex flex-col min-w-[280px] w-[280px]">
              <div className="flex items-center gap-2 mb-3 px-1">
                <div
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: config.color }}
                />
                <h3 className="text-sm font-semibold text-foreground">
                  {config.label}
                </h3>
                <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                  {columnTasksList.length}
                </span>
              </div>

              <Droppable droppableId={status}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={cn(
                      "flex-1 space-y-2 rounded-xl p-2 transition-colors min-h-[200px]",
                      snapshot.isDraggingOver
                        ? "bg-primary/5 border-2 border-dashed border-primary/30"
                        : "bg-muted/50"
                    )}
                  >
                    {columnTasksList.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard
                              task={task}
                              onClick={() => onTaskClick(task)}
                              isDragging={snapshot.isDragging}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}
