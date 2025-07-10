"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import TableOne from "../Tables/TableOne";
import { fetchAgents } from "../../store/agents/agentsSlice";

const Agents = () => {
  const dispatch = useDispatch();
  const { agents } = useSelector((state) => state.agent);

  useEffect(() => {
    dispatch(fetchAgents());
  }, [dispatch]);

  return (
    <>
      <Breadcrumb pageName="Agents" />
      <div className="flex flex-col gap-10">
        <TableOne agents={agents} />
      </div>
    </>
  );
};

export default Agents;
