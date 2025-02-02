import SignInCard from "@/features/auth/components/sign-in-card";

// TODO: If already logged in then go to /dashboard
const Page = async () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#f1f6f5]">
      <SignInCard />
    </div>
  );
};

export default Page;
