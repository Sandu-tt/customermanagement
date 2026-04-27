package com.example.customermanagement.controller;

import com.example.customermanagement.entity.Address;
import com.example.customermanagement.entity.Customer;
import com.example.customermanagement.entity.CustomerMobileNumber;
import com.example.customermanagement.repository.CustomerRepository;
import com.example.customermanagement.service.ExcelUploadService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {

    private final CustomerRepository repository;
    private final ExcelUploadService excelUploadService;

    public CustomerController(CustomerRepository repository, ExcelUploadService excelUploadService) {
        this.repository = repository;
        this.excelUploadService = excelUploadService;
    }

    @PostMapping
    public Customer create(@RequestBody Customer customer) {

        if (customer.getMobileNumbers() != null) {
            for (CustomerMobileNumber mobile : customer.getMobileNumbers()) {
                mobile.setCustomer(customer);
            }
        }

        if (customer.getAddresses() != null) {
            for (Address address : customer.getAddresses()) {
                address.setCustomer(customer);
            }
        }

        return repository.save(customer);
    }

    @GetMapping
    public List<Customer> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Customer getById(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Customer update(@PathVariable Long id, @RequestBody Customer updatedCustomer) {

        Customer existing = repository.findById(id).orElse(null);

        if (existing != null) {
            existing.setName(updatedCustomer.getName());
            existing.setDateOfBirth(updatedCustomer.getDateOfBirth());
            existing.setNicNumber(updatedCustomer.getNicNumber());

            existing.getMobileNumbers().clear();

            if (updatedCustomer.getMobileNumbers() != null) {
                for (CustomerMobileNumber mobile : updatedCustomer.getMobileNumbers()) {
                    mobile.setCustomer(existing);
                    existing.getMobileNumbers().add(mobile);
                }
            }

            existing.getAddresses().clear();

            if (updatedCustomer.getAddresses() != null) {
                for (Address address : updatedCustomer.getAddresses()) {
                    address.setCustomer(existing);
                    existing.getAddresses().add(address);
                }
            }

            existing.setFamilyMembers(updatedCustomer.getFamilyMembers());

            return repository.save(existing);
        }

        return null;
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        repository.deleteById(id);
        return "Customer deleted successfully";
    }

    @PostMapping("/upload-excel")
    public String uploadExcel(@RequestParam("file") MultipartFile file) {
        try {
            excelUploadService.uploadCustomers(file);
            return "Excel file uploaded successfully";
        } catch (Exception e) {
            return "Excel upload failed: " + e.getMessage();
        }
    }
}