


import { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import NotFound from "./components/NotFound";
import { ErrorBoundary } from "./components/ErrorBoundary"; 


export const AppContext = createContext(null);

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<ErrorBoundary><Dashboard /></ErrorBoundary>} />
              <Route path="/team" element={<ErrorBoundary><Team /></ErrorBoundary>} />
              <Route path="/contacts" element={<ErrorBoundary><Contacts /></ErrorBoundary>} />
              <Route path="/invoices" element={<ErrorBoundary><Invoices /></ErrorBoundary>} />
              <Route path="/form" element={<ErrorBoundary><Form /></ErrorBoundary>} />
              <Route path="/bar" element={<ErrorBoundary><Bar /></ErrorBoundary>} />
              <Route path="/pie" element={<ErrorBoundary><Pie /></ErrorBoundary>} />
              <Route path="/line" element={<ErrorBoundary><Line /></ErrorBoundary>} />
              <Route path="/faq" element={<ErrorBoundary><FAQ /></ErrorBoundary>} />
              <Route path="/calendar" element={<ErrorBoundary><Calendar /></ErrorBoundary>} />
              <Route path="/geography" element={<ErrorBoundary><Geography /></ErrorBoundary>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;