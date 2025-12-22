import { createRootRoute, Outlet } from "@tanstack/react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Layout from "../components/Layout";

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <Layout>
        <Outlet />
      </Layout>
      <Footer />
    </>
  ),
});
