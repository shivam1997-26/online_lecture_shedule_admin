import React from 'react';
import { apiUrl } from '../../config/apiUrls';
import { postRequest } from '../../config/httpRequest';

const AddInstructor = () => {




    const handleSubmit = (e) => {
       
            const url = apiUrl.instructor.addInstructor
            postRequest(url).then((data) => {
                console.log(data.data)
            }).catch(() => {

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
            <div className='row container my-5'>
                <div className='col-3'></div>
                <div className='col-6'>
                    <form>
                        <div className='mb-3'>
                            <label>Name</label>
                            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" required />
                        </div>
                        <div className='mb-3'>
                            <label>Email</label>
                            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required />
                        </div>
                        <div className='mb-3'>
                            <label>Phone</label>
                            <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone" required />
                        </div>
                        <div className='mb-3'>
                            <label>Password</label>
                            <input type="password" className="form-control" name="password" value={formData.password} onChange={handleInputChange} placeholder="Password" required />
                        </div>
                        <button className='btn btn-primary' onClick={handleSubmit}> Add Instructor</button>
                    </form>
                </div>
                <div className='col-3'></div>
            </div>
        </>
    )
}

export default AddInstructor