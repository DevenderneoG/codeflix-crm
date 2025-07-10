import Link from "next/link";

const TableOne = ({ agents }) => {
  console.log("Agents in TableOne:", agents);

  return (
    <div className="rounded-sm border border-[#e2e8f0] bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-#2e3a47 dark:bg-[#24303f] sm:px-7.5 xl:pb-1">
      <div className="mb-6 flex items-center justify-between">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Agents List
        </h4>
        <div>
          <Link
            href="/agents/addagent"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 min-w-[142px] inline-block text-center"
          >
            Add Agent
          </Link>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-[#f7f9fc] dark:bg-[#313d4a] sm:grid-cols-5">
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
        </div>

        {agents.map((agent, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === agents.length - 1
                ? ""
                : "border-b border-[#e2e8f0] dark:border-[#2e3a47]"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block">
                <Link href={`/agents/${agent._id}`}>{agent.name}</Link>
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{agent.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
