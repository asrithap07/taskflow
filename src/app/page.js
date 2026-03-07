"use client";
import { useState} from "react";
import AIAssist from "@/components/AIAssistant"
import Sidebar from "@/components/Sidebar"
import TaskBoard from "@/components/Taskboard"

export default function Home() {
  const [theme, setTheme] = useState("light");
  const [aiOpen, setAiOpen] = useState(true);

  return (
    
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div
        className="flex gap-4 w-full max-w-6xl"
        style={{ height: "calc(100vh - 3rem)" }}
      >
        {/* Sidebar 
          giving the sidebar the current theme and passing the function that changes the theme
        */}
        <Sidebar theme={theme} onToggleTheme={setTheme} />

        {/* Main Task Board 
          Passing a function to onOpenAI that opens the AI assistant
          by setting aiOpen to true
        */}
        
        {/*<div className="flex-1 min-w-0">*/}
          {/*<TaskBoard onOpenAI={() => setAiOpen(true)} />*/}
        {/*</div>*/}

        {/* AI Assist Panel 
          Only renders when aiOpen is true.
          Passing onClose so the component can hide itself
          by setting aiOpen to false.
        */}
        {/*
        {aiOpen && (
          <div className="w-72 flex-shrink-0">
            <AIAssist onClose={() => setAiOpen(false)} />
          </div>
        )}*/}
      </div>
    </div>
  );
}
