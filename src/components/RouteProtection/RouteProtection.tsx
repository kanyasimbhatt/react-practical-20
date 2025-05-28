import { Outlet, Navigate } from "react-router-dom";

type ChildrenType = {
  userId: string;
};

export const RouteProtection = ({ userId }: ChildrenType) => {
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
