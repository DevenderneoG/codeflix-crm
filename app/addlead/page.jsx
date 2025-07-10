import AddLead from "../addlead/[id]/page";

export const metadata = {
  title: "Codeflix CRM App | Add Lead Page",
  description: "This is Home Blog page for Codeflix Next.js",
};

const AddLeadPage = () => {
  return (
    <>
      <AddLead isEditMode={false} />
    </>
  );
};

export default AddLeadPage;
