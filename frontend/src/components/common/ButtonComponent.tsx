import { Button } from "@mui/material";

interface ButtonComponentInterface {
    children: React.ReactNode;
    disabled?: boolean;
    type?: 'submit' | 'button' | 'reset';
}

export default function ButtonComponent({ children, disabled, type }: ButtonComponentInterface) {
    return (
        <Button variant="contained" type={type} disabled={disabled}>
            {children}
        </Button>
    )
}