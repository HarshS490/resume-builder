import { RepositoryView } from "@/app/(auth)/login/repository-view";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const DashboardPage = () => {
  return (
    <div className="px-5 py-10 md:px-10 lg:px-14">
      <Card >
        <CardHeader>
          <CardTitle>Projects</CardTitle>
          <CardDescription>Select your projects here</CardDescription>
        </CardHeader>
        <CardContent>
          <RepositoryView />
        </CardContent>
      </Card>
    </div>
  )
};

export default DashboardPage;
