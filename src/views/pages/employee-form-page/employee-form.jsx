import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// import styled from "@emotion/styled";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import Button from "@mui/material/Button";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useEffect } from "react";

const EmployeeForm = () => {
  const top100Films = [
    { label: "front end developer" },
    { label: "back end developer" },
    { label: "Full stack developer" },
    { label: "react js developer" },
  ];

  // const VisuallyHiddenInput = styled("input")({
  //   clip: "rect(0 0 0 0)",
  //   clipPath: "inset(50%)",
  //   height: 1,
  //   overflow: "hidden",
  //   position: "absolute",
  //   bottom: 0,
  //   left: 0,
  //   whiteSpace: "nowrap",
  //   width: 1,
  // });

  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, setValid] = useState(true);
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    position: "",
    gender: "",
    address: "",
    city: "",
    phoneNumber: "",
    state: "",
    zip: "",
    dob: "",
    resume: null,
  });

  const [storedEmployeeData, setStoredEmployeeData] = useState({});

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("employeeData")) || {};
    setStoredEmployeeData(storedData);
  }, []);

  const handleChange = (value) => {
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setEmployeeData((prevData) => ({
      ...prevData,
      dob: date,
    }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEmployeeData({ ...employeeData, resume: file });
  };

  const handlePositionChange = (event, value) => {
    setEmployeeData({ ...employeeData, position: value.label });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSave = {
      ...employeeData,
      phoneNumber: phoneNumber,
      dob: dayjs(employeeData.dob).format("YYYY-MM-DD"),
    };

    if (employeeData.position) {
      dataToSave.position = employeeData.position;
    }

    const existingData = JSON.parse(localStorage.getItem("employeeData")) || {};

    const newData = {
      ...existingData,
      [dayjs().format("YYYY-MM-DDTHH:mm:ss")]: dataToSave,
    };

    localStorage.setItem("employeeData", JSON.stringify(newData));

    // Update the storedEmployeeData state here
    setStoredEmployeeData(newData);

    setEmployeeData({
      name: "",
      email: "",
      position: "",
      gender: "",
      address: "",
      city: "",
      phoneNumber: "",
      state: "",
      zip: "",
      dob: "",
      resume: null,
    });

    setPhoneNumber("");
  };

  return (
    <>
      <section className="p-6 mt-16">
        <form
          noValidate
          onSubmit={handleSubmit}
          action=""
          className="container flex flex-col mx-auto space-y-12"
        >
          <fieldset className="gap-6 p-6 text-black rounded-md shadow-md shadow-gray-600">
            <div className="items-center mb-8 text-center">
              <p className="text-2xl ">Employment Form</p>
            </div>

            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="firstname" className="text-sm ">
                  Name
                </label>
                <input
                  id="firstname"
                  type="text"
                  placeholder="First name"
                  className="w-full   border-[1px] rounded-sm  px-1 py-1 outline-none "
                  name="name"
                  value={employeeData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="email" className="text-sm ">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="w-full   border-[1px] rounded-sm px-1 py-1 outline-none "
                  name="email"
                  value={employeeData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-full sm:col-span-3 ">
                <label htmlFor="position" className="text-sm ">
                  Position you are applying for
                </label>
                <Autocomplete
                  label="Position"
                  disablePortal
                  id="combo-box-demo"
                  size="small"
                  options={top100Films}
                  onChange={handlePositionChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Position you are applying for"
                    />
                  )}
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="gender"
                  value={employeeData.gender}
                  onChange={(e) =>
                    setEmployeeData((prevData) => ({
                      ...prevData,
                      gender: e.target.value,
                    }))
                  }
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="address" className="text-sm ">
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  placeholder="Address"
                  className="w-full   border-[1px] rounded-sm px-1 py-1 outline-none "
                  name="address"
                  value={employeeData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="city" className="text-sm ">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  placeholder="City"
                  className="w-full   border-[1px] rounded-sm px-1 py-1 outline-none "
                  name="city"
                  value={employeeData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className=" col-span-full sm:col-span-2">
                <label className=""> Phone Number: </label>
                <PhoneInput
                  country={"in"}
                  value={phoneNumber}
                  onChange={handleChange}
                  inputProps={{
                    required: true,
                  }}
                />
                {!valid && <p>Please enter a valid phone number.</p>}
              </div>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="state" className="text-sm ">
                  State / Province
                </label>
                <input
                  id="state"
                  type="text"
                  placeholder="State / Province"
                  className="w-full   border-[1px] rounded-sm px-1 py-1 outline-none "
                  name="state"
                  value={employeeData.state}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="zip" className="text-sm ">
                  ZIP / Postal
                </label>
                <input
                  id="zip"
                  type="text"
                  placeholder="ZIP / Postal"
                  className="w-full   border-[1px] rounded-sm px-1 py-1 outline-none "
                  name="zip"
                  value={employeeData.zip}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label className="text-sm ">Date of birth</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={[
                      "DatePicker",
                      "MobileDatePicker",
                      "DesktopDatePicker",
                      "StaticDatePicker",
                    ]}
                  >
                    <DemoItem>
                      <DesktopDatePicker
                        value={employeeData.dob}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="mt-5 col-span-full sm:col-span-3">
                <div>
                  {" "}
                  <label htmlFor="resume" className="pr-3 text-sm ">
                    Resume
                  </label>{" "}
                </div>

                <input
                  type="file"
                  id="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
              </div>
              <div className="mt-10 col-span-full sm:col-span-2">
                <Button size="large" variant="contained" type="submit">
                  Submit
                </Button>
              </div>
            </div>
          </fieldset>
        </form>

        <div className="mt-10">
          <h2 className="mb-4 text-xl font-bold">Employee Data</h2>
          <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border border-gray-200">
                  Name
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border border-gray-200">
                  Email
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border border-gray-200">
                  Position
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border border-gray-200">
                  Gender
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border border-gray-200">
                  Address
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border border-gray-200">
                  City
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border border-gray-200">
                  Phone Number
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border border-gray-200">
                  ZIP
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border border-gray-200">
                  Date of Birth
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border border-gray-200">
                  Resume
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.values(storedEmployeeData).map((employee, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 border border-gray-200 whitespace-nowrap">
                    {employee.name}
                  </td>
                  <td className="px-6 py-4 border border-gray-200 whitespace-nowrap">
                    {employee.email}
                  </td>
                  <td className="px-6 py-4 border border-gray-200 whitespace-nowrap">
                    {employee.position}
                  </td>
                  <td className="px-6 py-4 border border-gray-200 whitespace-nowrap">
                    {employee.gender}
                  </td>
                  <td className="px-6 py-4 border border-gray-200 whitespace-nowrap">
                    {employee.address}
                  </td>
                  <td className="px-6 py-4 border border-gray-200 whitespace-nowrap">
                    {employee.city}
                  </td>
                  <td className="px-6 py-4 border border-gray-200 whitespace-nowrap">
                    {employee.phoneNumber}
                  </td>
                  <td className="px-6 py-4 border border-gray-200 whitespace-nowrap">
                    {employee.zip}
                  </td>
                  <td className="px-6 py-4 border border-gray-200 whitespace-nowrap">
                    {employee.dob}
                  </td>
                  <td className="px-6 py-4 border border-gray-200 whitespace-nowrap">
                    {employee.resume ? employee.resume.name : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default EmployeeForm;
