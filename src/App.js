import AuthContextProvider from "./context/AuthContextProvider";
import CustomRoutes from "./router/custom-routes";

function App() {
  return (
    <AuthContextProvider>
      <CustomRoutes />
    </AuthContextProvider>
  );
}

export default App;
