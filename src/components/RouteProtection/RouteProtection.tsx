import { Outlet, Navigate } from "react-router-dom";

type ChildrenType = {
  userId: string;
};

const RouteProtection = ({ userId }: ChildrenType) => {
  const newLocation = `${location}`;
  return (
    <>
      {userId ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: newLocation }} replace />
      )}
    </>
  );
};

export default RouteProtection;
