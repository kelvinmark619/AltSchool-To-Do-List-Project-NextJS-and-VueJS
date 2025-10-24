"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

type Todo = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};

type TodoDetailsProps = {
  id: string;
};

const TodoDetails: React.FC<TodoDetailsProps> = ({ id }) => {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const BASE_URL = `https://jsonplaceholder.typicode.com/todos/${id}`;

  useEffect(() => {
    const fetchTodo = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<Todo>(BASE_URL);
        setTodo(response.data);
      } catch (err: unknown) {
        let errorMessage = "Failed to load todo details.";
        if (axios.isAxiosError(err)) {
          if (err.response) {
            if (err.response.status === 404) {
              errorMessage = "Todo not found.";
            } else {
              errorMessage = `Error: ${err.response.status} - ${
                err.response.statusText || "Server Error"
              }`;
            }
          } else if (err.request) {
            errorMessage = "Network error. No response from server.";
          } else {
            errorMessage = err.message;
          }
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  if (loading) {
    return <p className="text-center">Loading todo details...</p>;
  }

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-500">{error}</p>
        <Link href="/" className="text-blue-600 underline">
          Back to Todo List
        </Link>
      </div>
    );
  }

  if (!todo) {
    return (
      <div className="text-center">
        <p>No todo found with ID: {id}</p>
        <Link href="/" className="text-blue-600 underline">
          Back to Todo List
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Todo Details</h2>
      <p>
        <strong>Title:</strong> {todo.title}
      </p>
      <p>
        <strong>ID:</strong> {todo.id}
      </p>
      <p>
        <strong>User ID:</strong> {todo.userId}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        <span className={todo.completed ? "text-green-600" : "text-yellow-600"}>
          {todo.completed ? "Completed" : "Pending"}
        </span>
      </p>
      <Link href="/" className="inline-block mt-4 text-blue-600 underline">
        Back to Todo List
      </Link>
    </div>
  );
};

export default TodoDetails;
