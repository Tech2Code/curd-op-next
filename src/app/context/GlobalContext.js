'use client'
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {

    const [employees, setEmployees] = useState([]);
    async function getData() {
        const url = "http://localhost:8000/employees";
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            setEmployees(json);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(()=>{
        getData()
      },[])

    const addEmployee = (newEmployee) => {
        setEmployees([...employees, newEmployee])
    }

    const deleteEmployee = (id) => {
        fetch('http://localhost:8000/employees/' + id, {
            method: 'DELETE',
        })
        const updatedEployee = employees.filter((emp) => emp.id !== id);
        setEmployees(updatedEployee);
    }

    const editEmployee = (id, updatedEmp) => {
        fetch('http://localhost:8000/employees/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedEmp)
        });
    }

    return (
        <GlobalContext.Provider value={({ employees, getData, addEmployee, deleteEmployee, editEmployee })}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalProvider;
