"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useRouter } from "next/navigation";

const page = () => {
  const { push } = useRouter();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [designation, setDesignation] = useState("");

  // const { addEmployee } = useContext(GlobalContext)

  const postData = () => {
    fetch('http://localhost:8000/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: Date.now(), name, location, designation })
    });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name, !location, !designation) return;
    postData()
    push('/');
  }

  return (
    <form className="w-full max-w-sm container mt-20 mx-auto" onSubmit={onSubmit}>
      <div className="w-full mb-5">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="name"
        >
          Name of employee
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter name"
          required
        />
      </div>
      <div className="w-full mb-5">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="location"
        >
          Location
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          placeholder="Enter location"
          required
        />
      </div>
      <div className="w-full mb-5">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="designation"
        >
          Designation
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          type="text"
          placeholder="Enter designation"
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button className="mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add Employee
        </button>
      </div>
      <div className="text-center mt-4 text-gray-500">
        <Link href="/">Cancel</Link>
      </div>
    </form>
  );
};

export default page;
