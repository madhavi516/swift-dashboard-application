#  dashboard application

This project is built for the ** dashboard-application **, implementing a responsive React dashboard and profile system using plain JavaScript. It covers all assignment requirements including pagination, searching, sorting, state persistence, and routing.

---

##  Features

### Profile Screen
- Loads the first user from: `https://jsonplaceholder.typicode.com/users`
- Displays user details in a read-only format
- Back navigation to dashboard
- Routing handled via `react-router-dom`

###  Comments Dashboard
- Loads 500 comments from: `https://jsonplaceholder.typicode.com/comments`
- Displays comments in a custom paginated table
- Custom pagination (page sizes: 10, 50, 100) – no libraries used
- Partial search by `name` and `email`
- Sorting on `Post ID`, `Name`, `Email`
- Cycles: `None → Asc → Desc → None`
- Only one column can be sorted at a time
- State persistence: page, pageSize, sortBy, sortOrder, search are saved in `localStorage`

###  User Details (Name Click)
- Clicking on a name in the comments table opens `/user/:id` route
- Fetches comment and maps to user by email
- Displays full user details + associated comment

---

## Folder Structure
