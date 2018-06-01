//
//  SettingsDbo.m
//  StorjMobile
//
//  Created by Barterio on 5/31/18.
//  Copyright © 2018 Storj. All rights reserved.
//

#import "SettingsDbo.h"
#import "SettingsModel.h"
#import "SettingsContract.h"

#import "DictionaryUtils.h"

@implementation SettingsDbo

-(instancetype) initWithSettingsId: (NSString *) settingsId
                          lastSync: (NSString *) lastSync
{
  if(self = [super init])
  {
    __id = settingsId;
    _lastSync = lastSync;
  }
  return self;
}

-(SettingsModel *) toModel
{
  
  return [[SettingsModel alloc] initWithSettingsId:__id
                                       firstSignIn:_isFirstSignIn
                                        syncStatus:_syncStatus
                                      syncSettings:_syncSettings
                                          lastSync:_lastSync];
}

@end
