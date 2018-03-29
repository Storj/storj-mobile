//
//  DictionaryUtils.h
//  StorjMobile
//
//  Created by Barterio on 3/21/18.
//  Copyright © 2018 Storj. All rights reserved.
//

#import "Response.h"

@interface DictionaryUtils : Response

+(NSString *) checkAndReturnNSString:(NSString *)checkedString;

+(NSString *) convertToJsonWithDictionary:(NSDictionary *)dictionary;

+(NSString *) convertToJsonWithArray:(NSArray *)array;

@end
