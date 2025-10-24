import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "../styles/todoList.css";

// Define the shape of a Todo
type Todo = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};

//  type for useParams
type TodoParams = {
  id: string;
};

const TodoDetails: React.FC = () => {
  const { id } = useParams<TodoParams>();

  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

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
            errorMessage =
              "Network error. No response received from server.";
          } else {
            errorMessage = err.message;
          }
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }

        setError(new Error(errorMessage));
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id, BASE_URL]);

  if (loading) {
    return (
      <main
        className="todo-detail-container"
        role="status"
        aria-live="polite"
      >
        <div className="todo-detail-wrapper">
          <p className="loading-message">Loading todo details...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main
        className="todo-detail-container"
        role="alert"
        aria-live="assertive"
      >
        <div className="todo-detail-wrapper">
          <p className="error-message">{error.message}</p>
          <Link to="/" className="back-button">
            Back to Todo List
          </Link>
        </div>
      </main>
    );
  }

  if (!todo) {
    return (
      <main className="todo-detail-container">
        <div className="todo-detail-wrapper">
          <p className="error-message">No todo found with ID: {id}</p>
          <Link to="/" className="back-button">
            Back to Todo List
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="todo-detail-container">
      <div className="todo-detail-wrapper">
        <header className="detail-header">
          <h2>Todo Details</h2>
        </header>
        <section className="detail-info">
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
            <span
              className={
                todo.completed ? "status-completed" : "status-pending"
              }
            >
              {todo.completed ? "Completed" : "Pending"}
            </span>
          </p>
        </section>
        <Link to="/" className="back-button" aria-label="Back to todo list">
          Back to Todo List
        </Link>
      </div>
    </main>
  );
};

export default TodoDetails;
