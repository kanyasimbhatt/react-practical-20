import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user-id");
    navigate("/login");
  };

  const handleNavigation = () => {
    if (location.pathname === "/") {
      navigate("/add-product");
      return;
    }

    navigate("/");
  };
  return (
    <Box sx={{ flexGrow: 1, position: "fixed", top: 0, width: "100%" }}>
      <AppBar position="static">
          <Typography
            variant="h6"
            component="div"
            fontWeight={"bold"}
            sx={{ flexGrow: 1 }}
          >
            Shopify
          </Typography>

          <Stack direction={"row"} spacing={3}>
            <Button
              variant="text"
              sx={{ color: "white" }}
              onClick={handleNavigation}
            >
              {location.pathname === "/" ? "Add Products" : "View All Products"}
            </Button>
            <Button
              variant="text"
              sx={{ color: "white" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}