//
//  STSettingsModel.h
//  StorjMobile
//
//  Created by Bogdan Artemenko on 5/31/18.
//  Copyright © 2018 Storj. All rights reserved.
//

@import Foundation;
#import "IConvertibleToJS.h"

@interface STSettingsModel : NSObject<IConvertibleToJS>

@property (nonatomic, strong) NSString *_id;
@property BOOL isFirstSignIn;
@property BOOL syncStatus;
@property int syncSettings;
@property (nonatomic, strong) NSString *lastSync;

-(instancetype) init;

-(instancetype) initWithSettingsId: (NSString *) settingsId;

-(instancetype) initWithSettingsId: (NSString *) settingsId
                       firstSignIn: (BOOL) isFirstSignIn
                        syncStatus: (BOOL) syncStatus
                      syncSettings: (int) syncSettings
                          lastSync: (NSString *) lastSync;

-(NSDictionary *) toUpdateDictionary;
@end
