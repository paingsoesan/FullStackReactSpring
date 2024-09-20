package com.peter.backendfullstack.controller;

import com.peter.backendfullstack.dto.EmployeeDto;
import com.peter.backendfullstack.entity.Employee;
import com.peter.backendfullstack.exception.ResourceNotFoundException;
import com.peter.backendfullstack.repository.EmployeeRepository;
import com.peter.backendfullstack.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    EmployeeRepository employeeRepository;


    @Autowired
    private EmployeeService employeeService;

    //build add employee
    @PostMapping("/create")
    public ResponseEntity<EmployeeDto> creteEmployee(@RequestBody EmployeeDto employeeDto){
        return new ResponseEntity<>(employeeService.createEmployee(employeeDto),HttpStatus.CREATED);
    }

    @GetMapping("/getAll")
    public List<Employee>            getAllEmployees(){
        return employeeRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDto> getById(@PathVariable("id") Long employeeId){
        EmployeeDto employeeDto =  employeeService.getEmployeeById(employeeId);
        return ResponseEntity.ok(employeeDto);
    }

    //updated employee
    @PutMapping("/update/{id}")
    public ResponseEntity<EmployeeDto> updetedEmployee(@PathVariable("id") Long employeeId ,
                                                       @RequestBody EmployeeDto updatedEmployee){
       EmployeeDto employeeDto = employeeService.updateEmployee(employeeId,updatedEmployee);
       return  ResponseEntity.ok(employeeDto);
    }

    //delete employee
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long employeeId){
        employeeService.deleteEmployee(employeeId);
        return ResponseEntity.ok("Employee Deleted successfully");
    }
}
