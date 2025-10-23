# 👩‍💻Student Attendance System (React + Firebase)📚🧑‍🎓

An SPA for managing course attendance. Users authenticate with Firebase, select a course, add/remove students, and toggle each student's status between Present, Absent, and Duty Leave. Built with React (Create React App), React Router, and a lightweight state container using React Context + useReducer. Firebase is initialized for Auth and Firestore, with Auth used in production code and Firestore ready for persistence.

![demo](https://github.com/AMMU-N-RAJ/Student-Attendance-System/blob/master/Att-Sym.gif)
![demo](https://github.com/AMMU-N-RAJ/Student-Attendance-System/blob/master/attsym2.gif)

## 🌟Features

- Email/password authentication (Firebase Auth)
- Course list with per-course attendance view
- Add and remove students per course
- Toggle attendance status (Present, Absent, Duty Leave) with colored badges
- Summary counts per status
- Protected Home route (redirects to Login if unauthenticated)

## ⚙️Tech stack

- React 18 (Create React App)
- React Router v6
- React Context + useReducer (global state)
- Firebase Web SDK (Auth, Firestore initialized, Analytics)
- CSS (component-scoped styles)

## 🍀Project structure

```
attendance-system/
	package.json
	public/
		index.html
		manifest.json
		robots.txt
	src/
		index.js              # Bootstraps React + StateProvider
		App.js                # Router, auth listener, page layout
		StateProvider.js      # React Context wrapper around useReducer
		reducer.js            # Global state + actions
		firebase.js           # Firebase initialization (Auth, Firestore, Analytics)
		Header.js/.css        # Top bar with sign-in/out and navigation
		Home.js/.css          # Courses view ("View Attendance" buttons)
		Checkout.js/.css      # Course details: student list + status toggles
		login.js/.css         # Login/registration with Firebase Auth
		App.css, index.css, reportWebVitals.js
```

## 😅How it works

### ⚙️App startup

- `src/index.js` creates the React root and wraps the app with `StateProvider`, exposing global state and `dispatch` via context.
- `src/App.js` registers `auth.onAuthStateChanged`. When the Firebase user changes, the app dispatches `SET_USER` to store the current user (or `null`).

### ⚙️Routing

- `react-router-dom` defines routes in `App.js`:
  - `/login` → `login.js`
  - `/` (Home) → `Home.js`
  - `/course/:courseId` (Course details) → `Checkout.js`
- `Home.js` redirects unauthenticated users to `/login`.

### ⚙️State management

- `StateProvider.js` provides a context wrapping `useReducer`.
- `reducer.js` defines `initialState` and actions:
  - `SET_USER` — store Firebase user object
  - `SELECT_COURSE` — set `selectedCourse`
  - `ADD_STUDENT` — append `{ id, name, status }` to a course
  - `DELETE_STUDENT` — remove student from a course by `id`
  - `UPDATE_ATTENDANCE` — change one student's `status`
- Note: By default, courses and students live only in memory. On refresh, they reset.

### ⚙️Authentication flow

- `login.js` provides sign-in and registration using Firebase Auth:
  - `signInWithEmailAndPassword(auth, email, password)`
  - `createUserWithEmailAndPassword(auth, email, password)`
- `Header.js` shows the current user and a Sign In/Out control; `auth.signOut()` logs out.
- `App.js` listens for auth changes and updates global `user`.

### ⚙️Attendance management

- `Home.js` lists courses from global state. Clicking a course dispatches `SELECT_COURSE` and navigates to `/course/:courseId`.
- `Checkout.js` shows the selected course's students:
  - Add a student via a simple form (`ADD_STUDENT`).
  - Delete a student (`DELETE_STUDENT`).
  - Click the colored status button to cycle status (`UPDATE_ATTENDANCE`).
- The page shows a live summary of counts by status.

### 😎Styling

- Plain CSS files per component (BEM-like class names). For example, `.home__courseButton` includes a hover interaction that highlights the "View Attendance" button text.

## 🍀Firebase configuration

Firebase is initialized in `src/firebase.js` with your project's Web config. For client web apps, these keys are public and not secret, but you must secure your Firestore rules before enabling persistence.

If you want to persist courses and students:

- Create a `courses` collection in Firestore where each course doc contains a subcollection `students`.
- Load data on app startup (e.g., in `App.js` or a custom hook) and dispatch to initialize state.
- On `ADD_STUDENT`, `DELETE_STUDENT`, and `UPDATE_ATTENDANCE`, write changes to Firestore.

> Tip: Keep Firestore reads/writes in a small service module (e.g., `src/services/firebaseService.js`) to keep components clean and testable.

## 👩‍💻Local development

Prerequisites:

- Node.js 16+ and npm

Install dependencies:

```pwsh
npm install
```

Start the dev server:

```pwsh
npm start
```

Run tests (if added):

```pwsh
npm test
```

Build for production:

```pwsh
npm run build
```

## 👩‍💻Deployment

The production build is output to `build/`. You can deploy it to any static host (e.g., Firebase Hosting, Vercel, Netlify, GitHub Pages). If using Firebase Hosting, follow `firebase init hosting` and deploy the `build` folder.

## 🫠Known limitations

- Courses and students are not persisted by default; a page refresh resets data.
- Minimal error handling and validation in forms.
- Firestore rules are not configured in this repo; configure them before enabling writes.

## 🛣️ Roadmap / next steps

- Persist courses and students to Firestore (read on load, write on changes).
- Add unit tests for `reducer.js` and integration tests for the main flows.
- Improve accessibility and keyboard navigation across forms and buttons.
- Add role-based access (e.g., instructors vs. viewers), if needed.
- Add loading/skeleton states and optimistic UI updates for Firestore.

---

Made with React and Firebase. Contributions and suggestions are welcome.
