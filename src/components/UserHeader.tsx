'use client'

import { Button, IconButton } from "@mui/material";
import { signOut, signIn } from "next-auth/react";
import LogoutIcon from "@mui/icons-material/Logout";
import GoogleIcon from "@mui/icons-material/Google";

export const UserHeader = ({ session }) => {
    return <>
        <Button
            variant="contained"
            aria-label={session ? "Logout" : "Login"}
            sx={{ marginLeft: 2, display: { xs: "none", md: "flex" } }}
            onClick={() => (session ? signOut() : signIn("google"))}
        >
            {session ? "Logout" : "Login"}
        </Button>
        <IconButton
            aria-label="favorites"
            onClick={() => (session ? signOut() : signIn("google"))}
            sx={{ display: { xs: "flex", md: "none" }, ml: 1 }}
        >
            {session ? <LogoutIcon /> : <GoogleIcon />}
        </IconButton>
    </>
}
