"use client";

import { useState } from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { useDispatch } from "react-redux";
import { addAgent } from "../../store/agents/agentsSlice";
import { useParams, useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';

const AddAgent = ({ isEditMode = false }) => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addAgent(formData)).unwrap();
      toast.success("Agent Added successfully!");
      router.push("/agents");
    } catch (err) {
      toast.error("Failed to submit Agent: " + (err.message || "Unknown error"));
    }
  };

  return (
    <>
      <Breadcrumb pageName={isEditMode ? "Edit Lead" : "Add New Sales Agent"} />
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-[#e2e8f0] bg-white shadow-default dark:border-[#2e3a47] dark:bg-[#24303f]">
              <div className="border-b border-[#e2e8f0] py-4 px-6.5 dark:border-[#2e3a47]">
                <h3 className="font-medium text-black dark:text-white">
                  {isEditMode ? "Edit Lead Form" : "Add New Agent Form"}
                </h3>
              </div>
              <div className="p-6.5">
                <InputField
                  label="Agent Name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 min-w-[142px] inline-block text-center"
                >
                  {isEditMode ? "Update Agent" : "Create Agent"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

const InputField = ({
  label,
  name,
  type = "text",
  required,
  value,
  onChange,
}) => (
  <div className="mb-4.5">
    <label className="mb-2.5 block text-black dark:text-white">
      {label} {required && <span className="text-meta-1">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      required={required}
      onChange={onChange}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />
  </div>
);

export default AddAgent;
