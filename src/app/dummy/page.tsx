import { EducationDetailsTable } from "@/features/userdata/components/education-details/education-details-table";
import { WorkExperienceTable } from "@/features/userdata/components/work-experience/work-experience-table";

const Page = () => {
  return (
    <div>
      <EducationDetailsTable />
      <WorkExperienceTable />
    </div>
  );
};

export default Page;
