"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string; 
  updatedAt: string;
}

interface User {
  email: string;
  name: string;
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const isTaskEdited = (task: Task) => {
    const created = new Date(task.createdAt).getTime();
    const updated = new Date(task.updatedAt).getTime();
    return updated > created + 1000; 
  };

  const fetchUser = async () => {
    try {
      const userData = await apiRequest("/auth/me");
      setUser(userData);
    } catch (err) {
      console.log("User details fetch failed");
    }
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await apiRequest("/tasks");
      setTasks(data);
    } catch (err: any) {
      setError(err.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchTasks();
  }, []);

  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const newTask = await apiRequest("/tasks", {
        method: "POST",
        body: JSON.stringify({ title: newTaskTitle }),
      });
      setTasks([newTask, ...tasks]);
      setNewTaskTitle("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const toggleTask = async (id: string, currentStatus: boolean) => {
    const originalTasks = [...tasks];
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !currentStatus } : t));

    try {
      await apiRequest(`/tasks/${id}/toggle`, { method: "PATCH" });
    } catch (err: any) {
      setError(err.message);
      setTasks(originalTasks);
    }
  };

  const deleteTask = async (id: string) => {
    const originalTasks = [...tasks];
    setTasks(tasks.filter((t) => t.id !== id));

    try {
      await apiRequest(`/tasks/${id}`, { method: "DELETE" });
    } catch (err: any) {
      setError(err.message);
      setTasks(originalTasks);
    }
  };

  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
  };

  const saveEdit = async () => {
    if (!editTitle.trim()) return;

    try {
      const updatedTask = await apiRequest(`/tasks/${editingId}`, {
        method: "PATCH",
        body: JSON.stringify({ title: editTitle }),
      });

      setTasks(tasks.map((t) => (t.id === editingId ? updatedTask : t)));
      setEditingId(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
  }

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-4 sm:p-6 text-slate-800 font-sans">
      
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* HEADER */}
        <div className="bg-indigo-600 p-6 sm:p-8 text-white flex justify-between items-center relative overflow-hidden shrink-0">
          <div className="relative z-10">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {user ? `Hello, ${user.name || 'Friend'}` : "My Tasks"}
            </h1>
            <p className="text-indigo-200 text-sm mt-1">
              {tasks.filter(t => !t.completed).length} tasks remaining
            </p>
          </div>
          <button 
            onClick={logout}
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all backdrop-blur-sm z-10"
          >
            Logout
          </button>
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        <div className="p-6 sm:p-8 flex flex-col flex-1 overflow-hidden">
          
          {/* ERROR ALERT */}
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm flex items-center shrink-0">
              <span className="mr-2">⚠️</span> {error}
              <button onClick={() => setError("")} className="ml-auto font-bold">✕</button>
            </div>
          )}

          {/* INPUT AREA */}
          <form onSubmit={createTask} className="relative mb-6 group shrink-0">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="w-full pl-6 pr-14 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-lg placeholder:text-slate-400"
            />
            <button 
              type="submit"
              disabled={!newTaskTitle.trim()}
              className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white px-4 rounded-xl transition-colors font-medium shadow-md"
            >
              Add
            </button>
          </form>

          {/* FILTERS */}
          <div className="flex gap-2 mb-4 shrink-0 overflow-x-auto pb-2">
            {["all", "active", "completed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all capitalize whitespace-nowrap ${
                  filter === f 
                    ? "bg-indigo-100 text-indigo-700 border border-indigo-200" 
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* TASK LIST (Scrollable) */}
          <div className="space-y-3 overflow-y-auto flex-1 pr-2 custom-scrollbar">
            {loading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-slate-100 rounded-2xl animate-pulse"></div>
              ))
            ) : filteredTasks.length === 0 ? (
              <div className="text-center py-10 text-slate-400">
                <p>No tasks found via this filter </p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div 
                  key={task.id}
                  className={`group flex items-center justify-between p-4 rounded-2xl border transition-all hover:shadow-md ${
                    task.completed 
                      ? "bg-slate-50 border-slate-100 opacity-75" 
                      : "bg-white border-slate-100 hover:border-indigo-200"
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleTask(task.id, task.completed)}
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        task.completed 
                          ? "bg-green-500 border-green-500" 
                          : "border-slate-300 hover:border-indigo-500"
                      }`}
                    >
                      {task.completed && (
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      )}
                    </button>

                    {/* Task Content */}
                    {editingId === task.id ? (
                      <div className="flex flex-1 items-center gap-2">
                        <input 
                          autoFocus
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          onBlur={saveEdit} // Optional: remove if you prefer explict save
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveEdit();
                            if (e.key === 'Escape') cancelEdit();
                          }}
                          className="flex-1 bg-white border border-indigo-300 rounded-lg px-2 py-1 outline-none text-slate-700 shadow-sm"
                        />
                        <button onMouseDown={saveEdit} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">Save</button>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span 
                            onClick={() => startEditing(task)}
                            className={`text-lg cursor-pointer select-none transition-all truncate ${
                                task.completed ? "text-slate-400 line-through decoration-2" : "text-slate-700"
                            }`}
                            >
                            {task.title}
                            </span>
                            
                            {/* EDITED BADGE */}
                            {isTaskEdited(task) && (
                                <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded uppercase tracking-wider">
                                    Edited
                                </span>
                            )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Icons (SVG) */}
                  {editingId !== task.id && (
                    <div className="flex items-center gap-1 ml-3">
                      <button 
                        onClick={() => startEditing(task)}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                        title="Edit"
                      >
                        {/* Pencil Icon */}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                      </button>
                      
                      <button 
                        onClick={() => deleteTask(task.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        title="Delete"
                      >
                        {/* Trash Icon */}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}