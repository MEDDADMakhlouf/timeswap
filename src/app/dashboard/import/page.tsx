"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ImportExcelPage() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleImport = () => {
    if (!file) return;
    // Add your logic to process the Excel file (use a library like SheetJS)
    console.log("Importing file:", file);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Import Excel</h1>
      <div className="border p-4 rounded bg-white space-y-4">
        <Input type="file" onChange={handleFileChange} accept=".xlsx, .xls" />
        {file && (
          <div className="text-sm text-gray-600">
            Selected file: {file.name}
          </div>
        )}
        <Button onClick={handleImport} disabled={!file}>
          Import File
        </Button>
      </div>
    </div>
  );
}