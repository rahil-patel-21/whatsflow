// Imports
import React, { useEffect } from "react";
import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import List from '@mui/material/List'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useSelector, useDispatch } from "@/store/hooks";
import Scrollbar from "../../custom-scroll/Scrollbar";
import {
  fetchChats,
  SearchChat,
} from "@/store/apps/chat/ChatSlice";
import { ChatsType } from '../../../(DashboardLayout)/types/apps/chat';
import { last } from "lodash";
import { formatDistanceToNowStrict } from "date-fns";
import { IconChevronDown, IconSearch } from "@tabler/icons-react";
import { setActiveRecentChat } from "@/store/apps/chat/ChatReducer";

const ChatListing = () => {

  const dispatch = useDispatch();
  const chatState = useSelector((state) => state.reducerChat);

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  const filterChats = (chats: ChatsType[], cSearch: string) => {
    if (chats)
      return chats.filter((t) =>
        t.name.toLocaleLowerCase().includes(cSearch.toLocaleLowerCase())
      );

    return chats;
  };

  const chats = useSelector((state) =>
    filterChats(state.chatReducer.chats, state.chatReducer.chatSearch)
  );

  const getDetails = (conversation: ChatsType) => {
    let displayText = "";

    const lastMessage = conversation.messages[conversation.messages.length - 1];
    if (lastMessage) {
      const sender = lastMessage.senderId === conversation.id ? "You: " : "";
      const message =
        lastMessage.type === "image" ? "Sent a photo" : lastMessage.msg;
      displayText = `${sender}${message}`;
    }

    return displayText;
  };

  const lastActivity = (chat: ChatsType) => last(chat.messages)?.createdAt;

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
      {/* ------------------------------------------- */}
      {/* Search */}
      {/* ------------------------------------------- */}
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
            Recent Chats  ({chatState.recentChats.length})<IconChevronDown size="16" />
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
            <MenuItem onClick={handleClose}>Sort By Time</MenuItem>
            <MenuItem onClick={handleClose}>Sort By Unread</MenuItem>
            <MenuItem onClick={handleClose}>Mark as all Read</MenuItem>
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
                onClick={() => dispatch(setActiveRecentChat({chat, isForcefully: true}))}
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
                <Box sx={{ flexShrink: "0" }} mt={0.5}>
                  <Typography variant="body2">
                    {formatDistanceToNowStrict(new Date(chat.timestamp), {
                      addSuffix: false,
                    })}
                  </Typography>
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
