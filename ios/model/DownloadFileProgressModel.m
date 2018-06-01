//
//  DownloadFileProgressModel.m
//  StorjMobile
//
//  Created by Barterio on 3/21/18.
//  Copyright © 2018 Storj. All rights reserved.
//

#import "DownloadFileProgressModel.h"
#import "DictionaryUtils.h"

@implementation DownloadFileProgressModel
@synthesize _bucketId;
@synthesize _fileId;
@synthesize _filePath;
@synthesize _progress;
@synthesize _uploadedBytes;
@synthesize _totalBytes;
@synthesize _filePointer;

-(instancetype) initWithBucketId:(NSString *)bucketId
                          fileId:(NSString *)fileId
                        filePath:(NSString *)filePath
                        progress:(double)progress
                   uploadedBytes:(long)uploadedBytes
                      totalBytes:(long)totalBytes
                     filePointer:(long)filePointer
{
  if(self = [super init]){
    _bucketId = bucketId;
    _fileId = fileId;
    _filePath = filePath;
    _progress = progress;
    _uploadedBytes = uploadedBytes;
    _totalBytes = totalBytes;
    _filePointer = filePointer;
  }
  return self;
}

-(NSDictionary *) toDictionary
{
  NSMutableDictionary *object = [[NSMutableDictionary alloc] init];
  [object setObject:[DictionaryUtils checkAndReturnNSString:_bucketId]
             forKey:@DOWNLOAD_FILE_PROGRESS_MODEL_BUCKET_ID];
  [object setObject:[DictionaryUtils checkAndReturnNSString:_fileId]
             forKey:@DOWNLOAD_FILE_PROGRESS_MODEL_FILE_ID];
  [object setObject:[DictionaryUtils checkAndReturnNSString:_filePath]
             forKey:@DOWNLOAD_FILE_PROGRESS_MODEL_FILE_PATH];
  [object setObject:@(_progress)
             forKey:@DOWNLOAD_FILE_PROGRESS_MODEL_PROGRESS];
  [object setObject:@(_uploadedBytes)
             forKey:@DOWNLOAD_FILE_PROGRESS_MODEL_UPLOADED_BYTES];
  [object setObject:@(_totalBytes)
             forKey:@DOWNLOAD_FILE_PROGRESS_MODEL_TOTAL_BYTES];
  [object setObject:@(_filePointer)
             forKey:@DOWNLOAD_FILE_PROGRESS_MODEL_FILE_POINTER];
  
  return object;
}

@end
