import type { Portfolio } from "../../services/portfolio.service";
import { BusinessKeyLink } from "./BusinessKeyLink";
import { CustomerNumberLink } from "./CustomerNumberLink";

interface GridListLinksProps {
  portfolio: Portfolio;
}

export function GridListLinks({ portfolio }: GridListLinksProps) {
  return (
    <span>
      <BusinessKeyLink>{portfolio.customerNumber}</BusinessKeyLink> •{" "}
      <CustomerNumberLink>{portfolio.businessKey}</CustomerNumberLink>
    </span>
  );
}
