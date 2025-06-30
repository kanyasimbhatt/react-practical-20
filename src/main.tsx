import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./components/Auth/userProvider.tsx";
import App from "./App.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <Router>
        <App />
      </Router>
    </UserProvider>
  </QueryClientProvider>
);
