import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import RootLayout from "./components/Layout/RootLayout";
import Signup from "./components/Signup/Signup";
import Home from "./components/Layout/Home";
import ForgotPassword from "./components/Layout/ForgotPassword";
import { useSelector } from "react-redux";
import { Suspense, lazy } from "react";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const ComposeMail = lazy(() => import("./components/Mails/ComposeMail"));
  const Inbox = lazy(() => import("./components/Mails/Inbox"));
  const InboxMsg = lazy(() => import("./components/Mails/InboxMsg"));
  const Sent = lazy(() => import("./components/Mails/Sent"));
  const SentMsg = lazy(() => import("./components/Mails/SentMsg"));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Signup />} />
          <Route
            path="home"
            element={isLoggedIn ? <Home /> : <Navigate to="/" />}
          />
          <Route path="forgot" element={<ForgotPassword />} />
          <Route
            path="compose"
            element={
              isLoggedIn ? (
                <Suspense
                  fallback={
                    <div className="text-center font-bold text-amber-900">
                      Loading...
                    </div>
                  }
                >
                  <ComposeMail />
                </Suspense>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="inbox"
            element={
              isLoggedIn ? (
                <Suspense
                  fallback={
                    <div className="text-center font-bold text-amber-900">
                      Loading...
                    </div>
                  }
                >
                  <Inbox />
                </Suspense>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="inbox/:msgId"
            element={
              isLoggedIn ? (
                <Suspense
                  fallback={
                    <div className="text-center font-bold text-amber-900">
                      Loading...
                    </div>
                  }
                >
                  <InboxMsg />
                </Suspense>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="sent"
            element={
              isLoggedIn ? (
                <Suspense
                  fallback={
                    <div className="text-center font-bold text-amber-900">
                      Loading...
                    </div>
                  }
                >
                  <Sent />
                </Suspense>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="sent/:msgId"
            element={
              isLoggedIn ? (
                <Suspense
                  fallback={
                    <div className="text-center font-bold text-amber-900">
                      Loading...
                    </div>
                  }
                >
                  <SentMsg />
                </Suspense>
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
