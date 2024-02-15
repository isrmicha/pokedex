'use client'
import { Badge, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useQueryParams } from "~/hooks/useQueryParams";

export function Favorite({ favoritesCount }: { isFavoriteOpen: boolean, favoritesCount: number }) {
    const { getParam, setParam } = useQueryParams()
    const isFavoriteOpen = getParam("isFavoriteOpen") === 'true'
    return (<Badge
        badgeContent={favoritesCount}
        color="primary"
        sx={{ marginLeft: 2 }}
        aria-label="favorites"
    >
        <IconButton
            aria-label="favorites"
            onClick={() => setParam('isFavoriteOpen', `${!isFavoriteOpen}`)}
        >
            <FavoriteIcon
                style={{ color: "red" }}
                aria-label="favorites"
            />
        </IconButton>
    </Badge>);
}
