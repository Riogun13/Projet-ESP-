//
//  Geolocalisation.m
//  TestBeauceApp
//
//  Created by etudiant on 19-05-02.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(Geolocalisation, RCTEventEmitter)
  RCT_EXTERN_METHOD(turnOn)
  RCT_EXTERN_METHOD(turnOff)
  RCT_EXTERN_METHOD(toggle)
  RCT_EXTERN_METHOD(getStatus: (RCTResponseSenderBlock)callback)
@end