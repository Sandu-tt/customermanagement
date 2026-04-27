import React, { useState } from "react";
import { uploadExcel } from "../services/customerService";

function ExcelUpload({ onUploadSuccess }) {
    const [file, setFile] = useState(null);

    const handleUpload = async () => {
        if (!file) {
            alert("Please select an Excel file");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            await uploadExcel(formData);
            alert("Excel uploaded successfully");
            setFile(null);
            onUploadSuccess();
        } catch (error) {
            alert("Excel upload failed");
        }
    };

    return (
        <div className="card upload-card">
            <h2>Bulk Customer Upload</h2>
            <p>Upload Excel file with columns: Name, DateOfBirth, NICNumber, MobileNumber</p>

            <input
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <br />

            <button className="btn primary" onClick={handleUpload}>
                Upload Excel
            </button>
        </div>
    );
}

export default ExcelUpload;