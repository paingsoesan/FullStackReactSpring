package com.peter.backendfullstack.repository;

import com.peter.backendfullstack.dto.EmployeeDto;
import com.peter.backendfullstack.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
