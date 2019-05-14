// NavigationService.js

import { NavigationActions, NavigationEvents } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params, routeNameToNavigate) {
    console.log(params,"actions");
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
      action: NavigationActions.navigate({routeName: routeNameToNavigate, params:params})
    })
  );
}


// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
};