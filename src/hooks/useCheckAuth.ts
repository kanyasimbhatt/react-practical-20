import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getData } from "../Utils/store";
import type { User } from "../Types/UserType";

const useCheckAuth = () => {
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const userId = getData("user-id");
    const userArray =
      JSON.parse(localStorage.getItem("users-array") as string) || [];

    const userData = userArray.find((user: User) => user.id === userId);
    if (userData) {
      navigate("/");
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  return { isLoading };
};

export default useCheckAuth;
