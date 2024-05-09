
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../config/apiUrls';
import { getRequest, postRequest } from '../../config/httpRequest';


const Course = () => {

  const [courseData, setCourseData] = useState([])
  const [image, setImage] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    level: '',
    description: ''
  });

  const [showUpdateBtn, setShowUpdateBtn] = useState('false');
  const [lectureId, setLectureId] = useState('');

  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    getCourse()
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate('/');
    }
  }, [navigate]);
  
  const getCourse = () => {
    const url = apiUrl.course.getCourse
    getRequest(url).then((data) => {
      console.log(data.data)
      setCourseData(data.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDelete = (id) => {
    const url = `${apiUrl.course.deleteCourse}/${id}`
    postRequest(url).then((data) => {
      toast.success(data.data.message)
      getCourse()

    }).catch((err) => {
      console.log(err)
    })
  }

  const handleEdit = async (id) => {
    setShowUpdateBtn('true')
    setLectureId(id)
    try {
      const url = `${apiUrl.course.getaCourse}/${id}`
      getRequest(url).then((data) => {
        console.log(data.data)
        setFormData({
          name: data.data.name,
          level: data.data.level,
          description: data.data.description
        });
      }).catch((err) => {
        console.log(err)
      })

    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = () => {
    const url = `${apiUrl.course.updateCourse}/${lectureId}`;
    const isMultipart = true

    const data = {
      name: formData.name,
      level: formData.level,
      description: formData.description,
      image
    }

    postRequest(url, data,isMultipart)
      .then((data) => {
        toast.success(data.data.message);
        getInstructor();
      })
      .catch((err) => {
        console.log(err);
        toast.error('Something went wrong');
      });
  };

  const handleSubmit = () => {
    const url = apiUrl.course.addCourse

    const data = {
      name: formData.name,
      level: formData.level,
      description: formData.description,
      image
    }
    const isMultipart = true
    postRequest(url, data, isMultipart).then((data) => {
      toast.success(data.data.message)
      console.log(data.data)
      getCourse()
    }).catch(() => {
      console.log(err)
    })
    setFormData({
      name: '',
      level: '',
      description: ''
    });
  };

  return (
    <>

      <div className='container'>

        <button className='btn btn-primary float-end' data-bs-toggle="modal" data-bs-target="#exampleModal">Add</button>
      </div>
      <table className="table my-5 container">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Level</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            courseData.map((item, id) => (
              <tr key={id * 3}>
                <th scope="row">{id}</th>
                <td>{item.name}</td>
                <td>{item.level}</td>
                <td>{item.description}</td>
                <td>
                  <MdOutlineEdit size={25} onClick={() => handleEdit(item._id)} data-bs-toggle="modal" data-bs-target="#exampleModal" />
                  <FaTrashAlt size={25} color='red' onClick={() => handleDelete(item._id)} />
                </td>
              </tr>
            ))
          }

        </tbody>
      </table>


      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Instructor
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">

              <div className='mb-3'>
                <label>Name</label>
                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" />
              </div>
              <div className='mb-3'>
                <label>Level</label>
                <input type="text" className="form-control" name="level" value={formData.level} onChange={handleInputChange} placeholder="Enter level" />
              </div>
              <div className='mb-3'>
                <label>description</label>
                <input type="text" className="form-control" name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" />
              </div>
              <div className='mb-3'>
                <label>image</label>
                <input type="file" className="form-control" name="image" onChange={(e) => setImage(e.target.files[0])} placeholder="Password" />
              </div>
             
              {showUpdateBtn === 'false' ? (
                <button className='btn btn-primary' onClick={handleSubmit}>Add Course</button>
              ) : (
                <button className='btn btn-primary' onClick={handleUpdate}>Update Course</button>
              )}


            </div>

          </div>
        </div>

      </div>


    </>
  )
}

export default Course