import { useState, type FormEvent } from "react"
import ButtonComponent from "../../common/ButtonComponent";
import InputComponent from "../../common/InputComponent";
import { Box, Typography } from "@mui/material";
import useAuth from "../../../hooks/useAuth";

export default function LoginForm() {
    const [email, setEmail] = useState<string>("");
    const [passwordHashed, setPasswordHashed] = useState<string>("");
    const { signIn, loading, error } = useAuth();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await signIn(email, passwordHashed);

        if (response.success) {
            console.log("Sign in successful:", response.data);
        } else {
            console.error("Sign in failed:", response.message);
        }
    }
    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: 400,
                margin: "0 auto",
                padding: 3,
                border: "1px dashed grey",
                borderRadius: 2,
                boxShadow: 2,
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
                Sign In
            </Typography>
            <InputComponent
                type="email"
                value={email}
                change={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                label="Email"
                require={true}
            />
            <InputComponent
                type="password"
                value={passwordHashed}
                change={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordHashed(e.target.value)}
                label="Password"
                require={true}
            />
            {error && (
                <Typography variant="body2" color="error" sx={{ textAlign: "center" }}>
                    {error}
                </Typography>
            )}
            <ButtonComponent type="submit" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
            </ButtonComponent>
        </Box>
    )
}