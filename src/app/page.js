import EmployeeList from "./components/EmployeeList";
import AddEmployeeBtn from "./components/AddEmployeeBtn";

export default function Home() {
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
            <AddEmployeeBtn />
          </div>
        </div>
        <EmployeeList />
      </div>
    </div>
  );
}
