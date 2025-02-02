import LoginRedirect from "@/features/auth/components/login-redirect";
import SignInCard from "@/features/auth/components/sign-in-card";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const from = (await searchParams).from;
  return (
    <div className="flex items-center justify-center h-screen bg-[#f1f6f5]">
      <LoginRedirect>
        <SignInCard
          from={from ? (from instanceof Array ? from[0] : from) : undefined}
        />
      </LoginRedirect>
    </div>
  );
};

export default Page;
