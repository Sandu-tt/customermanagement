import React, { useState } from "react";
import CustomerForm from "./components/CustomerForm";
import CustomerTable from "./components/CustomerTable";
import ExcelUpload from "./components/ExcelUpload";
import "./App.css";

function App() {
    const [refresh, setRefresh] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const reloadCustomers = () => {
        setRefresh(!refresh);
        setSelectedCustomer(null);
    };

    return (
        <div className="app">
            <div className="header">
                <h1>Customer Management System</h1>
                <p>React + Spring Boot + MariaDB</p>
            </div>

            <div className="content">
                <CustomerForm
                    onCustomerSaved={reloadCustomers}
                    selectedCustomer={selectedCustomer}
                />

                <ExcelUpload onUploadSuccess={reloadCustomers} />

                <CustomerTable
                    refresh={refresh}
                    onEditCustomer={setSelectedCustomer}
                />
            </div>
        </div>
    );
}

export default App;