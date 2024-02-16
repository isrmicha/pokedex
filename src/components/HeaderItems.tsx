'use client'

import { Avatar, Chip } from "@mui/material";
import { Favorite } from "./Favorite";
import { UserHeader } from "./UserHeader";
import { useSession } from "next-auth/react";

export const HeaderItems = async () => {
    const {data: session, update} = useSession()
    return (
        <>
            {session && (
                <>
                    <Avatar
                        src={`${session?.user.image}`}
                        sx={{ marginLeft: 2 }}
                        alt={`${session?.user.image}`}
                    />
                    <Chip
                        style={{ color: "white" }}
                        label={session?.user?.name}
                        sx={{
                            marginLeft: 2,
                            display: { xs: "none", md: "flex" },
                        }}
                    />
                    <Favorite session={session} update={update} ></Favorite>
                </>
            )}
            <UserHeader session={session} />
        </>

    )
}