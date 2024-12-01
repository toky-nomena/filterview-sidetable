import { Button } from "@/components/ui/button";

export type BusinessKeyLinkProps = {
  children: string;
};

export function BusinessKeyLink({ children }: BusinessKeyLinkProps) {
  return (
    <Button
      variant="link"
      className="p-0 m-0 h-auto text-foreground font-medium"
    >
      {children}
    </Button>
  );
}
