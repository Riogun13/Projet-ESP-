//
//  Geolocalisation.swift
//  TestBeauceApp
//
//  Created by etudiant on 19-05-02.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation

@objc(Geolocalisation)
class Geolocalisation: NSObject {

  @objc
  static var isOn = false

  @objc
  func turnOn() {
    Geolocalisation.isOn = true
    print("Geolocalisation is now ON")
  }

  @objc
  func turnOff() {
    Geolocalisation.isOn = false
    print("Geolocalisation is now OFF")
  }

  @objc
  func getStatus(_ callback: RCTResponseSenderBlock) {
    callback([NSNull(), Geolocalisation.isOn])
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }

}