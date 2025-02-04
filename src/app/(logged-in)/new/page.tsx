import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const Page = () => {
  const onSubmit = () => {};
  const form = useForm({});
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}></form>
    </Form>
  );
};

export default Page;
