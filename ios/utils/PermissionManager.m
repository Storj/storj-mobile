//
//  PermissionManager.m
//  StorjMobile
//
//  Created by Barterio on 6/8/18.
//  Copyright © 2018 Storj. All rights reserved.
//

#import "PermissionManager.h"
@import MediaPlayer;
@import AVFoundation;
@import Photos;

#define PERMISSION_ID_CAMERA 1001
#define PERMISSION_ID_PHOTOS 1002

@implementation PermissionManager
{
  NSMutableArray *permissions;
  STPermissionCompletion permissionCompletionHandle;
}

-(instancetype) init
{
  if(self = [super init])
  {
    permissions = [NSMutableArray arrayWithCapacity: 2];
    if(![self isCameraPermissionGranted])
    {
      [permissions addObject:@(PERMISSION_ID_CAMERA)];
    }
    if(![self isPhotoLibraryPermissionGranted])
    {
      [permissions addObject:@(PERMISSION_ID_PHOTOS)];
    }
  }
  return self;
}

-(BOOL) isAllPermissionsGranted
{
  return [self isCameraPermissionGranted] && [self isPhotoLibraryPermissionGranted];
}

-(void) requestAllPermissionsWithCompletion: (STPermissionCompletion) completionHandle
{
  permissionCompletionHandle = completionHandle;
  [self checkPermissionsListAndProcess];
}

-(void) checkPermissionsListAndProcess
{
  if([self hasUnresolvedPermissions])
  {
    [self processPermissionRequest: [[permissions lastObject] intValue]];
  } else {
    permissionCompletionHandle();
  }
}

-(void) processPermissionRequest: (int) permissionId
{
  switch (permissionId) {
    case PERMISSION_ID_CAMERA:
      [self requestCameraPermission];
      break;
    case PERMISSION_ID_PHOTOS:
      [self requestPhotoLibraryPermission];
      break;
    default:
      //nothing to do here
      break;
  }
}

-(BOOL) hasUnresolvedPermissions
{
  return permissions.count > 0;
}

-(BOOL) isCameraPermissionGranted
{
  AVAuthorizationStatus authStatus = [AVCaptureDevice authorizationStatusForMediaType:
                                      AVMediaTypeVideo];
  
  return authStatus == AVAuthorizationStatusAuthorized;
}

-(void) requestCameraPermission
{
  if([self isCameraPermissionGranted])
  {
    [permissions removeLastObject];
    [self checkPermissionsListAndProcess];
    return;
  }
  
  AVAuthorizationStatus authStatus = [AVCaptureDevice authorizationStatusForMediaType:AVMediaTypeVideo];
  
  if(authStatus == AVAuthorizationStatusNotDetermined)
  {
    [AVCaptureDevice requestAccessForMediaType:AVMediaTypeVideo completionHandler:^(BOOL granted)
    {
      [permissions removeLastObject];
      [self checkPermissionsListAndProcess];
    }];
  }
}

-(BOOL) isPhotoLibraryPermissionGranted
{
  PHAuthorizationStatus authStatus = [PHPhotoLibrary authorizationStatus];
  
  return authStatus == PHAuthorizationStatusAuthorized;
}

-(void) requestPhotoLibraryPermission
{
  if([self isPhotoLibraryPermissionGranted])
  {
    [permissions removeLastObject];
    [self checkPermissionsListAndProcess];
    return;
  }
  
  [PHPhotoLibrary requestAuthorization:^(PHAuthorizationStatus status)
  {
    [permissions removeLastObject];
    [self checkPermissionsListAndProcess];
  }];
}

@end
