import { PrismaClient, Role, GradeLevel, Gender, AssignmentType, ResourceType, LibraryType, NewsStatus, EventStatus, AttendanceStatus, UserStatus, AdminLevel } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data
  await prisma.$transaction([
    prisma.activityLog.deleteMany(),
    prisma.notification.deleteMany(),
    prisma.discussionPost.deleteMany(),
    prisma.discussionBoard.deleteMany(),
    prisma.submission.deleteMany(),
    prisma.assignment.deleteMany(),
    prisma.enrollment.deleteMany(),
    prisma.subjectAssignment.deleteMany(),
    prisma.timetable.deleteMany(),
    prisma.onlineClass.deleteMany(),
    prisma.attendance.deleteMany(),
    prisma.libraryLoan.deleteMany(),
    prisma.libraryItem.deleteMany(),
    prisma.resource.deleteMany(),
    prisma.announcement.deleteMany(),
    prisma.news.deleteMany(),
    prisma.event.deleteMany(),
    prisma.gallery.deleteMany(),
    prisma.student.deleteMany(),
    prisma.teacher.deleteMany(),
    prisma.admin.deleteMany(),
    prisma.session.deleteMany(),
    prisma.stream.deleteMany(),
    prisma.class.deleteMany(),
    prisma.subject.deleteMany(),
    prisma.department.deleteMany(),
    prisma.user.deleteMany(),
    prisma.systemSetting.deleteMany(),
  ]);

  const hashedPassword = await bcrypt.hash('Dagoretti@2024', 12);

  // Create Super Admin
  const superAdmin = await prisma.user.create({
    data: {
      email: 'admin@dagorettihigh.ac.ke',
      password: hashedPassword,
      firstName: 'System',
      lastName: 'Administrator',
      role: Role.SUPER_ADMIN,
      status: UserStatus.ACTIVE,
      admin: {
        create: { adminLevel: AdminLevel.SYSTEM_ADMIN }
      }
    }
  });

  // Create School Admin
  const schoolAdmin = await prisma.user.create({
    data: {
      email: 'principal@dagorettihigh.ac.ke',
      password: hashedPassword,
      firstName: 'Lawrence',
      lastName: 'Nyakweba',
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
      admin: {
        create: { adminLevel: AdminLevel.SCHOOL_ADMIN, department: 'Administration' }
      }
    }
  });

  // Create Departments
  const departments = await prisma.$transaction([
    prisma.department.create({ data: { name: 'Mathematics', code: 'MATH', description: 'Mathematics and Statistics' } }),
    prisma.department.create({ data: { name: 'Languages', code: 'LANG', description: 'English, Kiswahili, and Foreign Languages' } }),
    prisma.department.create({ data: { name: 'Sciences', code: 'SCI', description: 'Physics, Chemistry, Biology, and Agriculture' } }),
    prisma.department.create({ data: { name: 'Humanities', code: 'HUM', description: 'History, Geography, and CRE' } }),
    prisma.department.create({ data: { name: 'Technical', code: 'TECH', description: 'Computer Studies, Woodwork, and Metalwork' } }),
    prisma.department.create({ data: { name: 'Business', code: 'BUS', description: 'Business Studies, Economics, and Accounting' } }),
    prisma.department.create({ data: { name: 'Creative Arts', code: 'ARTS', description: 'Music, Art, and Drama' } }),
    prisma.department.create({ data: { name: 'Sports', code: 'SPORT', description: 'Physical Education and Sports' } }),
  ]);

  // Create Classes
  const classes = await prisma.$transaction([
    prisma.class.create({ data: { name: 'Grade 10', gradeLevel: GradeLevel.GRADE_10, year: 2024 } }),
    prisma.class.create({ data: { name: 'Form 3', gradeLevel: GradeLevel.FORM_3, year: 2024 } }),
    prisma.class.create({ data: { name: 'Form 4', gradeLevel: GradeLevel.FORM_4, year: 2024 } }),
  ]);

  // Create Streams
  const streams = await prisma.$transaction([
    prisma.stream.create({ data: { name: 'B', classId: classes[0].id, capacity: 45 } }),
    prisma.stream.create({ data: { name: 'G', classId: classes[0].id, capacity: 45 } }),
    prisma.stream.create({ data: { name: 'Y', classId: classes[0].id, capacity: 45 } }),
    prisma.stream.create({ data: { name: 'P', classId: classes[1].id, capacity: 45 } }),
    prisma.stream.create({ data: { name: 'W', classId: classes[1].id, capacity: 45 } }),
    prisma.stream.create({ data: { name: 'C', classId: classes[1].id, capacity: 45 } }),
    prisma.stream.create({ data: { name: 'M', classId: classes[2].id, capacity: 45 } }),
    prisma.stream.create({ data: { name: 'R', classId: classes[2].id, capacity: 45 } }),
  ]);

  // Create Subjects
  const subjects = await prisma.$transaction([
    // Grade 10 CBC Subjects
    prisma.subject.create({ data: { name: 'Mathematics', code: 'MATH10', departmentId: departments[0].id, gradeLevel: [GradeLevel.GRADE_10], isCore: true, creditHours: 5 } }),
    prisma.subject.create({ data: { name: 'English', code: 'ENG10', departmentId: departments[1].id, gradeLevel: [GradeLevel.GRADE_10], isCore: true, creditHours: 5 } }),
    prisma.subject.create({ data: { name: 'Kiswahili', code: 'KIS10', departmentId: departments[1].id, gradeLevel: [GradeLevel.GRADE_10], isCore: true, creditHours: 4 } }),
    prisma.subject.create({ data: { name: 'Biology', code: 'BIO10', departmentId: departments[2].id, gradeLevel: [GradeLevel.GRADE_10], isCore: true, creditHours: 4 } }),
    prisma.subject.create({ data: { name: 'Chemistry', code: 'CHEM10', departmentId: departments[2].id, gradeLevel: [GradeLevel.GRADE_10], isCore: true, creditHours: 4 } }),
    prisma.subject.create({ data: { name: 'Physics', code: 'PHY10', departmentId: departments[2].id, gradeLevel: [GradeLevel.GRADE_10], isCore: false, creditHours: 4 } }),
    prisma.subject.create({ data: { name: 'Computer Studies', code: 'COMP10', departmentId: departments[4].id, gradeLevel: [GradeLevel.GRADE_10], isCore: false, creditHours: 3 } }),

    // Form 3 & 4 8-4-4 Subjects
    prisma.subject.create({ data: { name: 'Mathematics', code: 'MATH34', departmentId: departments[0].id, gradeLevel: [GradeLevel.FORM_3, GradeLevel.FORM_4], isCore: true, creditHours: 5 } }),
    prisma.subject.create({ data: { name: 'English', code: 'ENG34', departmentId: departments[1].id, gradeLevel: [GradeLevel.FORM_3, GradeLevel.FORM_4], isCore: true, creditHours: 5 } }),
    prisma.subject.create({ data: { name: 'Kiswahili', code: 'KIS34', departmentId: departments[1].id, gradeLevel: [GradeLevel.FORM_3, GradeLevel.FORM_4], isCore: true, creditHours: 4 } }),
    prisma.subject.create({ data: { name: 'Biology', code: 'BIO34', departmentId: departments[2].id, gradeLevel: [GradeLevel.FORM_3, GradeLevel.FORM_4], isCore: false, creditHours: 4 } }),
    prisma.subject.create({ data: { name: 'Chemistry', code: 'CHEM34', departmentId: departments[2].id, gradeLevel: [GradeLevel.FORM_3, GradeLevel.FORM_4], isCore: false, creditHours: 4 } }),
    prisma.subject.create({ data: { name: 'Physics', code: 'PHY34', departmentId: departments[2].id, gradeLevel: [GradeLevel.FORM_3, GradeLevel.FORM_4], isCore: false, creditHours: 4 } }),
    prisma.subject.create({ data: { name: 'History', code: 'HIST34', departmentId: departments[3].id, gradeLevel: [GradeLevel.FORM_3, GradeLevel.FORM_4], isCore: false, creditHours: 3 } }),
    prisma.subject.create({ data: { name: 'Geography', code: 'GEO34', departmentId: departments[3].id, gradeLevel: [GradeLevel.FORM_3, GradeLevel.FORM_4], isCore: false, creditHours: 3 } }),
    prisma.subject.create({ data: { name: 'CRE', code: 'CRE34', departmentId: departments[3].id, gradeLevel: [GradeLevel.FORM_3, GradeLevel.FORM_4], isCore: false, creditHours: 3 } }),
    prisma.subject.create({ data: { name: 'Business Studies', code: 'BUS34', departmentId: departments[5].id, gradeLevel: [GradeLevel.FORM_3, GradeLevel.FORM_4], isCore: false, creditHours: 3 } }),
    prisma.subject.create({ data: { name: 'Computer Studies', code: 'COMP34', departmentId: departments[4].id, gradeLevel: [GradeLevel.FORM_3, GradeLevel.FORM_4], isCore: false, creditHours: 3 } }),
    prisma.subject.create({ data: { name: 'Agriculture', code: 'AGR34', departmentId: departments[2].id, gradeLevel: [GradeLevel.FORM_3, GradeLevel.FORM_4], isCore: false, creditHours: 3 } }),
  ]);

  // Create Teachers
  const teacherData = [
    { firstName: 'James', lastName: 'Mwangi', email: 'j.mwangi@dagorettihigh.ac.ke', dept: departments[0].id, spec: 'Pure Mathematics' },
    { firstName: 'Grace', lastName: 'Wanjiku', email: 'g.wanjiku@dagorettihigh.ac.ke', dept: departments[1].id, spec: 'English Literature' },
    { firstName: 'Peter', lastName: 'Ochieng', email: 'p.ochieng@dagorettihigh.ac.ke', dept: departments[2].id, spec: 'Chemistry' },
    { firstName: 'Mary', lastName: 'Kamau', email: 'm.kamau@dagorettihigh.ac.ke', dept: departments[3].id, spec: 'History & Government' },
    { firstName: 'David', lastName: 'Kipchirchir', email: 'd.kipchirchir@dagorettihigh.ac.ke', dept: departments[4].id, spec: 'Computer Science' },
    { firstName: 'Sarah', lastName: 'Njoroge', email: 's.njoroge@dagorettihigh.ac.ke', dept: departments[5].id, spec: 'Business Studies' },
    { firstName: 'Joseph', lastName: 'Kimani', email: 'j.kimani@dagorettihigh.ac.ke', dept: departments[2].id, spec: 'Physics' },
    { firstName: 'Elizabeth', lastName: 'Wambui', email: 'e.wambui@dagorettihigh.ac.ke', dept: departments[2].id, spec: 'Biology' },
    { firstName: 'John', lastName: 'Mutua', email: 'j.mutua@dagorettihigh.ac.ke', dept: departments[1].id, spec: 'Kiswahili' },
    { firstName: 'Rose', lastName: 'Achieng', email: 'r.achieng@dagorettihigh.ac.ke', dept: departments[6].id, spec: 'Music & Drama' },
  ];

  const teachers = [];
  for (let i = 0; i < teacherData.length; i++) {
    const t = teacherData[i];
    const user = await prisma.user.create({
      data: {
        email: t.email,
        password: hashedPassword,
        firstName: t.firstName,
        lastName: t.lastName,
        role: Role.TEACHER,
        status: UserStatus.ACTIVE,
        teacher: {
          create: {
            employeeNumber: `TCH${String(i + 1).padStart(3, '0')}`,
            departmentId: t.dept,
            specialization: t.spec,
            gender: i % 2 === 0 ? Gender.MALE : Gender.FEMALE,
          }
        }
      },
      include: { teacher: true }
    });
    teachers.push(user);
  }

  // Create Students
  const firstNames = ['John', 'Peter', 'James', 'David', 'Michael', 'Daniel', 'Joseph', 'Samuel', 'Stephen', 'Patrick', 'George', 'Andrew', 'Benjamin', 'Charles', 'Edward', 'Francis', 'Henry', 'Isaac', 'Kevin', 'Mark', 'Nicholas', 'Oscar', 'Paul', 'Richard', 'Thomas', 'William', 'Alex', 'Brian', 'Chris', 'Dennis', 'Eric', 'Frank', 'Gerald', 'Harrison', 'Ian', 'Jack', 'Kennedy', 'Leonard', 'Martin', 'Nathan', 'Oliver', 'Philip', 'Quincy', 'Robert', 'Simon', 'Timothy', 'Victor', 'Walter', 'Xavier', 'Zachary'];
  const lastNames = ['Mwangi', 'Kamau', 'Ochieng', 'Kipchirchir', 'Kimani', 'Njoroge', 'Wanjiku', 'Mutua', 'Kariuki', 'Kibet', 'Omondi', 'Odhiambo', 'Onyango', 'Wanyama', 'Wekesa', 'Barasa', 'Makokha', 'Simiyu', 'Wamalwa', 'Musyoka', 'Kilonzo', 'Munyao', 'Kivuva', 'Muli', 'Kyalo', 'Mbugua', 'Githinji', 'Karanja', 'Muriithi', 'Ndungu', 'Waweru', 'Thuo', 'Kamau', 'Gachanja', 'Mwangi', 'Njuguna', 'Kariuki', 'Kibet', 'Omondi', 'Odhiambo'];

  const students = [];
  for (let i = 0; i < 120; i++) {
    const grade = i < 40 ? GradeLevel.GRADE_10 : i < 80 ? GradeLevel.FORM_3 : GradeLevel.FORM_4;
    const streamIndex = i < 40 ? i % 3 : i < 80 ? 3 + (i % 3) : 6 + (i % 2);
    const admissionYear = grade === GradeLevel.GRADE_10 ? 2024 : grade === GradeLevel.FORM_3 ? 2022 : 2021;
    const admissionNum = `${admissionYear}${String(i + 1).padStart(4, '0')}`;

    const user = await prisma.user.create({
      data: {
        email: `student${i + 1}@dagorettihigh.ac.ke`,
        password: hashedPassword,
        firstName: firstNames[i % firstNames.length],
        lastName: lastNames[i % lastNames.length],
        role: Role.STUDENT,
        status: UserStatus.ACTIVE,
        student: {
          create: {
            admissionNumber: admissionNum,
            gender: i % 3 === 0 ? Gender.FEMALE : Gender.MALE,
            gradeLevel: grade,
            streamId: streams[streamIndex].id,
            dateOfBirth: new Date(2006 + (i % 4), (i % 12), 15),
            parentName: `${lastNames[(i + 5) % lastNames.length]} ${firstNames[(i + 3) % firstNames.length]}`,
            parentPhone: `+2547${String(10000000 + i).slice(0, 8)}`,
          }
        }
      },
      include: { student: true }
    });
    students.push(user);
  }

  // Create Assignments
  const assignments = [];
  for (let i = 0; i < 20; i++) {
    const assignment = await prisma.assignment.create({
      data: {
        title: `Assignment ${i + 1}: ${['Mathematics Problem Set', 'English Essay', 'Chemistry Lab Report', 'History Research', 'Physics Problems', 'Biology Practical', 'Kiswahili Insha', 'Business Case Study', 'Computer Programming', 'Geography Project'][i % 10]}`,
        description: `Complete the ${['problem set', 'essay', 'lab report', 'research paper', 'problem set', 'practical', 'insha', 'case study', 'programming task', 'project'][i % 10]} covering topics from weeks ${(i % 4) + 1}-${(i % 4) + 3}.`,
        subjectId: subjects[i % subjects.length].id,
        teacherId: teachers[i % teachers.length].teacher!.id,
        type: [AssignmentType.HOMEWORK, AssignmentType.PROJECT, AssignmentType.QUIZ, AssignmentType.CLASSWORK][i % 4],
        dueDate: new Date(Date.now() + (i % 7 + 1) * 24 * 60 * 60 * 1000),
        maxScore: [100, 50, 30, 20][i % 4],
        status: i < 15 ? 'ACTIVE' : 'CLOSED',
      }
    });
    assignments.push(assignment);
  }

  // Create Submissions
  for (let i = 0; i < 50; i++) {
    const student = students[i % students.length];
    const assignment = assignments[i % assignments.length];
    await prisma.submission.create({
      data: {
        assignmentId: assignment.id,
        studentId: student.student!.id,
        content: `Submitted work for ${assignment.title}`,
        status: i % 3 === 0 ? 'GRADED' : i % 3 === 1 ? 'SUBMITTED' : 'PENDING',
        score: i % 3 === 0 ? Math.floor(Math.random() * 40) + 60 : null,
        submittedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      }
    });
  }

  // Create Resources
  for (let i = 0; i < 30; i++) {
    await prisma.resource.create({
      data: {
        title: `${['Mathematics', 'English', 'Chemistry', 'Physics', 'Biology', 'History', 'Geography', 'CRE', 'Business', 'Computer'][i % 10]} ${['Notes', 'Video Lecture', 'Worksheet', 'Past Paper', 'Revision Guide', 'Presentation', 'Lab Manual', 'Textbook Chapter', 'Tutorial', 'Research Paper'][i % 10]} ${i + 1}`,
        description: `Comprehensive ${['notes', 'video lecture', 'worksheet', 'past paper', 'revision guide', 'presentation', 'lab manual', 'textbook chapter', 'tutorial', 'research paper'][i % 10]} for ${['Grade 10', 'Form 3', 'Form 4'][i % 3]} students.`,
        type: [ResourceType.NOTE, ResourceType.VIDEO, ResourceType.WORKSHEET, ResourceType.PAST_PAPER, ResourceType.TEXTBOOK, ResourceType.PRESENTATION][i % 6],
        subjectId: subjects[i % subjects.length].id,
        teacherId: teachers[i % teachers.length].teacher!.id,
        accessLevel: 'ALL',
        downloadCount: Math.floor(Math.random() * 200),
        viewCount: Math.floor(Math.random() * 500),
      }
    });
  }

  // Create Library Items
  for (let i = 0; i < 40; i++) {
    await prisma.libraryItem.create({
      data: {
        title: `${['Advanced Mathematics', 'English Grammar', 'Chemistry Principles', 'Physics Fundamentals', 'Biology Textbook', 'Kenyan History', 'World Geography', 'Christian Religious Education', 'Business Management', 'Computer Programming', 'Kiswahili Fasihi', 'Agriculture Science', 'Music Theory', 'Art & Design', 'Physical Education', 'Economics Basics', 'Accounting Principles', 'French Language', 'German Language', 'Technical Drawing'][i % 20]} ${['Volume 1', 'Volume 2', 'Complete Guide', 'Reference Book', 'Study Companion', 'Practical Manual', 'Theory Book', 'Workbook', 'Revision Book', 'Advanced Text'][i % 10]}`,
        author: `${['Dr.', 'Prof.', 'Mr.', 'Mrs.', 'Ms.'][i % 5]} ${['Mwangi', 'Kamau', 'Ochieng', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor'][i % 20]}`,
        type: [LibraryType.TEXTBOOK, LibraryType.REFERENCE, LibraryType.DIGITAL, LibraryType.JOURNAL][i % 4],
        category: ['Mathematics', 'Languages', 'Sciences', 'Humanities', 'Technical', 'Business', 'Arts', 'Sports'][i % 8],
        totalCopies: [3, 5, 2, 10, 1, 4, 6, 8][i % 8],
        availableCopies: [2, 3, 1, 8, 0, 3, 4, 6][i % 8],
        location: `Library Section ${String.fromCharCode(65 + (i % 8))}, Shelf ${(i % 10) + 1}`,
      }
    });
  }

  // Create News
  const newsData = [
    {
      title: 'Dagoretti High School Ranks Among Top 500 in KCSE 2024',
      slug: 'dagoretti-top-500-kcse-2024',
      excerpt: 'Our students have once again demonstrated academic excellence in the national examinations.',
      content: 'Dagoretti High School is proud to announce that we have maintained our position among the top 500 schools nationally in the Kenya Certificate of Secondary Education (KCSE) examinations. This achievement reflects the dedication of our students, teachers, and the entire school community. The Chief Principal, Mr. Lawrence Nyakweba, attributed this success to the school's commitment to academic excellence and holistic development.',
      category: 'Academic Excellence',
      featuredImage: '/images/news/kcse-2024.jpg',
      status: NewsStatus.PUBLISHED,
      publishedAt: new Date('2024-01-15'),
    },
    {
      title: 'Giants of Africa Unveil World-Class Basketball Court',
      slug: 'giants-of-africa-basketball-court',
      excerpt: 'A state-of-the-art basketball facility donated by Giants of Africa is now open for our students.',
      content: 'Dagoretti High School officially unveiled a world-class basketball court donated by Giants of Africa, the foundation led by Toronto Raptors President Masai Ujiri. The court features professional-grade flooring, lighting, and equipment. This facility will significantly enhance our sports program and provide our talented basketball players with the resources they need to compete at the highest levels. The school basketball team has already begun training on the new court.',
      category: 'Sports',
      featuredImage: '/images/news/basketball-court.jpg',
      status: NewsStatus.PUBLISHED,
      publishedAt: new Date('2023-01-20'),
    },
    {
      title: 'CBC Transition: Grade 10 Program Launched Successfully',
      slug: 'cbc-grade-10-launch',
      excerpt: 'Our school has successfully transitioned to the Competency-Based Curriculum with the launch of Grade 10.',
      content: 'Following the national transition to the Competency-Based Curriculum (CBC), Dagoretti High School has successfully launched its Grade 10 program. The new curriculum offers three pathways: STEM, Social Sciences, and Arts & Sports. Our students are now engaged in project-based learning, practical assessments, and competency development. The school has invested in new laboratories, workshops, and digital resources to support this transition.',
      category: 'Curriculum',
      featuredImage: '/images/news/cbc-launch.jpg',
      status: NewsStatus.PUBLISHED,
      publishedAt: new Date('2024-02-01'),
    },
    {
      title: 'Alumni Reunion 2024: Celebrating 62 Years of Excellence',
      slug: 'alumni-reunion-2024',
      excerpt: 'Former students gathered to celebrate the school's rich history and contribute to its future.',
      content: 'The Dagoretti High School Alumni Association held its annual reunion, bringing together former students from across the globe. The event celebrated 62 years since the school's official inauguration in 1963. Alumni made significant contributions to the school's development fund, supporting infrastructure improvements and scholarship programs for deserving students. The Chief Principal highlighted the importance of alumni engagement in maintaining the school's legacy.',
      category: 'Community',
      featuredImage: '/images/news/alumni-reunion.jpg',
      status: NewsStatus.PUBLISHED,
      publishedAt: new Date('2024-03-15'),
    },
    {
      title: 'New Computer Laboratory Equipped with 50 Modern PCs',
      slug: 'new-computer-lab',
      excerpt: 'Our ICT infrastructure has been significantly upgraded with a new computer laboratory.',
      content: 'Dagoretti High School has opened a new computer laboratory equipped with 50 modern desktop computers, high-speed internet connectivity, and interactive smart boards. This facility will support the Computer Studies curriculum, digital literacy programs, and online learning initiatives. The laboratory is also available for students to use during their free time for research and project work.',
      category: 'Infrastructure',
      featuredImage: '/images/news/computer-lab.jpg',
      status: NewsStatus.PUBLISHED,
      publishedAt: new Date('2024-04-10'),
    },
    {
      title: 'Science Congress 2024: Students Win Regional Awards',
      slug: 'science-congress-2024',
      excerpt: 'Our students showcased innovative projects at the regional Science Congress.',
      content: 'Students from Dagoretti High School participated in the Nairobi Regional Science Congress and won multiple awards for their innovative projects. Projects included sustainable agriculture solutions, renewable energy prototypes, and mobile applications for education. The school's Science Club has been instrumental in nurturing student interest in STEM fields.',
      category: 'Academic Excellence',
      featuredImage: '/images/news/science-congress.jpg',
      status: NewsStatus.PUBLISHED,
      publishedAt: new Date('2024-05-20'),
    },
  ];

  for (const news of newsData) {
    await prisma.news.create({
      data: { ...news, authorId: schoolAdmin.id, viewCount: Math.floor(Math.random() * 1000) + 100 }
    });
  }

  // Create Events
  const eventsData = [
    {
      title: 'Annual Sports Day 2024',
      description: 'Our annual inter-house sports competition featuring athletics, football, basketball, and more.',
      location: 'School Sports Ground',
      startDate: new Date('2024-06-15T08:00:00'),
      endDate: new Date('2024-06-15T17:00:00'),
      category: 'Sports',
      image: '/images/events/sports-day.jpg',
      status: EventStatus.UPCOMING,
    },
    {
      title: 'Career Day & University Fair',
      description: 'Form 4 students meet with university representatives and industry professionals.',
      location: 'Kenyatta Hall',
      startDate: new Date('2024-07-20T09:00:00'),
      endDate: new Date('2024-07-20T16:00:00'),
      category: 'Academic',
      image: '/images/events/career-day.jpg',
      status: EventStatus.UPCOMING,
    },
    {
      title: 'Music & Drama Festival',
      description: 'Annual celebration of performing arts featuring choirs, drama, and traditional dances.',
      location: 'School Amphitheatre',
      startDate: new Date('2024-08-10T14:00:00'),
      endDate: new Date('2024-08-12T18:00:00'),
      category: 'Cultural',
      image: '/images/events/music-festival.jpg',
      status: EventStatus.UPCOMING,
    },
    {
      title: 'Founders Day Celebration',
      description: 'Commemorating the founding of the school in 1929 and its rich history.',
      location: 'School Assembly Ground',
      startDate: new Date('2024-09-21T10:00:00'),
      endDate: new Date('2024-09-21T15:00:00'),
      category: 'Community',
      image: '/images/events/founders-day.jpg',
      status: EventStatus.UPCOMING,
    },
    {
      title: 'KCSE Mock Examinations',
      description: 'Form 4 students sit for their mock examinations in preparation for the national exams.',
      location: 'Examination Halls',
      startDate: new Date('2024-10-01T08:00:00'),
      endDate: new Date('2024-10-15T17:00:00'),
      category: 'Academic',
      image: '/images/events/mock-exams.jpg',
      status: EventStatus.UPCOMING,
    },
    {
      title: 'Christmas Carol Service',
      description: 'Annual Christmas celebration with carols, scripture readings, and fellowship.',
      location: 'School Chapel',
      startDate: new Date('2024-12-20T18:00:00'),
      endDate: new Date('2024-12-20T21:00:00'),
      category: 'Religious',
      image: '/images/events/carol-service.jpg',
      status: EventStatus.UPCOMING,
    },
  ];

  for (const event of eventsData) {
    await prisma.event.create({ data: event });
  }

  // Create Gallery
  const galleryData = [
    { title: 'School Main Gate', category: 'Campus', imageUrl: '/images/gallery/main-gate.jpg', isFeatured: true },
    { title: 'Kenyatta Hall', category: 'Facilities', imageUrl: '/images/gallery/kenyatta-hall.jpg', isFeatured: true },
    { title: 'Basketball Court - Giants of Africa', category: 'Sports', imageUrl: '/images/gallery/basketball-court.jpg', isFeatured: true },
    { title: 'Computer Laboratory', category: 'Facilities', imageUrl: '/images/gallery/computer-lab.jpg', isFeatured: false },
    { title: 'Science Laboratory', category: 'Facilities', imageUrl: '/images/gallery/science-lab.jpg', isFeatured: false },
    { title: 'Library', category: 'Facilities', imageUrl: '/images/gallery/library.jpg', isFeatured: true },
    { title: 'Dining Hall', category: 'Facilities', imageUrl: '/images/gallery/dining-hall.jpg', isFeatured: false },
    { title: 'Sports Day 2023', category: 'Events', imageUrl: '/images/gallery/sports-day.jpg', isFeatured: false },
    { title: 'Graduation Ceremony', category: 'Events', imageUrl: '/images/gallery/graduation.jpg', isFeatured: true },
    { title: 'Classroom Block', category: 'Campus', imageUrl: '/images/gallery/classroom-block.jpg', isFeatured: false },
    { title: 'Dormitory Block', category: 'Campus', imageUrl: '/images/gallery/dormitory.jpg', isFeatured: false },
    { title: 'School Assembly', category: 'Events', imageUrl: '/images/gallery/assembly.jpg', isFeatured: false },
  ];

  for (const item of galleryData) {
    await prisma.gallery.create({ data: item });
  }

  // Create Announcements
  const announcementsData = [
    { title: 'School Reopening - Term 2, 2024', content: 'All students are expected to report back to school on Monday, 29th April 2024 by 8:00 AM. Please ensure you have all required materials and have cleared any outstanding fees.', type: 'SCHOOL_WIDE', priority: 'HIGH' },
    { title: 'KCSE Registration Deadline', content: 'Form 4 students must complete their KCSE registration by 15th May 2024. Please visit the examination office with your birth certificate and passport photos.', type: 'STUDENT_ONLY', priority: 'URGENT' },
    { title: 'Staff Meeting - All Teachers', content: 'There will be a mandatory staff meeting on Friday, 3rd May 2024 at 3:00 PM in the Staff Room. All teachers must attend.', type: 'TEACHER_ONLY', priority: 'NORMAL' },
    { title: 'Parent-Teacher Conference', content: 'The Parent-Teacher Conference for Form 3 and Form 4 students will be held on Saturday, 11th May 2024 from 9:00 AM to 1:00 PM.', type: 'SCHOOL_WIDE', priority: 'HIGH' },
    { title: 'New Digital Library Platform', content: 'The school has launched a new digital library platform. All students can now access e-books, past papers, and revision materials online. Login credentials have been sent to your email.', type: 'STUDENT_ONLY', priority: 'NORMAL' },
  ];

  for (const ann of announcementsData) {
    await prisma.announcement.create({
      data: { ...ann, authorId: schoolAdmin.id, publishedAt: new Date() }
    });
  }

  // Create System Settings
  const settings = [
    { key: 'school_name', value: 'Dagoretti High School', category: 'GENERAL' },
    { key: 'school_motto', value: 'Elimu Ni Mali', category: 'GENERAL' },
    { key: 'school_address', value: 'P.O. Box 21070 – 00505, Nairobi, Kenya', category: 'GENERAL' },
    { key: 'school_phone', value: '+254 (0) 733 643 666', category: 'GENERAL' },
    { key: 'school_email', value: 'dagorettischool@gmail.com', category: 'GENERAL' },
    { key: 'school_location', value: 'Waithaka, Dagoretti South Constituency, Nairobi County', category: 'GENERAL' },
    { key: 'academic_year', value: '2024', category: 'ACADEMIC' },
    { key: 'current_term', value: '2', category: 'ACADEMIC' },
    { key: 'term_start', value: '2024-04-29', category: 'ACADEMIC' },
    { key: 'term_end', value: '2024-08-02', category: 'ACADEMIC' },
    { key: 'knec_code', value: '20405001', category: 'ACADEMIC' },
    { key: 'uic_code', value: '4TBK', category: 'ACADEMIC' },
    { key: 'annual_fees', value: '40535', category: 'FINANCE' },
  ];

  for (const setting of settings) {
    await prisma.systemSetting.create({ data: setting });
  }

  // Create Attendance Records
  for (let i = 0; i < 200; i++) {
    const student = students[i % students.length];
    await prisma.attendance.create({
      data: {
        studentId: student.student!.id,
        date: new Date(Date.now() - (i % 30) * 24 * 60 * 60 * 1000),
        status: [AttendanceStatus.PRESENT, AttendanceStatus.ABSENT, AttendanceStatus.LATE, AttendanceStatus.EXCUSED][i % 4],
        markedBy: teachers[i % teachers.length].teacher!.id,
      }
    });
  }

  console.log('✅ Seed completed successfully!');
  console.log(`📊 Created:`);
  console.log(`   - 2 Admins`);
  console.log(`   - ${teachers.length} Teachers`);
  console.log(`   - ${students.length} Students`);
  console.log(`   - ${departments.length} Departments`);
  console.log(`   - ${classes.length} Classes`);
  console.log(`   - ${streams.length} Streams`);
  console.log(`   - ${subjects.length} Subjects`);
  console.log(`   - ${assignments.length} Assignments`);
  console.log(`   - 6 News Articles`);
  console.log(`   - 6 Events`);
  console.log(`   - 12 Gallery Items`);
  console.log(`   - 5 Announcements`);
  console.log(`   - 13 System Settings`);
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
