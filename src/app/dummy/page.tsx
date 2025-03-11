"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useChat } from "@ai-sdk/react";
import Markdown from "react-markdown";

const Page = () => {
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/ai/chat",
  });
  console.log(messages);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Completion</CardTitle>
      </CardHeader>
      <CardContent>
        {messages.map((m) => (
          <Card key={m.id}>
            <CardHeader>
              <CardTitle>{m.role}</CardTitle>
            </CardHeader>
            <CardContent className="prose">
              <Markdown>{m.content}</Markdown>
            </CardContent>
          </Card>
        ))}
      </CardContent>
      <CardFooter className="w-full">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <Input value={input} onChange={handleInputChange} />
            <Button type="submit">Submit</Button>
          </form>
      </CardFooter>
    </Card>
  );
};

export default Page;
