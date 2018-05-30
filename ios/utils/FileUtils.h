//
//  FileUtils.h
//  StorjMobile
//
//  Created by Barterio on 3/28/18.
//  Copyright © 2018 Storj. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface FileUtils : NSObject

+(NSNumber *) getFileSizeWithPath: (NSString *)filePath;

+(NSString *) getFileNameWithPath: (NSString *)filePath;

+(NSString *) getFileNameWithoutExtensionWithPath: (NSString *)filePath;

@end
