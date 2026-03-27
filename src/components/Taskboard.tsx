"use client";
import React from "react";
import {useState} from "react";
import { Focus, Sparkles, Plus, Info, Trash2, Check } from "lucide-react";
import TaskItem from "@/components/TaskItem"
import AddTaskModal from "@/components/AddTaskModal"
 
const INITIAL_TASKS = [
    {
        id: 1, 
        label: "Create UI", 
        priority: "high", 
        project: "CS Project", 
        tags: ["career", "coding"],
        done: false
    },
    {
        id: 2,
        label: "Apply to 2 summer internships",
        priority: "low",
        project: null,
        tags: ["career"],
        done: false
    },
    {
        id: 3,
        label: "go to the gym",
        priority: "medium",
        project: null,
        tags: ["life"],
        done: true
    }
 ]

export default function TaskBoard({onOpenAI}) {
    const [tasks, setTasks] = useState(INITIAL_TASKS);
    const [newTask, setNewTask] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);

    //the function takes a task id
    const toggleDone = (id) =>
        // we are calling setTasks and giving it a function that takes the prev tasks state and calculates a new one from it
        setTasks((prev) =>
            //we use map to go through every tasks and if that task id 
            // matches the curretn one we are toggling, then we return a new object that is toggled as  
            // otherwise we leave it as the same
            prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
        );
    
    //the function deleteTask takes a task id
    const deleteTask = (id) =>
        //we call setTasks and give it a function that takes the prev tasjs
        //it returns a list of tasks that ids dont match the id given to deleteTask
        setTasks((prev) => prev.filter((t) => t.id !== id));

    //take the current tasks and add a new one to the end
    const addTask = ({label, priority, dueDate, tags}) => {
        //add new task to state -> set tasks to be all the previous tasks along with this new task at the end
        setTasks((prev) => [
            //copy all previous tasks
            ...prev,
            // create the new task object and use Date.now() to track id so its easier
            {id: Date.now(), label: label, priority: priority, project: null, tags: tags, done: false}
        ])
        //setNewTask("");
    };

    return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm p-6">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 leading-tight">
              Good Morning, Pristia!
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              What do you plan to do today?
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="text-lg">😎🐼👾</span>
            <div className="text-right">
              <p className="text-xs font-medium text-gray-700">Odama Studio</p>
              <p className="text-[11px] text-gray-400">⬆ 1,354</p>
            </div>
          </div>
        </div>

        {/* Profile Score Card */}
        <div className="mt-4 flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg">
            🐼
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-700">
              Nameless Panda #245
            </p>
            <p className="text-xs text-gray-400">Microsoft</p>
          </div>
          <div className="text-right space-y-0.5">
            <div className="flex items-center justify-end gap-2 text-xs text-gray-500">
              <span>Overall Impact Score</span>
              <span className="text-gray-300">—</span>
            </div>
            <div className="flex items-center justify-end gap-2 text-xs text-gray-500">
              <span>Ideal Session Length</span>
              <span className="text-gray-300">—</span>
            </div>
          </div>
        </div>
      </div>

      {/* Today Task Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-gray-800">Today's Tasks</h2>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-500 hover:bg-gray-50 transition-colors">
            <Focus size={13} />
            Focus Mode
          </button>
          <button
            onClick={onOpenAI}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-900 text-white text-xs hover:bg-gray-700 transition-colors"
          >
            <Sparkles size={13} />
            AI Assist
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
        {
        //map the tasks and make TaskItem objects with each 
        // pass onToggle and onDelete as functions that call these with the current task
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={() => toggleDone(task.id)}
            onDelete={() => deleteTask(task.id)}
          />
        ))
        }
      </div>

      {/*Footer Actions*/}
      <div className="mt-4 flex items-center gap-2">
        {/*finish button*/}
        <button 
          onClick={() => {
            //sets everything to done
            setTasks((prev) =>
                //the parentheces around the object tells javascript to reutn this object
                prev.map((t) =>  ({...t, done: true}))
            );
          }}
          className="px-5 py-2 bg-indigo-500 text-white text-sm font-medium rounded-lg hover:bg-indigo-600 transition-colors">
          Finish
        </button>
        {/* add task button */}
        <button
          onClick={() =>setModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-2 text-xs text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <Plus size={13} />
          Add Task
        </button>
        <button className="ml-auto text-gray-300 hover:text-gray-500">
          <Info size={14} />
        </button>
      </div>
      {/* if isModelOpen is true then we render the addTaskModal
      we pass in a function that calls setModalOpen(false) for the onClose argument
      we pass in a function that accepts a parameter called task from AddTaskModal's onAdd call and then calls addTask in taskboard.tsx with that task from AddTaskModal */}
      {isModalOpen && (
        <AddTaskModal
          onClose={() => setModalOpen(false)}
          onAdd={(task) => addTask(task)}
        />
      )}
    </div>
  );
}