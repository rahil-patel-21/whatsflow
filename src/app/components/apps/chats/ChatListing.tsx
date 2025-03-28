// Imports
import React, { useEffect } from "react";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "@/store/hooks";
import Scrollbar from "../../custom-scroll/Scrollbar";
import { fetchChats, SearchChat } from "@/store/apps/chat/ChatSlice";
import { formatDistanceToNowStrict } from "date-fns";
import { IconChevronDown, IconSearch } from "@tabler/icons-react";
import { setActiveRecentChat } from "@/store/apps/chat/ChatReducer";
import Chip from "@mui/material/Chip";

const ChatListing = () => {
  const dispatch = useDispatch();
  const chatState = useSelector((state) => state.reducerChat);

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Box py={1}></Box>
      <Box px={2}>
        <TextField
          id="outlined-search"
          placeholder="Search for anything..."
          size="small"
          type="search"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconSearch size={"16"} />
              </InputAdornment>
            ),
          }}
          fullWidth
          onChange={(e) => dispatch(SearchChat(e.target.value))}
        />
      </Box>

      {/* Contact List */}
      <List sx={{ px: 0 }}>
        {/* Recent chat */}
        <Box px={1}>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            color="inherit"
          >
            Recent Chats ({chatState.recentChats.length})
            <IconChevronDown size="16" />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Unread</MenuItem>
            <MenuItem onClick={handleClose}>Archives</MenuItem>
            <MenuItem onClick={handleClose}>Promotional</MenuItem>
          </Menu>
        </Box>
        <Scrollbar
          sx={{
            height: { lg: "calc(100vh - 50px)", md: "100vh" },
            maxHeight: "630px",
          }}
        >
          {chatState.recentChats && chatState.recentChats.length ? (
            chatState.recentChats.map((chat, index) => (
              <ListItemButton
                key={chat.name + index}
                onClick={() =>
                  dispatch(setActiveRecentChat({ chat, isForcefully: true }))
                }
                sx={{
                  mb: 0.5,
                  py: 1.5,
                  px: 2,
                  alignItems: "start",
                }}
                selected={chat.source == chatState.activeRecentChat?.source}
              >
                <ListItemAvatar>
                  <Badge
                    color={
                      // chat.status === "online"
                      //   ? "success"
                      //   : chat.status === "busy"
                      //   ? "error"
                      //   : chat.status === "away"
                      //   ? "warning"
                      //   :
                      "secondary"
                    }
                    variant="dot"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    overlap="circular"
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={chat.profilePic ?? "/images/profile/user-10.jpg"}
                      sx={{ width: 42, height: 42 }}
                    />
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" fontWeight={600} mb={0.5}>
                      {chat.name}
                    </Typography>
                  }
                  secondary={chat.content}
                  secondaryTypographyProps={{
                    noWrap: true,
                  }}
                  sx={{ my: 0 }}
                />
                <Box
                  sx={{
                    flexShrink: "0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center", // horizontal centering
                    justifyContent: "end", // vertical centering
                    mt: 0.5,
                  }}
                  mt={0.5}
                >
                  <Typography variant="body2">
                    {formatDistanceToNowStrict(new Date(chat.timestamp), {
                      addSuffix: false,
                    })}
                  </Typography>
                  {chatState.activeRecentChat?.source != chat.source && chat.unReadCounts > 0 && (
                    <Chip
                      label={
                        chat.unReadCounts < 10 ? chat.unReadCounts : "9+"
                      }
                      sx={{
                        height: '20px',      // Reduce height
                        fontSize: '0.7rem',   // Reduce font size
                        padding: '0 4px',     // Reduce horizontal padding
                        '& .MuiChip-label': { // Target the label specifically
                          padding: '0 2px',   // Further reduce label padding
                        },
                      }}
                      color="primary"
                      size="small"
                    />
                  )}
                </Box>
              </ListItemButton>
            ))
          ) : (
            <Box m={2}>
              <Alert severity="error" variant="filled" sx={{ color: "white" }}>
                No Contacts Found!
              </Alert>
            </Box>
          )}
        </Scrollbar>
      </List>
    </div>
  );
};

export default ChatListing;
