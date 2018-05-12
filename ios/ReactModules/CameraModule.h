//
//  CameraModule.h
//  StorjMobile
//
//  Created by Barterio on 5/10/18.
//  Copyright © 2018 Storj. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTLog.h>
#import "SingleResponse.h"

@interface CameraModule : NSObject<RCTBridgeModule, UIImagePickerControllerDelegate,
                                  UINavigationControllerDelegate>

@property (nonatomic, strong) NSString *_bucketId;

@end
