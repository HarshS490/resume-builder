import { ResumeForm } from "@/features/userdata/components/resume-form";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth()
  if (!session) {
    redirect('/login')
  }
  return <ResumeForm />
};

export default Page;
