import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployeeById, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {
  
    const [firstName, setFirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [email, setEmail] = useState('')

    const navigator = useNavigate();

   
    const {id} = useParams();

    useEffect(() => {

        if(id){
            getEmployeeById(id).then((response) => {
                setFirstName(response.data.firstName);
                setlastName(response.data.lastName);
                setEmail(response.data.email)
            }).catch(error => {
                console.error(error);
            })
        }

    }, [id])

   const [errors,setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })


    function saveOrUpdateEmployee(e){
        e.preventDefault();

        if(validateForm()){
           const employee = {firstName, lastName, email};
           console.log(employee);
           

           if(id) {
            updateEmployee(id,employee).then((response) =>{
                console.log(response.data);
                navigator('/employees');
            }).catch(error => {
                console.error(error);
            })
           }else{
            //create new employee
            createEmployee(employee).then((response) => {
                console.log(response.data);
                setFirstName('');
                setlastName('');
                setEmail('');
                navigator('/employees');
            }).catch(error => {
                console.error(error);
            })
           }
        
        }

    }

    function validateForm(){
        let valid = true;

        const errorsCopy = {... errors}

        if(firstName.trim()){
            errorsCopy.firstName = '';
        }else{
            errorsCopy.firstName = 'First name is required';
            valid = false;
        }

        if(lastName.trim()){
            errorsCopy.lastName = '';
        }else{
            errorsCopy.lastName = 'Last name is required';
            valid = false;
        }

        if (email.trim()) {
            errorsCopy.email = ''; // Clear error if valid.
        } else {
            errorsCopy.email = 'Email is required'; // Set error message if invalid.
            valid = false; // Set form as invalid.
        }

        setErrors(errorsCopy);

        return valid;

    }

    function pageTitle(){
            return <h2 className='text-center'>{id ? 'Update' : 'Add'} Employee</h2>
    }

    function cancle(e) {
        e.preventDefault();
        navigator('/employees')
    }

    return (
    <>
        <div className="container mt-4">
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    {
                        pageTitle() 
                    }
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <label className='form-label'>First Name :</label>
                                <input type="text" placeholder='Enter Employee First Name' name='firstName' value={firstName} 
                                className={`form-control ${ errors.firstName ? 'is-invalid': ''}`} 
                                onChange={(e) =>  setFirstName(e.target.value)} />

                                {errors.firstName && <div className='invalid-feedback'>{ errors.firstName}</div> }
                            </div>
                            <div className="form-group mb-2">
                                <label className='form-label'>Last Name :</label>
                                <input type="text" placeholder='Enter Employee Last Name' name='lastName' value={lastName} 
                                className={`form-control ${ errors.lastName ? 'is-invalid': ''}`} 
                                onChange={(e) =>  setlastName(e.target.value)} />
                                 {errors.lastName && <div className='invalid-feedback'>{ errors.lastName}</div> }
                            </div>
                            <div className="form-group mb-2">
                                <label className='form-label'>Email :</label>
                                <input type="email" placeholder='Enter Employee Email' name='email' value={email} 
                                className={`form-control ${ errors.email ? 'is-invalid': ''}`}  
                                onChange={(e) =>  setEmail(e.target.value)} />
                                 {errors.email && <div className='invalid-feedback'>{ errors.email}</div> }
                            </div>

                                <button className='btn btn-success mt-4' onClick={saveOrUpdateEmployee}>Submit</button>
                                <button className='btn btn-warning mt-4 ms-4' onClick={cancle}>Cancle</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default EmployeeComponent