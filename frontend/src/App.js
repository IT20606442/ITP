import { useEffect } from "react";
import { useSelector } from "react-redux";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Kit 2 React themes
import theme from "assets/theme";
import Presentation from "layouts/pages/presentation";

import AppointmentForm from "layouts/pages/appointment/appointment-from";

import ArticleDetail from "layouts/pages/article/article-detail";
import ArticleForm from "layouts/pages/article/article-from";

import InventoryForm from "layouts/pages/inventory/inventory-from";

import PetForm from "layouts/pages/pet/pet-from";

import PrescriptionForm from "layouts/pages/prescription/prescription-from";

import TransportForm from "layouts/pages/transport/transport-from";

import VetForm from "layouts/pages/vet/vet-from";

import UserForm from "layouts/pages/user/user-from";

import MKAlert from "components/MKAlert";

// Material Kit 2 React routes
import routes from "routes";

export default function App() {
  // const dispatch = useDispatch();
  // const loading = useSelector((state) => state.auth.loading);
  const allAlert = useSelector((state) => state.auth.all_alert);
  const { pathname } = useLocation();

  useEffect(() => {
    // dispatch();
  }, []);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }
      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.name} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* {loading && <Loading message={loading} />} */}
      {allAlert && (
        <div className="alert-hover">
          {allAlert.map((alert, i) => (
            <MKAlert
              key={`id${i.toString()}`}
              alertId={i}
              color={alert.model}
              timeOut={alert.timeOut}
              title={alert.title}
              message={alert.message}
            />
          ))}
        </div>
      )}
      <Routes>
        {getRoutes(routes)}
        <Route path="/pages/appointment/form" element={<AppointmentForm />} />

        <Route path="/pages/articles/article" element={<ArticleDetail />} />
        <Route path="/pages/articles/form" element={<ArticleForm />} />

        <Route path="/pages/inventory/form" element={<InventoryForm />} />

        <Route path="/pages/pet/form" element={<PetForm />} />

        <Route path="/pages/prescription/form" element={<PrescriptionForm />} />

        <Route path="/pages/transport/form" element={<TransportForm />} />

        <Route path="/pages/vet/form" element={<VetForm />} />

        <Route path="/pages/user/form" element={<UserForm />} />

        <Route path="/presentation" element={<Presentation />} />
        <Route path="*" element={<Navigate to="/presentation" />} />
      </Routes>
    </ThemeProvider>
  );
}
