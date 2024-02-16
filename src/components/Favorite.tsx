'use client'
import { Badge, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteDrawer from "./favorite-drawer";
import { useState } from "react";

export function Favorite({ session }) {
    const [isFavoriteOpen, setIsFavoriteOpen] = useState(false)
    const favoritesCount = session?.user?.favorites?.length
    return (
        <>
            <Badge
                badgeContent={favoritesCount}
                color="primary"
                sx={{ marginLeft: 2 }}
                aria-label="favorites"
            >
                <IconButton
                    aria-label="favorites"
                    onClick={() => setIsFavoriteOpen(!isFavoriteOpen)}
                >
                    <FavoriteIcon
                        style={{ color: "red" }}
                        aria-label="favorites"
                    />
                </IconButton>
            </Badge>
            {isFavoriteOpen && (
                <FavoriteDrawer session={session} setIsFavoriteOpen={setIsFavoriteOpen} isFavoriteOpen={isFavoriteOpen} />
            )}
        </>
    );
}
