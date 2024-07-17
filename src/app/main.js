console.clear();

const { BrowserRouter, Link, Route, Switch, useHistory, useParams } = window.ReactRouterDOM;
const { createContext, Fragment, useContext, useEffect, useReducer, useState } = window.React;

const GlobalContext = createContext();

const AppReducer = (state, action) => {
  switch (action.type) {
    case 'REMOVE_EMPLOYEE': {
      return {
        ...state,
        employees: state.employees.filter((employee) => {
          return employee.id !== action.payload;
        })
      };
    }
    case 'ADD_EMPLOYEE': {
      return {
        ...state,
        employees: [...state.employees, action.payload]
      };
    }
    case 'EDIT_EMPLOYEE': {
      return {
        ...state,
        employees: state.employees.map((employee) => {
          return (employee.id === action.payload.id) ? action.payload : employee;
        })
      };
    }
    default: {
      return state;
    }
  }
};

const GlobalState = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, {
    employees: [
      { id: uuidv4(), name: 'Bruce Wayne', location: 'Gotham', designation: 'Bachelor' }
    ]
  });

  const addEmployee = (employee) => dispatch({ type: 'ADD_EMPLOYEE', payload: employee });
  const editEmployee = (employee) => dispatch({ type: 'EDIT_EMPLOYEE', payload: employee });
  const removeEmployee = (id) => dispatch({ type: 'REMOVE_EMPLOYEE', payload: id });
  
  return (
    <GlobalContext.Provider value={{
      employees: state.employees,
      addEmployee,
      editEmployee,
      removeEmployee
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

const EmployeeList = () => {
  const { employees, removeEmployee, editEmployee } = useContext(GlobalContext);
  if (employees.length === 0) return null;

  return (
    <Fragment>
      {employees.map((employee) => (
        <div className="flex items-center bg-gray-100 mb-10 shadow" key={employee.id}>
          <div className="flex-auto text-left px-4 py-2 m-2">
            <p className="text-gray-900 leading-none">{employee.name}</p>
            <p className="text-gray-600">{employee.designation}</p>
            <span className="inline-block text-sm font-semibold mt-1">{employee.location}</span>
          </div>
          <div className="flex-auto text-right px-4 py-2 m-2">
            <Link to={`/edit/${employee.id}`}>
              <button title="Edit" onClick={() => editEmployee(employee.id)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold mr-3 py-2 px-4 rounded-full inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              </button>
            </Link>
            <button title="Remove" onClick={() => removeEmployee(employee.id)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-full inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

const Home = () => {
  return (
    <div className="App">
      <div className="container mx-auto">
        <h3 className="text-center  mt-20 text-base leading-8 text-black font-bold tracking-wide uppercase">
          CRUD with React Context API and Hooks
        </h3>
        <div className="flex items-center mt-24 mb-10">
          <div className="flex-grow text-left px-4 py-2 m-2">
            <h5 className="text-gray-900 font-bold text-xl">Employee Listing</h5>
          </div>
          <div className="flex-grow text-right px-4 py-2 m-2">
            <Link to="/add">
              <button className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                <span className="pl-2">Add Employee</span>
              </button>
            </Link>
          </div>
        </div>
        <EmployeeList />
      </div>
    </div>
  );
};

const AddEmployee = () => {
  const history = useHistory();
  const { addEmployee } = useContext(GlobalContext);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [designation, setDesignation] = useState('');

  const onSubmit = (e) => {
    addEmployee({
      id: uuidv4(),
      name,
      location,
      designation
    });

    e.preventDefault();
    history.push("/");
  };
  
  return (
    <form className="w-full max-w-sm container mt-20 mx-auto" onSubmit={onSubmit}>
      <div className="w-full mb-5">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
          Name of employee
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter name" />
      </div>
      <div className="w-full mb-5">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="location">
          Location
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline" value={location} onChange={(e) => setLocation(e.target.value)} type="text" placeholder="Enter location" />
      </div>
      <div className="w-full mb-5">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="designation">
          Designation
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600" value={designation} onChange={(e) => setDesignation(e.target.value)} type="text" placeholder="Enter designation" />
      </div>
      <div className="flex items-center justify-between">
        <button className="mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add Employee
        </button>
      </div>
      <div className="text-center mt-4 text-gray-500">
        <Link to="/">Cancel</Link>
      </div>
    </form>
  );
};

const EditEmployee = () => {
  const history = useHistory();
  const { editEmployee, employees } = useContext(GlobalContext);
  const { id } = useParams();
  const [selectedUser, setSeletedUser] = useState({ id: null, name: '', designation: '', location: '' });

  useEffect(() => {
    const selectedUser = employees.find((employee) => employee.id === id);
    setSeletedUser(selectedUser);
  }, []);

  const onSubmit = (e) => {
    editEmployee(selectedUser);
    e.preventDefault();
    history.push('/');
  };

  const handleOnChange = (userKey, value) => setSeletedUser({
    ...selectedUser,
    [userKey]: value
  });

  if (!selectedUser || !selectedUser.id)  return <div>Employee not found</div>

  return (
    <form className="w-full max-w-sm container mt-20 mx-auto" onSubmit={onSubmit}>
      <div className="w-full mb-5">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
          Name of employee
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline" value={selectedUser.name} onChange={(e) => handleOnChange('name', e.target.value)} type="text" placeholder="Enter name" />
      </div>
      <div className="w-full mb-5">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="location">
          Location
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline" value={selectedUser.location} onChange={(e) => handleOnChange('location', e.target.value)} type="text" placeholder="Enter location" />
      </div>
      <div className="w-full mb-5">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="designation">
          Designation
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline" value={selectedUser.designation} onChange={(e) => handleOnChange('designation', e.target.value)} type="text" placeholder="Enter designation" />
      </div>
      <div className="flex items-center justify-between">
        <button className="block mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:text-gray-600 focus:shadow-outline">
          Edit Employee
        </button>
      </div>
      <div className="text-center mt-4 text-gray-500">
        <Link to="/">
          Cancel
        </Link>
      </div>
  </form>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <GlobalState>
        <Switch>
          <Route path="/add" exact>
            <AddEmployee />
          </Route>
          <Route path="/edit/:id" exact>
            <EditEmployee />
          </Route>
          <Route>
            <Home />
          </Route>
        </Switch>
      </GlobalState>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <App />,
  document.querySelector('#app')
);