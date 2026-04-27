package com.example.customermanagement.service;

import com.example.customermanagement.entity.Customer;
import com.example.customermanagement.entity.CustomerMobileNumber;
import com.example.customermanagement.repository.CustomerRepository;
import org.apache.poi.ss.usermodel.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ExcelUploadService {

    private final CustomerRepository customerRepository;

    public ExcelUploadService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public void uploadCustomers(MultipartFile file) throws Exception {

        InputStream inputStream = file.getInputStream();
        Workbook workbook = WorkbookFactory.create(inputStream);
        Sheet sheet = workbook.getSheetAt(0);

        List<Customer> customers = new ArrayList<>();
        int batchSize = 500;

        for (int i = 1; i <= sheet.getLastRowNum(); i++) {

            Row row = sheet.getRow(i);

            if (row == null) {
                continue;
            }

            String name = getCellValue(row.getCell(0));
            String dateOfBirth = getCellValue(row.getCell(1));
            String nicNumber = getCellValue(row.getCell(2));
            String mobileNumber = getCellValue(row.getCell(3));

            if (name == null || name.isEmpty()
                    || dateOfBirth == null || dateOfBirth.isEmpty()
                    || nicNumber == null || nicNumber.isEmpty()) {
                continue;
            }

            if (customerRepository.existsByNicNumber(nicNumber)) {
                continue;
            }

            Customer customer = new Customer();
            customer.setName(name);
            customer.setDateOfBirth(LocalDate.parse(dateOfBirth));
            customer.setNicNumber(nicNumber);

            if (mobileNumber != null && !mobileNumber.isEmpty()) {
                List<CustomerMobileNumber> mobileNumbers = new ArrayList<>();

                CustomerMobileNumber mobile = new CustomerMobileNumber();
                mobile.setMobileNumber(mobileNumber);
                mobile.setCustomer(customer);

                mobileNumbers.add(mobile);
                customer.setMobileNumbers(mobileNumbers);
            }

            customers.add(customer);

            if (customers.size() == batchSize) {
                customerRepository.saveAll(customers);
                customers.clear();
            }
        }

        if (!customers.isEmpty()) {
            customerRepository.saveAll(customers);
        }

        workbook.close();
    }

    private String getCellValue(Cell cell) {
        if (cell == null) {
            return "";
        }

        if (cell.getCellType() == CellType.NUMERIC) {
            if (DateUtil.isCellDateFormatted(cell)) {
                return cell.getLocalDateTimeCellValue().toLocalDate().toString();
            }
            return String.valueOf((long) cell.getNumericCellValue());
        }

        return cell.getStringCellValue().trim();
    }
}