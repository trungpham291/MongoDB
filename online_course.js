use view
switched to db view
db.courses.insertMany([
    {
        "_id": ObjectId("64c1f1abc1234567"),
        "courseId": 1,
        "name": "Data Science 101",
        "category": "Data Science",
        "duration": 30,
        "instructor": "Nguyen Van A"
    },
    {
        "_id": ObjectId("64c1f1abc7654321"),
        "courseId": 2,
        "name": "Web Development Basics",
        "category": "Programming",
        "duration": 45,
        "instructor": "Tran Van C"
    }
]);
BSONError: input must be a 24 character hex string, 12 byte Uint8Array, or an integer
db.courses.insertMany([
    {
        "courseId": 1,
        "name": "Data Science 101",
        "category": "Data Science",
        "duration": 30,
        "instructor": "Nguyen Van A"
    },
    {
        "courseId": 2,
        "name": "Web Development Basics",
        "category": "Programming",
        "duration": 45,
        "instructor": "Tran Van C"
    }
]);
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('6788d6e3badd7ce225da65af'),
    '1': ObjectId('6788d6e3badd7ce225da65b0')
  }
}
db.students.insertMany([
    {
        
        "studentId": 1001,
        "name": "Le Thi B",
        "email": "lethib@example.com",
        "enrolledCourses": [1, 2]
    },
    {
        
        "studentId": 1002,
        "name": "Nguyen Van D",
        "email": "nguyenvand@example.com",
        "enrolledCourses": [1]
    }
]);
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('6788d704badd7ce225da65b1'),
    '1': ObjectId('6788d704badd7ce225da65b2')
  }
}
db.tests.insertMany([
    {
        
        "testId": 2001,
        "courseId": 1,
        "title": "Midterm Exam",
        "totalMarks": 100
    }
]);
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('6788d719badd7ce225da65b3')
  }
}
db.test_results.insertMany([
    {
        
        "studentId": 1001,
        "testId": 2001,
        "score": 85
    },
    {
       
        "studentId": 1002,
        "testId": 2001,
        "score": 60
    }
]);
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('6788d72cbadd7ce225da65b4'),
    '1': ObjectId('6788d72cbadd7ce225da65b5')
  }
}
db.createView(
    "course_enrollment_summary",
    "students",
    [
        { $unwind: "$enrolledCourses" },
        {
            $lookup: {
                from: "courses",
                localField: "enrolledCourses",
                foreignField: "courseId",
                as: "courseDetails"
            }
        },
        { $unwind: "$courseDetails" },
        {
            $group: {
                _id: "$courseDetails.name",
                totalStudents: { $sum: 1 }
            }
        },
        { $sort: { totalStudents: -1 } }
    ]
);
{ ok: 1 }
db.createView(
    "average_score_per_course",
    "test_results",
    [
        {
            $lookup: {
                from: "tests",
                localField: "testId",
                foreignField: "testId",
                as: "testDetails"
            }
        },
        { $unwind: "$testDetails" },
        {
            $lookup: {
                from: "courses",
                localField: "testDetails.courseId",
                foreignField: "courseId",
                as: "courseDetails"
            }
        },
        { $unwind: "$courseDetails" },
        {
            $group: {
                _id: "$courseDetails.name",
                averageScore: { $avg: "$score" }
            }
        },
        { $sort: { averageScore: -1 } }
    ]
);
{ ok: 1 }
db.createView(
    "pass_fail_summary",
    "test_results",
    [
        {
            $lookup: {
                from: "tests",
                localField: "testId",
                foreignField: "testId",
                as: "testDetails"
            }
        },
        { $unwind: "$testDetails" },
        {
            $group: {
                _id: "$testDetails.title",
                passed: {
                    $sum: {
                        $cond: [
                            { $gte: ["$score", { $divide: ["$testDetails.totalMarks", 2] }] },
                            1,
                            0
                        ]
                    }
                },
                failed: {
                    $sum: {
                        $cond: [
                            { $lt: ["$score", { $divide: ["$testDetails.totalMarks", 2] }] },
                            1,
                            0
                        ]
                    }
                }
            }
        }
    ]
);
{ ok: 1 }
db.createView(
    "active_students_by_month",
    "test_results",
    [
        {
            $lookup: {
                from: "tests",
                localField: "testId",
                foreignField: "testId",
                as: "testDetails"
            }
        },
        { $unwind: "$testDetails" },
        {
            $group: {
                _id: {
                    month: { $month: "$testDetails.date" },
                    year: { $year: "$testDetails.date" }
                },
                activeStudents: { $sum: 1 }
            }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]
);
{ ok: 1 }
db.courses.find().pretty();