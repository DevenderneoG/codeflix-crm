"use client";

import Link from "next/link";
import { useDispatch } from "react-redux";
import { removeAgent } from "../../store/agents/agentsSlice";
import toast, { Toaster } from "react-hot-toast";

const AgentList = ({ agents }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (!id) {
      toast.error("Invalid agent ID");
      return;
    }

    dispatch(removeAgent({ id }))
      .unwrap()
      .then(() => toast.success("Agent deleted successfully!"))
      .catch((err) =>
        toast.error(
          "Failed to delete agent: " + (err.message || "Unknown error")
        )
      );
  };

  return (
    <div className="rounded-sm border border-[#e2e8f0] bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-#2e3a47 dark:bg-[#24303f] sm:px-7.5 xl:pb-1">
      <div className="mb-6 flex items-center justify-between">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Agents List
        </h4>
      </div>

      <div className="flex flex-col overflow-auto">
        <div className="grid grid-cols-3 rounded-sm bg-[#f7f9fc] dark:bg-[#313d4a] sm:grid-cols-3">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Email
            </h5>
          </div>
          <div className="p-2.5 text-end xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Action
            </h5>
          </div>
        </div>

        {agents.map((agent, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-3 ${
              key === agents.length - 1
                ? ""
                : "border-b border-[#e2e8f0] dark:border-[#2e3a47]"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="text-black dark:text-white sm:block">
                <Link href={`/agents/${agent._id}`}>{agent.name}</Link>
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{agent.email}</p>
            </div>
            <div className="flex items-center justify-end p-2.5 xl:p-5">
              <button
                onClick={() => handleDelete(agent._id)}
                className="cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="delete"
                  version="1.1"
                  viewBox="0 0 64 64"
                  width={24}
                  height={24}
                  fill="#ff0000"
                >
                  <g id="Icon-Trash" transform="translate(232 228)">
                    <path id="Fill-6" d="M-207.5-205.1h3v24h-3z"></path>
                    <path id="Fill-7" d="M-201.5-205.1h3v24h-3z"></path>
                    <path id="Fill-8" d="M-195.5-205.1h3v24h-3z"></path>
                    <path id="Fill-9" d="M-219.5-214.1h39v3h-39z"></path>
                    <path
                      id="Fill-10"
                      d="M-192.6-212.6h-2.8v-3c0-.9-.7-1.6-1.6-1.6h-6c-.9 0-1.6.7-1.6 1.6v3h-2.8v-3c0-2.4 2-4.4 4.4-4.4h6c2.4 0 4.4 2 4.4 4.4v3"
                    ></path>
                    <path
                      id="Fill-11"
                      d="M-191-172.1h-18c-2.4 0-4.5-2-4.7-4.4l-2.8-36 3-.2 2.8 36c.1.9.9 1.6 1.7 1.6h18c.9 0 1.7-.8 1.7-1.6l2.8-36 3 .2-2.8 36c-.2 2.5-2.3 4.4-4.7 4.4"
                    ></path>
                  </g>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentList;
