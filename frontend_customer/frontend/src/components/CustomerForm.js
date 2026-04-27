import React, { useEffect, useState } from "react";
import { createCustomer, updateCustomer } from "../services/customerService";

function CustomerForm({ onCustomerSaved, selectedCustomer }) {
    const emptyCustomer = {
        name: "",
        dateOfBirth: "",
        nicNumber: "",
        mobileNumbers: [{ mobileNumber: "" }],
        addresses: [{ addressLine1: "", addressLine2: "", city: "", country: "" }],
        familyMembers: [],
    };

    const [customer, setCustomer] = useState(emptyCustomer);

    useEffect(() => {
        if (selectedCustomer) {
            setCustomer({
                ...selectedCustomer,
                mobileNumbers:
                    selectedCustomer.mobileNumbers?.length > 0
                        ? selectedCustomer.mobileNumbers
                        : [{ mobileNumber: "" }],
                addresses:
                    selectedCustomer.addresses?.length > 0
                        ? selectedCustomer.addresses
                        : [{ addressLine1: "", addressLine2: "", city: "", country: "" }],
            });
        }
    }, [selectedCustomer]);

    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const handleMobileChange = (index, value) => {
        const list = [...customer.mobileNumbers];
        list[index].mobileNumber = value;
        setCustomer({ ...customer, mobileNumbers: list });
    };

    const addMobile = () => {
        setCustomer({
            ...customer,
            mobileNumbers: [...customer.mobileNumbers, { mobileNumber: "" }],
        });
    };

    const handleAddressChange = (index, name, value) => {
        const list = [...customer.addresses];
        list[index][name] = value;
        setCustomer({ ...customer, addresses: list });
    };

    const addAddress = () => {
        setCustomer({
            ...customer,
            addresses: [
                ...customer.addresses,
                { addressLine1: "", addressLine2: "", city: "", country: "" },
            ],
        });
    };

    const cleanCustomer = () => {
        return {
            ...customer,
            mobileNumbers: customer.mobileNumbers.filter(
                (m) => m.mobileNumber && m.mobileNumber.trim() !== ""
            ),
            addresses: customer.addresses.filter(
                (a) =>
                    a.addressLine1.trim() !== "" ||
                    a.addressLine2.trim() !== "" ||
                    a.city.trim() !== "" ||
                    a.country.trim() !== ""
            ),
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const cleaned = cleanCustomer();

            if (customer.id) {
                await updateCustomer(customer.id, cleaned);
                alert("Customer updated successfully");
            } else {
                await createCustomer(cleaned);
                alert("Customer created successfully");
            }

            setCustomer(emptyCustomer);
            onCustomerSaved();
        } catch (error) {
            alert("Error saving customer. NIC may already exist.");
        }
    };

    return (
        <div className="card form-card">
            <h2>{customer.id ? "Update Customer" : "Create Customer"}</h2>

            <form onSubmit={handleSubmit}>
                <div className="grid">
                    <div className="form-group">
                        <label>Name *</label>
                        <input
                            name="name"
                            value={customer.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Date of Birth *</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={customer.dateOfBirth}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>NIC Number *</label>
                        <input
                            name="nicNumber"
                            value={customer.nicNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="section-title">Mobile Numbers</div>

                {customer.mobileNumbers.map((mobile, index) => (
                    <input
                        key={index}
                        placeholder="Mobile Number"
                        value={mobile.mobileNumber}
                        onChange={(e) => handleMobileChange(index, e.target.value)}
                    />
                ))}

                <button type="button" className="btn secondary" onClick={addMobile}>
                    + Add Mobile
                </button>

                <div className="section-title">Addresses</div>

                {customer.addresses.map((address, index) => (
                    <div className="address-box" key={index}>
                        <input
                            placeholder="Address Line 1"
                            value={address.addressLine1}
                            onChange={(e) =>
                                handleAddressChange(index, "addressLine1", e.target.value)
                            }
                        />

                        <input
                            placeholder="Address Line 2"
                            value={address.addressLine2}
                            onChange={(e) =>
                                handleAddressChange(index, "addressLine2", e.target.value)
                            }
                        />

                        <input
                            placeholder="City"
                            value={address.city}
                            onChange={(e) => handleAddressChange(index, "city", e.target.value)}
                        />

                        <input
                            placeholder="Country"
                            value={address.country}
                            onChange={(e) =>
                                handleAddressChange(index, "country", e.target.value)
                            }
                        />
                    </div>
                ))}

                <button type="button" className="btn secondary" onClick={addAddress}>
                    + Add Address
                </button>

                <br />

                <button type="submit" className="btn primary">
                    {customer.id ? "Update Customer" : "Save Customer"}
                </button>
            </form>
        </div>
    );
}

export default CustomerForm;