import React from "react";

const EmployeeTable = ({ employeeData }) => {
  // Check if employeeData is available and not null
  if (!employeeData || Object.keys(employeeData).length === 0) {
    return <div>No employee data available.</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-xl font-bold">Employee Data</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Name
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Email
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Position
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Gender
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Address
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              City
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Phone Number
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              State / Province
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              ZIP / Postal
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Date of Birth
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Map over employeeData only if it's an array */}
          {Array.isArray(employeeData) && employeeData.map((employee, index) => (
            <tr key={index}>
              {/* Check if employee object is not null before accessing its properties */}
              <td className="px-6 py-4 whitespace-nowrap">{employee && employee.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee && employee.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee && employee.position}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee && employee.gender}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee && employee.address}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee && employee.city}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee && employee.phoneNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee && employee.state}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee && employee.zip}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee && employee.dob}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
