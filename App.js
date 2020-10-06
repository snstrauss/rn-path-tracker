import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import AccountScreen from './client/screens/AccountScreen';
import CreateTrackScreen from './client/screens/CreateTrackScreen';
import SigninScreen from './client/screens/SigninScreen';
import SignupScreen from './client/screens/SignupScreen';
import TrackDetailsScreen from './client/screens/TrackDetailsScreen';
import TrackListScreen from './client/screens/TrackListScreen';

/**
 *
 * navigation layout:
 *
 * we have a SWITCH that decides between a Login Flow, and the Main Flow (if the user is signed in)
 *   - the Login Flow itself is a standard stack navigator (user is not logged in)
 *   - the main flow is a Bottom Tab Navigator, showing 3 screens: (user is logged in)
 *        -- Create Track
 *        -- User Account
 *        -- Another Stack Navigator, showing the following 2 screens:
 *              --- Tracks List (default view of this tab)
 *              --- Track Details (after click on an item in the list)
 *
 *
 * All of the MainFlow screens are available only after successful login.
 * The TrackDetailsScreen is available only through clicking on an item in the TracksListScreen.
 *
 * the first screen to show is the one listed at the top of the main navigator.
 * similarly, the first screen of the MainFlow (bottom tab) to show,
 * is the first one listed at the top of the mainFlow, and the list is the default screen of the listFlow
 */

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    signup: SignupScreen,
    signin: SigninScreen
  }),
  mainFlow: createBottomTabNavigator({
    listFlow: createStackNavigator({
      list: TrackListScreen,
      details: TrackDetailsScreen
    }),
    create: CreateTrackScreen,
    account: AccountScreen
  })
});

export default createAppContainer(switchNavigator);