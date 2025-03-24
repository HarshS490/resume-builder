import { MultiStepForm } from "@/features/userdata/components/multi-step-form";

const Page =async ({params}:{params:Promise<{step:string}>}) => {
  const {step} = await params; 
  return (
    <div className="w-full flex gap-4 justify-between">
        <MultiStepForm step={step}/>
    </div>
  );
};

export default Page;
