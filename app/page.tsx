"use client";

import { useState } from "react";
import { PlusCircle, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  // Correction du bug pour l'ajout
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  // Correction du bug d'accès au site !

  const editTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="max-w-md mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-gray-800">
              Ma Liste de Tâches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-6">
              <Input
                type="text"
                placeholder="Ajouter une tâche..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={addTodo}>
                <PlusCircle className="h-5 w-5" />
              </Button>
              <Button onClick={editTodo}>
                <Edit className="h-5 w-5" />
              </Button>
              {/* Voir la priorité */}
            </div>

            <div className="space-y-3">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo(todo.id)}
                    />
                    <span
                      className={`${
                        todo.completed ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {todo.text}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {todos.length === 0 && (
                <p className="text-center text-gray-500 py-4">
                  Aucune tâche pour le moment
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}