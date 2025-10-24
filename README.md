# AltSchool To‑Do List Project
A simple, user-friendly to‑do list app built to help users manage tasks efficiently.

## Features
- Add, edit, and delete tasks
- Mark tasks as completed
- Responsive UI for web and mobile
- Live deployment: https://alt-school-to-do-list-project.vercel.app/

## Tech Stack & Architecture
- Frontend: HTML5, CSS3, JavaScript (ES6+)
- Storage: RESTful API
- Hosting: Vercel 
- Architecture: Separation of concerns with clear modules for UI, state management, and persistence

## Installation & Setup
* Clone the repo
- git clone https://github.com/kelvinmark619/AltSchool-To-do-List-Project.git
- cd AltSchool-To-do-List-Project

* Frontend:
- cd frontend
- npm install
- npm run dev

## Available Scripts
- From the project root:

Script =>	Description
- npm run dev =>	Start the development server
- npm run build	=> Bundle optimized production assets
- npm run start =>	Launch the backend server
- npm test => Run unit/integration tests

## API Documentation
- GET /tasks – retrieve all tasks
- POST /tasks – add a new task
- PUT /tasks/:id – update a task
- DELETE /tasks/:id – remove a task

## Known Issues
- No user authentication—data persists only in this browser/session
- No backend: local storage may be cleared on browser reset
- Missing validation (e.g., empty input, duplicate tasks
- UI enhancements and accessibility improvements needed

## Future Enhancements
- Add backend + database (e.g., Firebase, Express + MongoDB)
- Implement user authentication and personalization
- Support task due dates and reminder notifications
- Categorize tasks (e.g., work, personal)
- Improve UI/UX and mobile responsiveness
- Add filtering, sorting, search functionality
- Add task sharing & collaboration features
- Include analytics (completed tasks per week, etc.)
