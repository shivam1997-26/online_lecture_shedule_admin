
// const baseUrl = "http://localhost:8000/api"

const baseUrl = "https://online-task-shedule-backend.onrender.com/api"

export const apiUrl = {
    "auth":{
        "login":`${baseUrl}/login`
    },
    "instructor": {
        "addInstructor": `${baseUrl}/add/instructor`,
        "allInstructorList": `${baseUrl}/get/allInstructorList`,
        "getInstructor": `${baseUrl}/get/Instructor`,
        "deleteInstructor": `${baseUrl}/Instructor`,
        "editInstructor": `${baseUrl}/updateinstructor`

    },
    "course": {
        "addCourse": `${baseUrl}/add/course`,
        "getCourse": `${baseUrl}/get/course`,
        "getaCourse": `${baseUrl}/get/getaCourse`,
        "deleteCourse": `${baseUrl}/deleteCourse`,
        "updateCourse": `${baseUrl}/updateCourse`
    },
    "lecture": {
        "addLecture": `${baseUrl}/add/lecture`,
        "updateLecture": `${baseUrl}/updateLecture`,
        "deleteLecture": `${baseUrl}/deleteLecture`,
        "getLecture": `${baseUrl}/get/lecture`,
        "getaLecture":`${baseUrl}/get/lecture/instructor`,
        "getsingleLecture":`${baseUrl}/get/lecture`
    }
}