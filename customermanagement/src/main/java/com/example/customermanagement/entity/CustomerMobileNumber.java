package com.example.customermanagement.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "customer_mobile_numbers")
public class CustomerMobileNumber {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String mobileNumber;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    @JsonIgnore
    private Customer customer;

    public Long getId() {
        return id;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
}