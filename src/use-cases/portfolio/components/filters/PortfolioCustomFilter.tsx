import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SidebarMenuItem } from "@/components/ui/sidebar";
import { parseAsString } from "nuqs";
import { usePortfolioQueryStates } from "../../hooks/usePortfolioQueryStates";

const parser = parseAsString.withDefault("");

export function PortfolioCustomFilter() {
  const [{ firstName, lastName }, setState] = usePortfolioQueryStates({
    firstName: parser,
    lastName: parser,
  });

  return (
    <SidebarMenuItem className="flex flex-col gap-4 px-4 py-2">
      <form className="grid w-full items-center gap-1.5">
        <Label htmlFor="firstName">First name</Label>
        <Input
          type="text"
          id="firstName"
          placeholder="Enter first name"
          className="w-full"
          value={firstName}
          onChange={(e) => setState({ firstName: e.target.value })}
        />
      </form>
      <form className="grid w-full items-center gap-1.5">
        <Label htmlFor="lastName">Last name</Label>
        <Input
          type="text"
          id="lastName"
          placeholder="Enter last name"
          className="w-full"
          value={lastName}
          onChange={(e) => setState({ lastName: e.target.value })}
        />
      </form>
    </SidebarMenuItem>
  );
}
