'use client'
import { Badge, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";

export function Favorite({ isFavoriteOpen, favorites }: { isFavoriteOpen: boolean, favorites: number[] }) {
    return (<Badge badgeContent={favorites?.length} color="primary" sx={{
        marginLeft: 2
    }} aria-label="favorites">
        <Link
            href={{
                query: {
                    isFavoriteOpen: !isFavoriteOpen
                },
            }}
        >
            <IconButton aria-label="favorites">
                <FavoriteIcon style={{
                    color: "red"
                }} aria-label="favorites" />
            </IconButton>
        </Link>
    </Badge >);
}
