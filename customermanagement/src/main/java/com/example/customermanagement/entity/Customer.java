package com.example.customermanagement.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private LocalDate dateOfBirth;

    @Column(unique = true, nullable = false)
    private String nicNumber;

    // ✅ Mobile Numbers (One-to-Many)
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CustomerMobileNumber> mobileNumbers;

    // ✅ Addresses (One-to-Many)
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Address> addresses;

    // ✅ Family Members (Many-to-Many)
    @ManyToMany
    @JoinTable(
            name = "customer_family_members",
            joinColumns = @JoinColumn(name = "customer_id"),
            inverseJoinColumns = @JoinColumn(name = "family_member_id")
    )
    private List<Customer> familyMembers;

    // ================= GETTERS =================

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public String getNicNumber() {
        return nicNumber;
    }

    public List<CustomerMobileNumber> getMobileNumbers() {
        return mobileNumbers;
    }

    public List<Address> getAddresses() {
        return addresses;
    }

    public List<Customer> getFamilyMembers() {
        return familyMembers;
    }

    // ================= SETTERS =================

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public void setNicNumber(String nicNumber) {
        this.nicNumber = nicNumber;
    }

    public void setMobileNumbers(List<CustomerMobileNumber> mobileNumbers) {
        this.mobileNumbers = mobileNumbers;
    }

    public void setAddresses(List<Address> addresses) {
        this.addresses = addresses;
    }

    public void setFamilyMembers(List<Customer> familyMembers) {
        this.familyMembers = familyMembers;
    }
}