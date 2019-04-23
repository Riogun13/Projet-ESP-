package com.testbeauceapp.module;

import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.widget.Toast;
import com.testbeauceapp.service.LocationService;
import android.content.Context;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;
import java.util.HashMap;

public class LocationServiceModule extends ReactContextBaseJavaModule {

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
            Intent myIntent = new Intent(getReactApplicationContext(), LocationService.class);
            getReactApplicationContext().startService(myIntent);
            HeadlessJsTaskService.acquireWakeLockNow(getReactApplicationContext());
        }
    };

    private LocationManager locationManager = (LocationManager) getReactApplicationContext().getSystemService(Context.LOCATION_SERVICE);

    public LocationServiceModule(ReactApplicationContext reactContext){
        super(reactContext);
    }

    @Override
    public String getName() {
        return "LocationService";
    }

    @ReactMethod
    public void start() {
        if (checkLocationPermission()){
            locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 10000, 5, listener);
        }
    }

    @ReactMethod
    public void stop() {
        locationManager.removeUpdates(listener);
    }

    private boolean checkLocationPermission()
    {
        String permission = "android.permission.ACCESS_FINE_LOCATION";
        int res = getReactApplicationContext().checkCallingOrSelfPermission(permission);
        return (res == PackageManager.PERMISSION_GRANTED);
    }
}
