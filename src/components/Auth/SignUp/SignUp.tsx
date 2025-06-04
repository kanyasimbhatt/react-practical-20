import {
  Typography,
  TextField,
  Button,
  InputAdornment,
  Stack,
  IconButton,
  LinearProgress,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import type { User } from "../../../Types/UserType";
import { useUsers } from "../userProvider";
import useCheckAuth from "../../../hooks/useCheckAuth";
import {
  fetchUserData,
  storeUserData,
} from "../../../Services/User/userService";
import { setData } from "../../../Utils/store";

const schema = z.object({
  id: z.string(),
  name: z
    .string()
    .refine(
      (value) => /^[a-zA-Z]+\s+[a-zA-Z]+$/.test(value ?? ""),
      "Please enter both First Name and Last Name"
    ),
  email: z.string().email(),
  phoneNumber: z
    .string()
    .refine(
      (value) => /^(\d{10})$/.test(value ?? ""),
      "Please Enter a 10 digit number"
    ),
  password: z
    .string()
    .refine(
      (value) =>
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
          value ?? ""
        ),
      `Enter Proper password having minimum 8 length, at least 1 uppercase, 1 lowercase, 1 special character`
    ),
});

type UserFormField = z.infer<typeof schema>;

export const SignUp = () => {
  const { isLoading } = useCheckAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUserId } = useUsers();

  const mutation = useMutation({
    mutationFn: (data: User) => storeUserData(data),
    onSuccess: (data: User) => {
      setUserId(data.id);
      setData<string>("user-id", data.id);
      navigate("/");
    },
    onError: (error) => console.log(error),
  });

  const handleClickOnShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const { data } = useQuery({
    queryKey: ["users/fetchUsers"],
    queryFn: fetchUserData,
  });

  const defaultValue = {
    id: "",
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UserFormField>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: defaultValue,
  });

  const slotPropsForPassword = {
    input: {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label={
              showPassword ? "hide the password" : "display the password"
            }
            onClick={handleClickOnShowPassword}
            edge="end"
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        </InputAdornment>
      ),
    },
  };

  const slotPropsForPhoneNumber = {
    input: {
      startAdornment: <InputAdornment position="start">+91</InputAdornment>,
    },
  };

  const onSubmit: SubmitHandler<UserFormField> = (FormData) => {
    const present = data.some((user: User) => user.email === FormData.email);
    if (present) {
      setError("root", {
        type: "authentication",
        message: "Email Id Already Exists",
      });
      return;
    }
    mutation.mutate({ ...FormData, id: crypto.randomUUID(), favorites: [] });
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            direction={"column"}
            spacing={3}
            maxWidth={"600px"}
            margin={"auto"}
            marginTop={"80px"}
            padding={"80px"}
            boxShadow={"0px 0px 20px gray"}
            borderRadius={"7px"}
          >
            <Typography variant="h4" textAlign={"center"}>
              Sign Up
            </Typography>
            <Stack>
              <TextField
                {...register("name")}
                type="text"
                label="Full Name"
                variant="outlined"
                color="primary"
                size="medium"
                required
              ></TextField>
              {errors.name && (
                <Typography color="error">{errors.name.message}</Typography>
              )}
            </Stack>

            <Stack>
              <TextField
                {...register("email")}
                type="email"
                label="Email"
                variant="outlined"
                color="primary"
                size="medium"
                required
              ></TextField>
              {errors.email && (
                <Typography color="error">{errors.email.message}</Typography>
              )}
            </Stack>
            <Stack>
              <TextField
                {...register("phoneNumber")}
                type="text"
                label="Phone Number"
                variant="outlined"
                color="primary"
                slotProps={slotPropsForPhoneNumber}
                size="medium"
                required
              ></TextField>
              {errors.phoneNumber && (
                <Typography color="error">
                  {errors.phoneNumber.message}
                </Typography>
              )}
            </Stack>
            <Stack>
              <TextField
                {...register("password")}
                type={showPassword ? "text" : "password"}
                label="Password"
                slotProps={slotPropsForPassword}
                variant="outlined"
                color="primary"
                size="medium"
                helperText="Do not share your password with anyone"
                required
              ></TextField>
              {errors.password && (
                <Typography color="error">{errors.password.message}</Typography>
              )}
            </Stack>

            <Stack>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Loading..." : "Sign Up"}
              </Button>
              {errors.root && (
                <Typography color="error">{errors.root.message}</Typography>
              )}
              <Typography variant="subtitle2" color="gray">
                Already a user: <Link to="/login">Login</Link>
              </Typography>
            </Stack>
          </Stack>
        </form>
      )}
    </>
  );
};

export const Loading = () => {
  return <LinearProgress />;
};
