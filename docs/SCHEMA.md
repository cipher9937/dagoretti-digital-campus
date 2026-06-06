# Database Schema

## Entities

### User
- Core user account with authentication
- Supports roles: STUDENT, TEACHER, ADMIN, SUPER_ADMIN
- Linked to Student, Teacher, or Admin profiles

### Student
- Student profile with admission number
- Linked to Stream and Class
- Tracks attendance, submissions, library loans

### Teacher
- Teacher profile with employee number
- Linked to Department
- Manages assignments, online classes, attendance

### Admin
- Administrative user profile
- Different admin levels: SCHOOL_ADMIN, SYSTEM_ADMIN

### Department
- Academic departments (Mathematics, Languages, Sciences, etc.)
- Contains teachers and subjects

### Class
- Academic classes (Grade 10, Form 3, Form 4)
- Contains streams and subjects

### Stream
- Class divisions (e.g., B, G, Y for Grade 10)
- Has class teacher and students

### Subject
- Academic subjects with codes
- Linked to departments and grade levels
- Supports both CBC and 8-4-4 curricula

### Assignment
- Teacher-created assignments
- Supports multiple types: HOMEWORK, CLASSWORK, PROJECT, QUIZ, EXAM
- Tracks submissions and grades

### Submission
- Student assignment submissions
- Tracks status, score, feedback

### Resource
- Learning resources (notes, videos, worksheets)
- Supports multiple types and access levels

### LibraryItem
- Physical and digital library items
- Tracks availability and loans

### LibraryLoan
- Student borrowing records
- Tracks due dates and returns

### Announcement
- School-wide or targeted announcements
- Supports priority levels and pinning

### News
- Published news articles with rich content
- Supports categories, featured images, scheduling

### Event
- School events and calendar entries
- Tracks dates, locations, categories

### Attendance
- Student attendance records
- Daily and subject-specific tracking

### OnlineClass
- Scheduled online classes with Google Meet links
- Tracks recordings and notes

### Timetable
- Class schedules with subjects, teachers, rooms
- Supports term and academic year

### DiscussionBoard
- Subject-specific discussion forums
- Teacher moderated

### DiscussionPost
- Posts and replies in discussion boards
- Supports attachments and nesting

### Notification
- User notifications for various events
- Supports read status and links

### ActivityLog
- Audit trail of user actions
- Tracks IP, user agent, and details

### SystemSetting
- Configurable system settings
- Key-value pairs with categories

### Gallery
- Photo and video gallery items
- Supports categories and featured status

### Session
- User authentication sessions
- Tracks tokens, IP, user agent
