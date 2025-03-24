import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useSidebar = ({ name = "app-sidebar" }: { name?: string }) => {
  const queryClient = useQueryClient();
  const { data: sidebarState } = useQuery({
    queryKey: [name],
    queryFn: () => {
      const localState = localStorage.getItem(name) as
        | "collapsed"
        | "expanded"
        | null;
      if (localState) {
        return localState;
      } else {
        localStorage.setItem(name, "collapsed");
        return "collapsed";
      }
    },
  });
  const { mutate: setSidebar } = useMutation({
    mutationFn: async ({ state }: { state: "expanded" | "collapsed" }) => {
      localStorage.setItem(name, state);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [name] });
    },
  });

  return { sidebarState, setSidebar };
};
