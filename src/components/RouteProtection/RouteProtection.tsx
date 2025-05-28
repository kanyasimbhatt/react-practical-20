import { Outlet, Navigate } from "react-router-dom";
import Layout from "../../Layout/Layout";

type ChildrenType = {
  userId: string;
};

export const RouteProtection = ({ userId }: ChildrenType) => {
  const newLocation = `${location}`;
  return (
    <>
      {userId ? (
        <Layout>
          <Outlet />
        </Layout>
      ) : (
        <Navigate to="/login" state={{ from: newLocation }} replace />
      )}
    </>
  );
};
