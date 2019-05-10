//
//  Geolocalisation.swift
//  TestBeauceApp
//
//  Created by etudiant on 19-05-02.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import CoreLocation

@objc(Geolocalisation)
class Geolocalisation: RCTEventEmitter, CLLocationManagerDelegate {

  var locationManager = CLLocationManager()

  override init() {
    super.init()
  }

  func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
    if status == .authorizedAlways {
      sendEvent(withName: "onGeolocalisationDidChangeAuthorization", body: ["didChangeAuthorization": true])
    }else{
      sendEvent(withName: "onGeolocalisationDidChangeAuthorization", body: ["didChangeAuthorization": false])
    }
  }

  func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
    if let location = locations.last {
      let coordinate = ["latitude": location.coordinate.latitude, "longitude": location.coordinate.longitude]
      sendEvent(withName: "onGeolocalisationDidUpdateLocations", body: ["didUpdateLocations": coordinate])
    }
  }

  @objc
  func start() {
    locationManager.requestAlwaysAuthorization()
    locationManager.delegate = self
    locationManager.distanceFilter = 25
    locationManager.allowsBackgroundLocationUpdates = true 
    locationManager.startUpdatingLocation()
  }

  override func supportedEvents() -> [String]! {
    return ["onGeolocalisationDidChangeAuthorization", "onGeolocalisationDidUpdateLocations"]
  }

  @objc
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }

}