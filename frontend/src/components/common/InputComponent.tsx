import { TextField } from "@mui/material";

interface InputComponentInterface {
    type: "email" | "text" | "password";
    value?: string;
    change: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    require: boolean
}

export default function InputComponent({ ...props }: InputComponentInterface) {
    return (
        <TextField
            variant="outlined"
            type={props.type}
            value={props.value}
            onChange={props.change}
            label={props.label}
            required={props.require}
        />
    )
}