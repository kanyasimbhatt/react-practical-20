import { ErrorBoundary } from "react-error-boundary";
import Stack from "@mui/material/Stack";
import Navbar from "../components/Navbar/Navbar";
import ProductsProvider from "../components/Products/ProductsProvider";

type ChildrenType = {
  children: React.ReactNode;
};

const ApplicationLayout = ({ children }: ChildrenType) => {
  return (
    <>
      <Navbar />
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <ProductsProvider>{children}</ProductsProvider>
      </ErrorBoundary>
    </>
  );
};

const FallbackComponent = () => {
  return (
    <Stack
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack
        sx={{
          backgroundColor: "rgb(0, 0, 0, 0.2)",
          padding: "20px 40px 20px 40px",
          borderRadius: "10px",
        }}
      >
        <h1>Something Went Wrong</h1>
        <h2>Troubleshoot: </h2>
        <ul>
          <li>Try Reloading!</li>
          <li>Try Logging in again!</li>
          <li>Visit again after some time!</li>
        </ul>
        <h3>Thank you for your patience!</h3>
      </Stack>
    </Stack>
  );
};

export default ApplicationLayout;
