import axios from "axios";

type Todo = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};

export default async function TodoDetails({
  params,
}: {
  params: { id: string };
}) {
  const BASE_URL = `https://jsonplaceholder.typicode.com/todos/${params.id}`;

  let todo: Todo | null = null;
  let errorMessage: string | null = null;

  try {
    const response = await axios.get<Todo>(BASE_URL);
    todo = response.data;
  } catch (err: unknown) {
    errorMessage = "Failed to load todo details.";
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
        errorMessage = "Network error. No response received from server.";
      } else {
        errorMessage = err.message;
      }
    } else if (err instanceof Error) {
      errorMessage = err.message;
    }
  }

  if (errorMessage) {
    return (
      <main className="todo-detail-container" role="alert" aria-live="assertive">
        <div className="todo-detail-wrapper">
          <p className="error-message">{errorMessage}</p>
          <a href="/" className="back-button">
            Back to Todo List
          </a>
        </div>
      </main>
    );
  }

  if (!todo) {
    return (
      <main className="todo-detail-container">
        <div className="todo-detail-wrapper">
          <p className="error-message">No todo found with ID: {params.id}</p>
          <a href="/" className="back-button">
            Back to Todo List
          </a>
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
              className={todo.completed ? "status-completed" : "status-pending"}
            >
              {todo.completed ? "Completed" : "Pending"}
            </span>
          </p>
        </section>
        <a href="/" className="back-button" aria-label="Back to todo list">
          Back to Todo List
        </a>
      </div>
    </main>
  );
}
