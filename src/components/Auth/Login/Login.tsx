import {
  Typography,
  TextField,
  Button,
  InputAdornment,
  Stack,
  IconButton,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import type { RootState } from "../../../store/store";
import { loginUser } from "../../../store/User/userSlice";

type UserFormField = {
  email: string;
  password: string;
};

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const userObj = useSelector((state: RootState) => state.UserReducer);
  const navigate = useNavigate();

  const handleClickOnShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<UserFormField>();

  useEffect(() => {
    if (userObj.error) {
      setError("root", {
        type: "authentication",
        message: "Invalid email or password",
      });
      return;
    }
  }, [userObj.error, setError]);
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

  const onSubmit: SubmitHandler<UserFormField> = (data) => {
    dispatch(loginUser(data));

    navigate("/");
  };

  return (
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
          Login
        </Typography>

        <TextField
          {...register("email")}
          type="email"
          label="Email"
          variant="outlined"
          color="primary"
          size="medium"
          required
        ></TextField>

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
        <Stack>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Login"}
          </Button>
          {errors.root && (
            <Typography color="red">{errors.root.message}</Typography>
          )}
          <Typography variant="subtitle2" color="gray">
            A new User: <Link to="/signup">Sign Up</Link>
          </Typography>
        </Stack>
      </Stack>
    </form>
  );
};
