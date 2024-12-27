import "./App.css";
import { SnackbarProvider } from "./core/providers/snackbar.provider";
import { RealtimeLogs } from "./logging";

function App() {
  return (
    <main className="bg-slate-100 dark:bg-slate-800 min-h-screen">
      <SnackbarProvider />
      <RealtimeLogs />
    </main>
  );
}

export default App;
