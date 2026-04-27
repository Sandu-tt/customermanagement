import React, { useEffect, useState } from "react";
import { deleteCustomer, getCustomers } from "../services/customerService";

function CustomerTable({ refresh, onEditCustomer }) {
    const [customers, setCustomers] = useState([]);

    const loadCustomers = async () => {
        const response = await getCustomers();
        setCustomers(response.data);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this customer?")) {
            await deleteCustomer(id);
            loadCustomers();
        }
    };

    useEffect(() => {
        loadCustomers();
    }, [refresh]);

    return (
        <div className="card table-card">
            <div className="table-header">
                <h2>Customer List</h2>
                <button className="btn refresh" onClick={loadCustomers}>
                    Refresh
                </button>
            </div>

            <div className="table-wrapper">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>DOB</th>
                        <th>NIC</th>
                        <th>Mobile</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td className="name-cell">{customer.name}</td>
                            <td>{customer.dateOfBirth}</td>
                            <td>{customer.nicNumber}</td>

                            <td>
                                {customer.mobileNumbers?.map((m) => (
                                    <span className="tag" key={m.id}>
                      {m.mobileNumber}
                    </span>
                                ))}
                            </td>

                            <td>
                                {customer.addresses?.map((a) => (
                                    <div className="address-text" key={a.id}>
                                        {a.addressLine1}, {a.addressLine2}, {a.city}, {a.country}
                                    </div>
                                ))}
                            </td>

                            <td>
                                <button
                                    className="btn secondary"
                                    onClick={() => onEditCustomer(customer)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn danger"
                                    onClick={() => handleDelete(customer.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CustomerTable;