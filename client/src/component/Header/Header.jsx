import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import BlurCircularOutlinedIcon from '@mui/icons-material/BlurCircularOutlined';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logOffUser } from '../../store/userSlice';
import { useCookies } from 'react-cookie';
import SearchIcon from '@mui/icons-material/Search';
import SearchList from '../Home/searchlist/SearchList';
import { useState } from 'react';

const pages = [
  {
    name: 'Electronic',
    path: '/electronic',
  },
  {
    name: `Men's Fashion`,
    path: '/mensClothing',
  },
  {
    name: `Women's Fashion`,
    path: '/womensClothing',
  },
  {
    name: `Jewellery`,
    path: '/jwellery',
  },
];
const settings = ['Your Account', 'Logout'];

//header component
const Header = () => {
  const [input, setInput] = useState('');
  const inputhandler = (e) => {
    if (e.target) {
      var query = e.target.value.toLowerCase();
    } else {
      var query = e;
    }
    setInput(query);
  };

  //variables
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [cookies, setCookie] = useCookies(['user']);
  const isLogged = useSelector((state) => state.userInfo.isLogged);
  const userName = useSelector((state) => state.userInfo.userList?.name);
  const cartCount = useSelector(
    (state) => state.userInfo.userList?.cart?.length
  );
  const url = useSelector((state) => state.userInfo.userList?.profileImage);

  //event handlers
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });

  React.useEffect(() => {}, [cartCount]);

  //rendering the header component
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <BlurCircularOutlinedIcon
              sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
            />
            <Typography
              onClick={() => navigate('/')}
              variant="h6"
              noWrap
              component="h5"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              Amazon
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page, i) => (
                  <MenuItem key={i} onClick={handleCloseNavMenu}>
                    <p style={{ textAlign: 'center' }}>
                      <Link
                        style={{ textDecoration: 'none', color: 'white' }}
                        to={page.path}
                      >
                        {page.name}
                      </Link>
                    </p>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <BlurCircularOutlinedIcon
              sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
            />
            <Typography
              onClick={() => navigate('/')}
              variant="h5"
              noWrap
              component="h5"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              Amazon
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page, i) => (
                <Button
                  key={i}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  <Link
                    style={{ textDecoration: 'none', color: 'white' }}
                    to={page.path}
                  >
                    {page.name}
                  </Link>
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {isLogged ? (
                <div>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt={userName} src={url} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    style={{
                      marginRight: '0.1em',
                    }}
                    title={'Cart'}
                  >
                    <IconButton onClick={() => navigate('/cart')}>
                      <Badge badgeContent={cartCount} color="info">
                        <ShoppingCartIcon />
                      </Badge>
                    </IconButton>
                  </Tooltip>

                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting}
                        onClick={handleCloseUserMenu}
                        style={{ paddingBottom: '0em', marginBottom: '0em' }}
                      >
                        {setting === 'Your Account' ? (
                          <p
                            onClick={() => navigate('/profile')}
                            style={{ textAlign: 'center' }}
                          >
                            {setting}
                          </p>
                        ) : (
                          <p
                            onClick={() => {
                              dispatch(logOffUser());
                              setCookie('key', null);
                              navigate('/');
                            }}
                            style={{ textAlign: 'center' }}
                          >
                            {setting}
                          </p>
                        )}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              ) : (
                <Button
                  onClick={() => navigate('/signin')}
                  style={{
                    backgroundColor: 'goldenrod',
                    color: 'black',
                  }}
                  variant="contained"
                >
                  Sign In
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
        <div className="main">
          <div className="container">
            <input
              value={input}
              className="search"
              type="text"
              onChange={inputhandler}
              placeholder=" Search on amazon"
            />
            <SearchIcon style={{ color: 'white' }} className="search__icon" />
            <Box className="search__list">
              <SearchList
                input={input}
                inputhandler={inputhandler}
                setInput={setInput}
              />
            </Box>
          </div>
        </div>
      </AppBar>
    </ThemeProvider>
  );
};
export default Header;
