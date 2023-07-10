import BorderColorIcon from '@mui/icons-material/BorderColor';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SegmentIcon from '@mui/icons-material/Segment';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  StackProps,
  Theme,
  Typography,
  styled,
  useMediaQuery,
} from '@mui/material';
import { useLayoutEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { useAuth } from '@resnity/web-auth';

import { useModal } from '../hooks/useModal';
import { theme } from '../theme';

const drawerWidth = 240;

type AppBarProps = StackProps & {
  isDrawerOpen: boolean;
};

export const DashboardLayout = () => {
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const { isOpen, toggle } = useModal(!isSmall);

  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } =
    useAuth();

  useLayoutEffect(() => {
    if (!isLoading && !isAuthenticated) loginWithRedirect();
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        isDrawerOpen={isOpen}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          px: 3,
          position: 'fixed',
          height: theme.mixins.toolbar,
          background: theme.palette.background.default,
          zIndex: theme.zIndex.appBar,
          borderBottom: `1px ${theme.palette.divider}`,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={toggle}
          >
            <SegmentIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            RESNITY
          </Typography>
        </Stack>
        <Avatar alt={user?.name} src={user?.picture} />
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        open={isOpen}
      >
        <DrawerHeader />
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/stores">
              <ListItemIcon>
                <RestaurantIcon />
              </ListItemIcon>
              <ListItemText primary="Stores" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/menus">
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="Menus" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/orders">
              <ListItemIcon>
                <BorderColorIcon />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => logout()}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main isDrawerOpen={isOpen}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
};

const AppBar = styled(Stack, {
  shouldForwardProp: (prop) => prop !== 'isDrawerOpen',
})<AppBarProps>(({ theme, isDrawerOpen }) => ({
  width: '100%',
  px: 3,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(isDrawerOpen && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'isDrawerOpen',
})<{
  isDrawerOpen?: boolean;
}>(({ theme, isDrawerOpen }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(isDrawerOpen && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));
