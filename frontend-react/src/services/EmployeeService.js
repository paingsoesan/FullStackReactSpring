import axios, { Axios } from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/employees';

export const listEmployees = () => axios.get('http://localhost:8080/api/employees/getAll');

export const createEmployee = (employee) => axios.post('http://localhost:8080/api/employees/create', employee)

export const getEmployeeById = (employeeId) =>  axios.get(`${REST_API_BASE_URL}/${employeeId}`);

export const updateEmployee = (employeeId, employee) => axios.put(`${REST_API_BASE_URL}/update/${employeeId}`, employee);

export const deleteEmployee = (employeeId) => axios.delete(`${REST_API_BASE_URL}/delete/${employeeId}`)

