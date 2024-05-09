import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { apiUrl } from '../../config/apiUrls';
import { getRequest, postRequest } from '../../config/httpRequest';

const Lecture = () => {
  const [lectureData, setLectureData] = useState([]);
  const [course, setCourse] = useState([]);
  const [instructor, setInstructor] = useState([]);
  const [formData, setFormData] = useState({
    courseId: '',
    instructorId: '',
    date: ''
  });
  const [showUpdateBtn, setShowUpdateBtn] = useState('false');
  const [lectureId, setLectureId] = useState('');

  useEffect(() => {
    getLecture();
    getCourse();
    getInstructor();
  }, []);

  const getLecture = () => {
    const url = apiUrl.lecture.getLecture;
    getRequest(url)
      .then((data) => {
        setLectureData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCourse = () => {
    const url = apiUrl.course.getCourse;
    getRequest(url)
      .then((data) => {
        setCourse(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getInstructor = () => {
    const url = apiUrl.instructor.allInstructorList;
    getRequest(url)
      .then((data) => {
        setInstructor(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDelete = (id) => {
    const url = `${apiUrl.lecture.deleteLecture}/${id}`;
    postRequest(url)
      .then((data) => {
        toast.success(data.data.message);
        getLecture();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = async (id) => {
    try {
      setShowUpdateBtn('true');
      setLectureId(id);
      const url = `${apiUrl.lecture.getsingleLecture}/${id}`;
      getRequest(url)
        .then((data) => {
          const lectureData = data.data;
          setFormData({
            courseId: lectureData.course._id,
            instructorId: lectureData.instructor._id,
            date: lectureData.date,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = () => {
    const url = `${apiUrl.lecture.updateLecture}/${lectureId}`;
    postRequest(url, formData)
      .then((data) => {
        toast.success(data.data.message);
        getLecture();
      })
      .catch((err) => {
        console.log(err);
        toast.error('Something went wrong');
      });
  };

  const handleSubmit = () => {
    const url = apiUrl.lecture.addLecture;
    postRequest(url, formData)
      .then((data) => {
        toast.success(data.data.message);

        getLecture();
        setFormData({
          courseId: '',
          instructorId: '',
          date: '',
        });
      })
      .catch((err) => {
       
        toast.error('something went wrong')
      });
  };

  return (
    <>
      <div className='container'>
        <button className='btn btn-primary float-end' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setShowUpdateBtn('false')}>Add</button>
      </div>
      <table className="table my-5 container">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Instructor</th>
            <th scope="col">Level</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            lectureData.map((item, id) => (
              <tr key={item._id}>
                <th scope="row">{id + 1}</th>
                <td>{item?.course?.name}</td>
                <td>{item?.instructor?.name}</td>
                <td>{item?.course?.level}</td>
                <td>{item?.date}</td>
                <td>
                  <MdOutlineEdit size={25} onClick={() => handleEdit(item._id)} data-bs-toggle="modal" data-bs-target="#exampleModal" />
                  <FaTrashAlt size={25} color='red' onClick={() => handleDelete(item._id)} />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add Lecture</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className='mb-3'>
                <label>Course</label>
                <select className="form-control" id="course" name="courseId" onChange={handleInputChange} value={formData.courseId} required>
                  <option value="">Select a course</option>
                  {course.map((item) => (
                    <option value={item._id} key={item._id}>{item.name}</option>
                  ))}
                </select>
              </div>
              <div className='mb-3'>
                <label>Instructor</label>
                <select className="form-control" id="instructor" name="instructorId" onChange={handleInputChange} value={formData.instructorId} required>
                  <option value="">Select an instructor</option>
                  {instructor.map((item) => (
                    <option value={item._id} key={item._id}>{item.name}</option>
                  ))}
                </select>
              </div>
              <div className='mb-3'>
                <label>Date</label>
                <input type="date" className="form-control" id="date" name="date" onChange={handleInputChange} value={formData.date} required />
              </div>
              {showUpdateBtn === 'false' ? (
                <button className='btn btn-primary' onClick={handleSubmit}>Add Lecture</button>
              ) : (
                <button className='btn btn-primary' onClick={handleUpdate}>Update Lecture</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lecture;
