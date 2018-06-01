//
//  SyncQueueEntryModel.h
//  StorjMobile
//
//  Created by Developer Mac on 31.05.2018.
//  Copyright © 2018 Storj. All rights reserved.
//

@import Foundation;
#import "IConvertibleToJS.h"

@class SyncQueueEntryDbo;

#ifndef SyncQueueEntryModel_h
#define SyncQueueEntryModel_h

@interface SyncQueueEntryModel: NSObject<IConvertibleToJS>

@property (readonly, assign) int _id;
@property (readonly, assign) NSString *fileName;
@property (readonly, assign) NSString *localPath;
@property (readonly, assign) int status;
@property (readonly, assign) int errorCode;
@property (readonly, assign) long size;
@property (readonly, assign) int count;
@property (readonly, assign) NSString *creationDate;
@property (readonly, assign) NSString *bucketId;
@property (readonly, assign) long fileHandle;

-(instancetype) init;

-(instancetype) initWithId: (int) _id
                  fileName: (NSString *) fileName
                 localPath: (NSString *) localPath
                    status: (int) status
                 errorCode: (int) errorCode
                      size: (long) size
                     count: (int) count
              creationDate: (NSString *) creationDate
                  bucketId: (NSString *) bucketId
                fileHandle: (long) fileHandle;

-(BOOL) isValid;

-(instancetype) initWithDbo: (SyncQueueEntryDbo *) dbo;

@end
#endif /* SyncQueueEntryModel_h */
