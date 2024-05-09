import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { apiUrl } from '../config/apiUrls';
import { postRequest } from '../config/httpRequest';



const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
});


const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const navigate = useNavigate()

    const onSubmit = (data) => {
        const url = apiUrl.auth.login
        const body = {
            email: data.email,
            password: data.password
        }
        postRequest(url, body).then((data) => {
            console.log(data.data)
            localStorage.setItem('token', data.data.data.token);
            localStorage.setItem('userData', JSON.stringify(data.data.data));
            if (data.data.data.role === 'admin') {
                navigate('/instructor')
            } else {
                navigate('/instructorPanel')
            }
        }).catch((err) => {
            console.log(err)
        })
    };

    return (
        <>
            <h5 className='text-center my-5'>Login</h5>
            <div className='container logincontainer'>

                <form onSubmit={handleSubmit(onSubmit)} className='form'>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            {...register('email')}
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                        />
                        {errors.email && (
                            <div className="invalid-feedback">{errors.email.message}</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            {...register('password')}
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            id="exampleInputPassword1"
                        />
                        {errors.password && (
                            <div className="invalid-feedback">{errors.password.message}</div>
                        )}
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>

        </>
    )
}

export default Login