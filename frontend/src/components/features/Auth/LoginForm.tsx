import { useState, type FormEvent } from "react"
import ButtonComponent from "../../common/ButtonComponent";
import InputComponent from "../../common/InputComponent";
import { Box, Typography } from "@mui/material";

export default function LoginForm() {
    const [email, setEmail] = useState<string>();
    const [passwordHashed, setPasswordHashed] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);

    console.log(email, passwordHashed);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8000/api/users/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, passwordHashed }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Sign in successful:', data);
            } else {
                console.error('Sign in failed:', data.message);
            }
        } catch (error) {
            console.error('Network error:', error);
        } finally {
            setLoading(false);
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
            <ButtonComponent type="submit" disabled={loading}>
                {loading ? 'Signing In...' : 'Sign In'}
            </ButtonComponent>
        </Box>
    )
}