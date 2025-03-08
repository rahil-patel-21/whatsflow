'use client'

// Imports
import { Stack } from "@mui/system";
import { Avatar, Box } from "@mui/material";
import { signInType } from "@/app/(DashboardLayout)/types/auth/auth";
import CustomSocialButton from "@/app/components/forms/theme-elements/CustomSocialButton";

const AuthSocialButtons = ({ title }: signInType) => (
  <>
    <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
      <CustomSocialButton>
        <Avatar
          src={"/images/svgs/google-icon.svg"}
          alt={"icon1"}
          sx={{
            width: 16,
            height: 16,
            borderRadius: 0,
            mr: 1,
          }}
        />
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            whiteSpace: "nowrap",
            mr: { sm: "3px" },
          }}
        >
          {title}{" "}
        </Box>{" "}
        Google
      </CustomSocialButton>
    </Stack>
  </>
);

export default AuthSocialButtons;
