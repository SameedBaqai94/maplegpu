import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import ButtonComponent from "../../common/ButtonComponent";
import { Link } from "react-router-dom";

export default function NavBarComponent() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    {/* Left Section */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Typography
                            variant="h6"
                            component={Link}
                            to="/"
                            sx={{
                                textDecoration: "none",
                                color: "inherit",
                            }}
                        >
                            MapleGPU
                        </Typography>
                        <Typography
                            variant="button"
                            component={Link}
                            to="/products"
                            sx={{
                                textDecoration: "none",
                                color: "inherit",
                            }}
                        >
                            Products
                        </Typography>
                    </Box>

                    {/* Right Section */}
                    <Link to={"login"}>
                        <ButtonComponent>
                            Log in
                        </ButtonComponent>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    )
}