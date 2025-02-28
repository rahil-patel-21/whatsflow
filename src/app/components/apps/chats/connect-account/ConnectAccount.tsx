// Imports
import React from "react";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import BlankCard from "../../../shared/BlankCard";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CustomSwitch from "../../../forms/theme-elements/CustomSwitch";
import { IconCheckbox, IconCode, IconQrcode } from "@tabler/icons-react";
import CustomFormLabel from "../../../forms/theme-elements/CustomFormLabel";
import CustomTextField from "../../../forms/theme-elements/CustomTextField";
import QRCode from "./QrCode";
import { useDispatch, useSelector } from "@/store/hooks";
import {
  setAccConnected,
  setAccConnectNumber,
  setCanSendConnectionMsg,
  setIsConnectionReqSent,
} from "@/store/apps/chat/ChatReducer";
import { AppState } from "@/store/store";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const ConnectAccount = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const chatState = useSelector((state: AppState) => state.reducerChat);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} lg={9}>
          <BlankCard>
            <CardContent>
              <Typography variant="h4" mb={2}>
                Account not connected !
              </Typography>
              <Typography color="textSecondary">
                Oops ! Looks like you haven't connected your whatsApp account
                with us. Please follow below steps to connect right away.
              </Typography>

              <CustomFormLabel htmlFor="text-whatsapp-number">
                WhatsApp Number
              </CustomFormLabel>
              <CustomTextField
                size="small"
                id="text-whatsapp-number"
                variant="outlined"
                fullWidth
                placeholder="Enter your 10 digit number"
                maxLength={10}
                type="numeric"
                disabled={chatState.isConnectionReqSent}
                onChange={(event: any) =>
                  dispatch(setAccConnectNumber(event?.target?.value))
                }
              />

              <Stack direction="row" spacing={2} mt={4} mb={4}>
                <Avatar
                  variant="rounded"
                  sx={{
                    bgcolor: "grey.100",
                    color: "grey.500",
                    width: 48,
                    height: 48,
                  }}
                >
                  <IconCheckbox size="22" />
                </Avatar>
                <Box>
                  <Typography variant="h6" mb={1}>
                    Connection Confirmation
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Send me message on whatsApp once the account is connected
                    successfully !
                  </Typography>
                </Box>
                <Box sx={{ ml: "auto !important" }}>
                  <CustomSwitch
                    checked={chatState.canSendConnectionMsg}
                    disabled={chatState.isConnectionReqSent}
                    onChange={(event: any) =>
                      dispatch(setCanSendConnectionMsg(event.target.checked))
                    }
                  />
                </Box>
              </Stack>

              {!chatState.isConnectionReqSent && (
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ justifyContent: "center" }}
                >
                  <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    disabled={chatState.accConnectNumber.length != 10}
                    onClick={() => {
                      dispatch(setIsConnectionReqSent(true));
                    }}
                  >
                    Send connection request
                  </Button>
                </Stack>
              )}

              {chatState.isConnectionReqSent && (
                <Box sx={{ maxWidth: { xs: 320, sm: 480 } }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    scrollButtons="auto"
                    aria-label="basic tabs example"
                  >
                    <Tab
                      iconPosition="start"
                      icon={<IconQrcode size="22" />}
                      label="QR Code"
                      {...a11yProps(0)}
                    />

                    <Tab
                      iconPosition="start"
                      icon={<IconCode size="22" />}
                      label="Enter Code"
                      {...a11yProps(1)}
                    />
                  </Tabs>
                </Box>
              )}

              {chatState.isConnectionReqSent && (
                <TabPanel value={value} index={0}>
                  <Box display="flex" alignItems="center">
                    {/* Left Side - Instructions */}
                    <Box pr={3}>
                      {" "}
                      {/* Add padding to space out from the QR code */}
                      <Typography color="textSecondary" pb={1}>
                        1 - Open WhatsApp on mobile
                      </Typography>
                      <Typography color="textSecondary" pb={1}>
                        2 - Go to WhatsApp settings
                      </Typography>
                      <Typography color="textSecondary" pb={1}>
                        3 - Select Linked devices
                      </Typography>
                      <Typography color="textSecondary" pb={1}>
                        4 - Select Link with phone number
                      </Typography>
                      <Typography color="textSecondary">
                        5 - Scan this QR code from WhatsApp
                      </Typography>
                    </Box>

                    {/* Right Side - QR Code */}
                    <Box>
                      <QRCode data="https://github.com" width={200} />
                    </Box>
                  </Box>
                </TabPanel>
              )}
              {chatState.isConnectionReqSent && (
                <TabPanel value={value} index={1}>
                  <Box p={1}></Box>
                  <Typography color="textSecondary" pb={1}>
                    1 - Open whatsApp on mobile
                  </Typography>
                  <Typography color="textSecondary" pb={1}>
                    2 - Go to whatsApp settings
                  </Typography>
                  <Typography color="textSecondary" pb={1}>
                    3 - Select Linked devices
                  </Typography>
                  <Typography color="textSecondary" pb={1}>
                    4 - Select Link with phone number
                  </Typography>
                  <Typography color="textSecondary">
                    5 - Enter code in below textfield
                  </Typography>

                  <CustomFormLabel htmlFor="text-whatsapp-connect-code">
                    Your 8 Digit whatsApp code
                  </CustomFormLabel>
                  <CustomTextField
                    size="small"
                    id="text-whatsapp-connect-code"
                    variant="outlined"
                    fullWidth
                    placeholder="Enter your 8 digit code"
                    maxLength={8}
                    type="text"
                  />
                  <Box  display='flex' p={1} mt={1}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => dispatch(setIsConnectionReqSent(false))}
                  >
                    Cancel
                  </Button>
                  <Box px={1}></Box>
                  <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    disabled={chatState.accConnectNumber.length != 10}
                    onClick={() => {
                      dispatch(setAccConnected(true));
                    }}
                  >
                    Connect account
                  </Button>
                  </Box>
                  
                </TabPanel>
              )}
            </CardContent>
          </BlankCard>
        </Grid>
      </Grid>
    </>
  );
};

export default ConnectAccount;
