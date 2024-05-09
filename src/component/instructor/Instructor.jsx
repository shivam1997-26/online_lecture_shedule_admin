import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../config/apiUrls';
import { getRequest, postRequest } from '../../config/httpRequest';


const Instructor = () => {

  const [instructorData, setInstructorData] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const [showUpdateBtn, setShowUpdateBtn] = useState('false');
  const [lectureId, setLectureId] = useState('');
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    getInstructor()
  }, [])


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate('/');
    }
  }, [navigate]);


  const getInstructor = () => {
    const url = apiUrl.instructor.allInstructorList
    getRequest(url).then((data) => {
      setInstructorData(data.data.data)
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
    const url = `${apiUrl.instructor.deleteInstructor}/${id}`
    postRequest(url).then((data) => {
      toast.success(data.data.message)
      getInstructor()

    }).catch((err) => {
      console.log(err)
    })
  }

  const handleEdit = async (id) => {
    try {
      setShowUpdateBtn('true');
      setLectureId(id);
      const url = `${apiUrl.instructor.getInstructor}/${id}`;
      getRequest(url)
        .then((data) => {
          const instructorData = data.data.data;
          console.log(data.data.data)
          setFormData({
            name: instructorData[0].name,
            email: instructorData[0].email,
            phone: instructorData[0].phone,
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
    const url = `${apiUrl.instructor.editInstructor}/${lectureId}`;
    postRequest(url, formData)
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
    const url = apiUrl.instructor.addInstructor
    postRequest(url, formData).then((data) => {
      toast.success(data.data.message)
      getInstructor()
    }).catch(() => {
      console.log(err)
      toast.error(err.response.data.message)
    })
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: ''
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
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            instructorData.map((item, id) => (
              <tr key={id * 2}>
                <th scope="row">{id}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
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
                <label>Email</label>
                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" />
              </div>
              <div className='mb-3'>
                <label>Phone</label>
                <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone" />
              </div>
              {showUpdateBtn === 'false' ? (
                <div className='mb-3'>
                  <label>Password</label>
                  <input type="password" className="form-control" name="password" value={formData.password} onChange={handleInputChange} placeholder="Password" />
                </div>
              ) : ''}


              {showUpdateBtn === 'false' ? (
                <button className='btn btn-primary' onClick={handleSubmit}>Add Instructor</button>
              ) : (
                <button className='btn btn-primary' onClick={handleUpdate}>Update Instructor</button>
              )}

            </div>

          </div>
        </div>

      </div>


    </>
  )
}

export default Instructor