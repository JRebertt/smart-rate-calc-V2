"use client";

import React, { useState } from "react";
import axios from "axios";

export function UploadForm() {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("http://localhost:3001", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <input
        type="file"
        onChange={(event) => setFile(event.target.files?.[0] ?? null)}
        className="my-4"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Enviar
      </button>
    </form>
  );
}
