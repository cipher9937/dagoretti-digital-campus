# API Documentation

## Authentication

### POST /api/auth/register
Register a new user account.

### POST /api/auth/login
Authenticate and receive tokens.

### POST /api/auth/refresh
Refresh access token using refresh token.

### POST /api/auth/logout
Logout and invalidate tokens.

### GET /api/auth/me
Get current user profile.

## Users

### GET /api/users
List all users (Admin only).

### GET /api/users/:id
Get user details.

### PATCH /api/users/:id
Update user information.

### DELETE /api/users/:id
Delete user (Super Admin only).

## Students

### GET /api/students
List all students.

### POST /api/students
Create new student.

### GET /api/students/:id
Get student details.

### PATCH /api/students/:id
Update student information.

## Teachers

### GET /api/teachers
List all teachers.

### POST /api/teachers
Create new teacher.

### GET /api/teachers/:id
Get teacher details.

## Classes

### GET /api/classes
List all classes.

### GET /api/classes/:id
Get class details.

## Subjects

### GET /api/subjects
List all subjects.

### GET /api/subjects/:id
Get subject details.

## Assignments

### GET /api/assignments
List assignments.

### POST /api/assignments
Create assignment.

### GET /api/assignments/:id
Get assignment details.

### POST /api/assignments/:id/submit
Submit assignment.

### PATCH /api/assignments/:id/grade
Grade assignment.

## Resources

### GET /api/resources
List resources.

### POST /api/resources
Create resource.

### GET /api/resources/:id
Get resource details.

## Library

### GET /api/library
List library items.

### POST /api/library
Create library item.

### POST /api/library/:id/borrow
Borrow item.

### POST /api/library/:id/return
Return item.

## News

### GET /api/news
List news articles.

### POST /api/news
Create news article.

### GET /api/news/:slug
Get news article.

### PATCH /api/news/:id
Update news article.

### DELETE /api/news/:id
Delete news article.

## Events

### GET /api/events
List events.

### POST /api/events
Create event.

### GET /api/events/:id
Get event details.

## Announcements

### GET /api/announcements
List announcements.

### POST /api/announcements
Create announcement.

## Attendance

### GET /api/attendance
List attendance records.

### POST /api/attendance/mark
Mark attendance.

## Online Classes

### GET /api/online-classes
List online classes.

### POST /api/online-classes
Create online class.

## Timetables

### GET /api/timetables
List timetables.

### POST /api/timetables
Create timetable entry.

## Discussions

### GET /api/discussions/boards
List discussion boards.

### POST /api/discussions/boards
Create discussion board.

### GET /api/discussions/boards/:id
Get board with posts.

### POST /api/discussions/boards/:id/posts
Create post.

## Notifications

### GET /api/notifications
List notifications.

### PATCH /api/notifications/:id/read
Mark as read.

### PATCH /api/notifications/read-all
Mark all as read.

## Gallery

### GET /api/gallery
List gallery items.

### POST /api/gallery
Create gallery item.

## Settings

### GET /api/settings
List system settings.

### GET /api/settings/:key
Get setting value.

### PATCH /api/settings/:key
Update setting.

## Dashboard

### GET /api/dashboard/admin
Admin dashboard data.

### GET /api/dashboard/teacher
Teacher dashboard data.

### GET /api/dashboard/student
Student dashboard data.
