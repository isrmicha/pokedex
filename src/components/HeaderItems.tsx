import { Avatar, Chip } from "@mui/material";
import { getServerAuthSession } from "~/server/auth";
import { Favorite } from "./Favorite";
import { UserHeader } from "./UserHeader";



export const HeaderItems = async () => {
    const session = await getServerAuthSession();
    return (
        <>
            {session && (
                <>

                    <Avatar
                        src={`${session.user.image}`}
                        sx={{ marginLeft: 2 }}
                        alt={`${session.user.image}`}
                    />
                    <Chip
                        style={{ color: "white" }}
                        label={session.user?.name}
                        sx={{
                            marginLeft: 2,
                            display: { xs: "none", md: "flex" },
                        }}
                    />
                    <Favorite session={session} ></Favorite>
                </>
            )}
            <UserHeader session={session} />
        </>

    )
}