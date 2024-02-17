"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Swal from "sweetalert2";
import LoadingData from "./LoadingData";

const ApplicantForm = () => {
  const [applicants, setApplicants] = useState([]);
  const [columns, setColumns] = useState([
    { id: "isPrimary", label: "Primary Applicant" },
    { id: "firstName", label: "First Name" },
    { id: "lastName", label: "Last Name" },
    { id: "mobile", label: "Mobile" },
    { id: "email", label: "Email" },
  ]);
  const [formData, setFormData] = useState({
    applicantId: "",
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    isPrimary: false,
  });
  const [isDataUpdating, setIsDataUpdating] = useState(false);

  useEffect(() => {
    const savedApplicants = JSON.parse(sessionStorage.getItem("applicants"));
    if (savedApplicants) {
      setApplicants(savedApplicants);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("applicants", JSON.stringify(applicants));
  }, [applicants]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addApplicant = () => {
    let newApplicant = { ...formData };
    newApplicant["applicantId"] = applicants.length + 1;

    Swal.fire({
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
      text: `${newApplicant.firstName + " " + newApplicant.lastName} is added as ${newApplicant.isPrimary ? "primary applicant" : "applicant"}`,
    });
    updateData();
    setApplicants([...applicants, newApplicant]);

    setFormData({
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
      isPrimary: false,
    });
  };

  const removeApplicant = (index) => {
    Swal.fire({
      title: "Confirm delete applicant",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          text: `${applicants[index].firstName + " " + applicants[index].lastName} is removed`,
        });

        updateData();

        const updatedApplicants = [...applicants];
        updatedApplicants.splice(index, 1);
        setApplicants(updatedApplicants);
      } else {
        return false;
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.mobile ||
      !formData.email
    ) {
      Swal.fire({
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
        text: "Please fill in all fields!",
      });
      return;
    }
    addApplicant();
  };

  const setPrimaryApplicant = (applicantId) => {
    const updatedApplicants = applicants.map((applicant, i) => ({
      ...applicant,
      isPrimary: applicant.applicantId === applicantId,
    }));

    const primaryApplicant = updatedApplicants.filter(
      (applicant) => applicant.isPrimary,
    )[0];

    Swal.fire({
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
      text: `${primaryApplicant.firstName + " " + primaryApplicant.lastName} is now the primary applicant`,
    });

    setApplicants(updatedApplicants);
  };

  const updateData = () => {
    setIsDataUpdating(true);

    setTimeout(() => {
      setIsDataUpdating(false);
    }, 1000);
  };

  return (
    <div>
      <Head>
        <title>Applicant Form</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-lg mx-auto py-6">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Applicant Form
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              className="appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              className="appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="mobile"
            >
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              placeholder="Mobile Number (eg. 9123456789)"
              value={formData.mobile}
              onChange={handleInputChange}
              className="appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              pattern="[0-9]{10}"
              required
            />
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email (eg. john.doe@domain.com)"
              value={formData.email}
              onChange={handleInputChange}
              className="appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="isPrimary"
              name="isPrimary"
              checked={formData.isPrimary}
              onChange={() =>
                setFormData({ ...formData, isPrimary: !formData.isPrimary })
              }
              className="mr-2 leading-tight"
            />
            <label className="text-sm" htmlFor="isPrimary">
              Primary Applicant
            </label>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Applicant
          </button>
        </form>
      </main>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Applicants</h2>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              {columns &&
                columns.map((col) => (
                  <th
                    key={col.id}
                    className="border border-gray-200 px-4 py-2 text-white bg-sky-900"
                  >
                    {col.label}
                  </th>
                ))}
              <th
                key={"actions"}
                className="border border-gray-200 px-4 py-2 text-white bg-sky-900"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isDataUpdating ? (
              <tr className="bg-white">
                <td colSpan={6} className="border border-gray-200 px-4 py-2">
                  <LoadingData />
                </td>
              </tr>
            ) : applicants.length > 0 ? (
              applicants.map((applicant, index) => (
                <tr key={index} className="bg-white">
                  <td className="border border-gray-200 px-4 py-2">
                    <input
                      type="checkbox"
                      id="isPrimary"
                      name="isPrimary"
                      checked={applicant.isPrimary}
                      onChange={() =>
                        setPrimaryApplicant(applicant.applicantId)
                      }
                      className="mr-2 leading-tight text-center"
                    />
                  </td>
                  {columns &&
                    columns.map(
                      (col) =>
                        col.id !== "isPrimary" && (
                          <td className="border border-gray-200 px-4 py-2 text-center text-black">
                            {applicant[col.id]}
                          </td>
                        ),
                    )}
                  <td className="border border-gray-200 px-4 py-2">
                    <button
                      onClick={() => removeApplicant(index)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white">
                <td
                  colSpan={6}
                  className="border border-gray-200 px-4 py-2 text-black text-center"
                >
                  No Applicant Record
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicantForm;
