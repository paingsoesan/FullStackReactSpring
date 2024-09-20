import React, {useEffect, useState} from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';
import axios, { Axios } from 'axios';
import { unstable_batchedUpdates } from 'react-dom';

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([]);

    const navigator = useNavigate();


    const fetchEmployees = async () => {
        try {
            const response = await listEmployees();
            setEmployees(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

   function addNewEmployee(){
        navigator('/add-employee')
   }

   function updateEmployee(id){
    navigator(`/edit-employee/${id}`)
   }

  const handleDeleteEMployee = async (id) => {
    try{
        await deleteEmployee(id); 
        //d code mhr await ma htae htr yin deleteEmployee(id) function executed ma pee thay khin out ka listEmployees() ka tan a lote lote late ml
        //ae dr kyout deleteEmployee(id) button ko 2 times click ya late ml
        //await htae lite yin deleteEmployee(id) api function executed lote pee mah out ka listEmployees() function htl mhr update twr lote tr
        fetchEmployees();
    }catch(error){
        console.error(error);
    }
      }
    


  return (
    <div className='container'>
        <h2 className='text-center my-4'>List of Employees</h2>
        <button className='btn  btn-primary  mb-4' onClick={addNewEmployee}>Create Employee</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Employee Id </th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email id</th>
                    <th className='text-center'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map(employee => 
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td className='d-flex justify-content-around'>
                                <button className='btn btn-info me-3' onClick={() => updateEmployee(employee.id)}>Update</button>
                                <button className='btn btn-danger' onClick={() => handleDeleteEMployee(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    )
                }
                <tr>

                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponent