//
//  STFilePickerLib.h
//  StorjMobile
//
//  Created by Bogdan Artemenko on 2/27/18.
//  Copyright © 2018 Storj. All rights reserved.
//

@import Foundation;

#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>
#import <UIKit/UIKit.h>

@interface STFilePickerLib : NSObject<RCTBridgeModule, UINavigationControllerDelegate,
                                    UIActionSheetDelegate, UIImagePickerControllerDelegate>

@end
