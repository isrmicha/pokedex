import { signal } from "@preact/signals-react";

export const theme = signal("dark")
export const toggleTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light"
}


