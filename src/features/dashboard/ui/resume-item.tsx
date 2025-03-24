import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Pen } from "lucide-react";

// TODO: Take actual resume type
export const ResumeItem = ({
  resume: { date, description, image, title },
}: {
  resume: {
    image?: string;
    title: string;
    description: string;
    date: Date;
  };
}) => {
  return (
    <Card className="w-[250px]">
      <CardContent className="py-3 px-2">
        <div className="bg-zinc-400 h-52 rounded-lg">
          {image && <img src={image} alt={title} />}
        </div>
        <div className="flex flex-col gap-2 mt-5">
          <CardTitle>{title}</CardTitle>
          <div className="text-black/70">{date.toLocaleDateString()}</div>
          <div>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="ml-auto">
          <Pen />
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
};
