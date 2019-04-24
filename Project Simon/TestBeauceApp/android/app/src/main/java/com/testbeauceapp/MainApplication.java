package com.testbeauceapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.showlocationservicesdialogbox.LocationServicesDialogBoxPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import android.location.LocationManager;
import android.location.LocationListener;
import android.location.Location;
import com.locationlistener.service.LocationService;
import android.content.Context;
import android.os.Bundle;
import android.content.Intent;
import com.facebook.react.HeadlessJsTaskService;

import com.airbnb.android.react.maps.MapsPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new LocationServicesDialogBoxPackage(),
          new RNFirebasePackage(),
          new RNFirebaseFirestorePackage(),
          new RNFirebaseMessagingPackage(),
          new RNFirebaseNotificationsPackage(),
          new MapsPackage(),
            new RNGestureHandlerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

private final LocationListener listener = new LocationListener() {
@Override
  public void onStatusChanged(String provider, int status, Bundle extras) {
  }
  
@Override
  public void onProviderEnabled(String provider) {
  }
@Override
  public void onProviderDisabled(String provider) {
  }
@Override
    public void onLocationChanged(Location location) {
     Intent myIntent = new Intent(getApplicationContext(), LocationService.class);
     getApplicationContext().startService(myIntent);
  HeadlessJsTaskService.acquireWakeLockNow(getApplicationContext());
     }
 };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    //LocationManager locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);     
    // Start requesting for location
    //locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 2000, 1, listener);
    SoLoader.init(this, /* native exopackage */ false);
  }
}
