// import React from 'react';
// import {
//   Container,
//   Paper,
//   BottomNavigation,
//   BottomNavigationAction,
//   AppBar,
//   IconButton,
//   Typography,
//   Toolbar,
//   Box,
// } from '@material-ui/core';
// // import SearchIcon from '@mui/icons-material/Search';
// // import AddCircleIcon from '@mui/icons-material/AddCircle';
// // import HomeIcon from '@mui/icons-material/Home';
// // import LoginIcon from '@mui/icons-material/Login';
// // import { styled } from '@mmui/material/styles';
// // import RestoreIcon from '@material-ui/icons/RestoreIcon';
// // import FavoriteIcon from '@material-ui/icons/FavoriteIcon';
// // import ArchiveIcon from '@material-ui/icons/ArchiveIcon';
// import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
// import PostDetails from '../components/PostDetails/PostDetails';
// import Home from '../components/Home/Home';
// import Navbar from '../components/Navbar/Navbar';
// import Auth from './components/Auth/Auth';
// // const StyledFab = styled(Fab)({
// //   position: 'absolute',
// //   zIndex: 1,
// //   top: -30,
// //   left: 0,
// //   right: 0,
// //   margin: '0 auto',
// // });
// import useStyles from '../styles';
// const App = () => {
//   const user = JSON.parse(localStorage.getItem('profile'));
//   const classes = useStyles();
//   return (
//     <BrowserRouter>
//       <Container maxWidth='xl' className={classes.container}>
//         <Navbar />
//         <Switch>
//           <Route path='/' exact component={() => <Redirect to='/posts' />} />
//           <Route path='/posts' exact component={Home} />
//           <Route path='/posts/search' exact component={Home} />
//           <Route path='/posts/:id' component={PostDetails} />
//           <Route
//             path='/auth'
//             exact
//             component={() => (!user ? <Auth /> : <Redirect to='/posts' />)}
//           />
//         </Switch>
//       </Container>
//       {/*  <AppBar position='fixed' color='primary' sx={{ top: 'auto', bottom: 0 }}>
//         <Toolbar></Toolbar>
//   </AppBar>*/}
//       <BottomNav className={classes.bottomNav}>
//         <Toolbar variant='dense'> </Toolbar>
//       </BottomNav>
//     </BrowserRouter>
//   );
// };

// export default App;
import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
// import Profile from './components/Profile/Profile';
import createHistory from 'history/createBrowserHistory';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = createHistory();
  return (
    <BrowserRouter history={history}>
      <Container maxWidth='xl'>
        <Navbar />
        <Switch>
          <Route path='/' exact component={() => <Redirect to='/posts' />} />
          <Route path='/posts' exact component={Home} />

          <Route path='/posts/search' exact component={Home} />
          <Route path='/posts/:id' exact component={PostDetails} />
           <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
           <Route
             path='/auth'
             exact
             // component={() => (!user ? <Auth /> : <Redirect to='/posts' />)}
             component={Auth}
           />

          {/*<Route path={`/profile/${user.results._id}`}>
            <Profile />
          </Route>*/}
        </Switch>
      </Container>
    </BrowserRouter>
  );
};
export default App;
