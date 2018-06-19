//
//  STError.h
//  StorjMobile
//
//  Created by Bogdan Artemenko on 3/19/18.
//  Copyright © 2018 Storj. All rights reserved.
//

@import Foundation;
#import "IConvertibleToJS.h"

#define KEY_ERROR_CODE "errorCode"
#define KEY_ERROR_MESSAGE "errorMessage"

#define DEFAULT_ERROR_MESSAGE "Unknown error"

@interface STError : NSObject<IConvertibleToJS>

@property (nonatomic, strong) NSString * _errorMessage;
@property int _errorCode;

-(instancetype) initWithErrorCode:(int) code
                  andErrorMessage:(NSString *)message;


@end
