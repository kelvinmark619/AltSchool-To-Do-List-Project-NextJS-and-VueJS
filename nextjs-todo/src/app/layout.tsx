"use client";

import "./globals.css";
import { ReactNode, useEffect, useState } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme((prev: "light" | "dark") =>
      prev === "light" ? "dark" : "light"
    );
  };

  return (
    <html lang="en">
      <body>
        {/* Pass theme + toggle function down to children if needed */}
        {typeof children === "function"
          ? (children as any)({ toggleTheme, currentTheme })
          : children}

        <footer className="text-center py-4">
          <p>Built by Odunayo Alt School Exam Project</p>
        </footer>
      </body>
    </html>
  );
}
