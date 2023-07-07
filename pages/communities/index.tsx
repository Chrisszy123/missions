import type { NextPage } from "next";
import CommunitiesPage from "@/templates/Communities/DiscoverPage";
import { getCommunities } from "@/utils/axios";
import ErrorBoundary from "pages/_error";

const Discover: NextPage = () => {
    return <CommunitiesPage/>;
};
const WithErrorBoundary: React.FC = () => (
    <ErrorBoundary>
      <Discover />
    </ErrorBoundary>
  );
export default WithErrorBoundary;
