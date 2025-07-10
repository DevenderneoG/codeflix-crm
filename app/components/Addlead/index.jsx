"use client";

import { useState, useEffect } from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import {
  addLeads,
  fetchLeadDetails,
  updateLead,
} from "../../store/leads/leadsSlice";
import { fetchAgents } from "../../store/agents/agentsSlice";
import { useParams, useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';

// const notify = () => toast('Here is your toast.');

const AddLead = ({ isEditMode = false }) => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { selectedLead } = useSelector((state) => state.lead);
  const { agents } = useSelector((state) => state.agent);
  const tagOptions = ["High Value", "Follow-up", "Cold", "Interested"];

  const [formData, setFormData] = useState({
    name: "",
    source: "",
    salesAgent: "",
    status: "",
    tags: [],
    timeToClose: "",
    priority: "",
  });

  useEffect(() => {
    dispatch(fetchAgents());

    if (id) {
      dispatch(fetchLeadDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id && selectedLead) {
      setFormData(selectedLead);
    }
  }, [selectedLead, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagToggle = (tag) => {
    setFormData((prev) => {
      const tags = prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag];
      return { ...prev, tags };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await dispatch(updateLead({ id, updatedData: formData })).unwrap();
        toast.success("Lead updated successfully!");
      } else {
        await dispatch(addLeads(formData)).unwrap();
         toast.success("Lead updated successfully!");
      }
      router.push("/");
    } catch (err) {
      toast.error("Failed to submit lead: " + (err.message || "Unknown error"));
    }
  };

  return (
    <>
      <Breadcrumb pageName={isEditMode ? "Edit Lead" : "Add New Lead"} />
      {/* <button onClick={notify}>Make me a toast</button> */}
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-[#e2e8f0] bg-white shadow-default dark:border-[#2e3a47] dark:bg-[#24303f]">
              <div className="border-b border-[#e2e8f0] py-4 px-6.5 dark:border-[#2e3a47]">
                <h3 className="font-medium text-black dark:text-white">
                  {isEditMode ? "Edit Lead Form" : "Add New Lead Form"}
                </h3>
              </div>
              <div className="p-6.5">
                <InputField
                  label="Lead Name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
                <SelectField
                  label="Lead Source"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  options={[
                    "Website",
                    "Referral",
                    "Cold Call",
                    "Advertisement",
                    "Email",
                    "Other",
                  ]}
                />
                <SelectField
                  label="Assigned Sales Agent"
                  name="salesAgent"
                  value={formData.salesAgent}
                  onChange={handleChange}
                  options={agents.map((agent) => ({
                    label: agent.name,
                    value: agent._id,
                  }))}
                />
                <SelectField
                  label="Lead Status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  options={[
                    "New",
                    "Contacted",
                    "Qualified",
                    "Proposal Sent",
                    "Closed",
                  ]}
                />
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {tagOptions.map((tag) => (
                      <span
                        key={tag}
                        onClick={() => handleTagToggle(tag)}
                        className={`cursor-pointer rounded-full px-3 py-1 text-sm border ${
                          formData.tags.includes(tag)
                            ? "bg-[#3c50e0] text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <InputField
                  label="Time to Close (in days)"
                  name="timeToClose"
                  type="number"
                  value={formData.timeToClose}
                  onChange={handleChange}
                />
                <SelectField
                  label="Priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  options={["High", "Medium", "Low"]}
                />
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 min-w-[142px] inline-block text-center"
                >
                  {isEditMode ? "Update Lead" : "Add Lead"}
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

const SelectField = ({ label, name, value, onChange, options }) => (
  <div className="mb-4.5">
    <label className="mb-2.5 block text-black dark:text-white">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option value="">Select {label}</option>
      {options.map((opt) =>
        typeof opt === "string" ? (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ) : (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        )
      )}
    </select>
  </div>
);

export default AddLead;
