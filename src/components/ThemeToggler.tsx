'use client'

import { IconButton } from "@mui/material"
import { useQueryParams } from "~/hooks/useQueryParams"
import Brightness4Icon from "@mui/icons-material/Brightness4";
import NightsStayIcon from "@mui/icons-material/NightsStay";



export const ThemeToggler = () => {
    const { getParam, setParam } = useQueryParams()
    const theme = getParam("theme")
    return <IconButton
        onClick={() => setParam('theme', theme === "dark" ? "light" : "dark")}
        sx={{ marginLeft: 2 }}
        aria-label="theme"
    >
        {theme === "dark" ? (
            <Brightness4Icon />
        ) : (
            <NightsStayIcon sx={{ color: "white" }} />
        )}
    </IconButton>
}