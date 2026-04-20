import { CopilotKit } from "@copilotkit/react-core";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ChatRoute } from "@/routes/chat";
import { CreateRoute } from "@/routes/create/page";

export function App() {
  return (
    <CopilotKit
      runtimeUrl={
        import.meta.env.VITE_RUNTIME_HOST
          ? `https://${import.meta.env.VITE_RUNTIME_HOST}.onrender.com/api/copilotkit`
          : "/api/copilotkit"
      }
      showDevConsole={false}
    >
      <BrowserRouter>
        <NuqsAdapter>
          <Routes>
            <Route path="/" element={<ChatRoute />} />
            <Route path="/create" element={<CreateRoute />} />
          </Routes>
        </NuqsAdapter>
      </BrowserRouter>
    </CopilotKit>
  );
}
