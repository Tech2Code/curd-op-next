'use client'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../context/GlobalContext';
import { useRouter } from 'next/navigation';

const page = ({ params }) => {
    const { push } = useRouter();
    const slug = params.slug;

    const { editEmployee, employees, getData } = useContext(GlobalContext);
    const [editDtl, setEditDtl] = useState({});

    useEffect(() => {
        const employeeToEdit = employees.find(emp => emp.id == slug);
        if (employeeToEdit) {
            setEditDtl(employeeToEdit);
        }
    }, [employees, slug]);

    const handleOnChange = (userKey, value) => setEditDtl({
        ...editDtl,
        [userKey]: value
    });

    const onSubmit = (e, id) => {
        e.preventDefault();
        if(confirm('Click Ok to update employee details?')){
            editEmployee(id, editDtl);
            push('/')
        }        
    };

    return (
        <form className="w-full max-w-sm container mt-20 mx-auto" onSubmit={(e) => onSubmit(e, slug)}>
            <div className="w-full mb-5">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                    Name of employee
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline" value={editDtl.name} onChange={(e) => handleOnChange('name', e.target.value)} type="text" placeholder="Enter name" required />
            </div>
            <div className="w-full mb-5">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="location">
                    Location
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline" value={editDtl.location} onChange={(e) => handleOnChange('location', e.target.value)} type="text" placeholder="Enter location" required />
            </div>
            <div className="w-full mb-5">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="designation">
                    Designation
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline" value={editDtl.designation} onChange={(e) => handleOnChange('designation', e.target.value)} type="text" placeholder="Enter designation" required />
            </div>
            <div className="flex items-center justify-between">
                <button className="mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Edit Employee
                </button>
            </div>
            <div className="text-center mt-4 text-gray-500">
                <Link href="/">
                    Cancel
                </Link>
            </div>
        </form>
    )
}

export default page;