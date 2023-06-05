import { signal } from "@preact/signals-react";

export const theme = signal("light")
export const toggleTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light"
}


