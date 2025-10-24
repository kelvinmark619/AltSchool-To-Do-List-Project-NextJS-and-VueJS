"use client";

import TodoList from "./components/TodoList"

export default function HomePage() {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setCurrentTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <TodoList toggleTheme={toggleTheme} currentTheme={currentTheme} />
  );
}
