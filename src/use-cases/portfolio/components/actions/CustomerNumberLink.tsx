import { Button } from "@/components/ui/button";

export type CustomerNumberLinkProps = {
  children: string;
};

export function CustomerNumberLink({ children }: CustomerNumberLinkProps) {
  return (
    <Button
      variant="link"
      className="p-0 m-0  h-auto text-foreground font-medium"
    >
      {children}
    </Button>
  );
}
