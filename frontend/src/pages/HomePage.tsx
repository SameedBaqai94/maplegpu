import { Box, Container, Toolbar } from "@mui/material";
import NavBarComponent from "../components/features/Navbar/NavBarComponent";
import { Outlet } from "react-router-dom";

interface HomePageInterface {
    children: React.ReactNode;
}
export default function HomePage() {
    return (
        <Box>
            <NavBarComponent />
            <Toolbar />
            <Container>
                <Box sx={{ my: 2, border: "1px solid black" }}>
                    <Outlet />
                </Box>
            </Container>
        </Box>
    )
}