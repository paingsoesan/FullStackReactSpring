package com.peter.backendfullstack.service;

import com.peter.backendfullstack.dto.EmployeeDto;
import com.peter.backendfullstack.entity.Employee;
import com.peter.backendfullstack.exception.ResourceNotFoundException;
import com.peter.backendfullstack.mapper.EmployeeMapper;
import com.peter.backendfullstack.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;
    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
      Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
      Employee savedEmployee = employeeRepository.save(employee);
      return EmployeeMapper.mapToEmployeeDto(savedEmployee);

    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
       Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee is not exist with given id :" + employeeId));
        return EmployeeMapper.mapToEmployeeDto(employee);

    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {
       Employee employee =  employeeRepository.findById(employeeId).orElseThrow(
                () -> new ResourceNotFoundException("Employee is not exists with given id " + employeeId)
        );
        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());

       Employee updatedEmployeeObj =  employeeRepository.save(employee);
       return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
     employeeRepository.findById(employeeId).orElseThrow(() -> new ResourceNotFoundException("Employee is not exists with given id " + employeeId));
        employeeRepository.deleteById(employeeId);
    }


}
