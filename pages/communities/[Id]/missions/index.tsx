import type { NextPage } from "next";
import MissionsPage from "@/templates/Mission/MissionPage";
import ErrorBoundary from "pages/_error";

const Discover: NextPage = () => {
    return <MissionsPage />;
};
const WithErrorBoundary: React.FC = () => (
    <ErrorBoundary>
      <Discover />
    </ErrorBoundary>
  );
export default WithErrorBoundary;
