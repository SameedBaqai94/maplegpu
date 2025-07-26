import { useRouteError } from "react-router-dom"

export default function ErrorPage() {
    const error = useRouteError();

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>
                    {error && typeof error === "object" && "statusText" in error
                        ? (error as any).statusText
                        : error && typeof error === "object" && "message" in error
                            ? (error as any).message
                            : "Unknown error"}
                </i>
            </p>
        </div>
    )
}