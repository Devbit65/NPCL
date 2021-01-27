//
//  NPCLPaymentBridge.m
//  NPCLProject
//
//  Created by devendra.c.kumar on 24/01/21.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>


@interface RCT_EXTERN_MODULE(CCAvenuePaymentDisplayVC, NSObject)

RCT_EXTERN_METHOD(openPaymentView:(NSString *)hostURL userData:(NSDictionary *)userData netAmount:(NSString *)netAmount cred:(NSDictionary *)cred)
@end
