//
//  CustomWebView.m
//  Trevor
//
//  Created by Emmanouil Konstantinidis on 10/02/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <RCTWebView.h>
#import <RCTWebViewManager.h>
#import "RCTBridge.h"

//#import "RCTWebViewManager.h"
//#import "RCTUIManager.h"
//#import "RCTWebView.h"
#import "UIView+React.h"


@interface CustomWebView: RCTWebView
@end

@implementation CustomWebView

RCT_EXPORT_METHOD(scrollBottom:(nonnull NSNumber *)reactTag)
{
  RCTLogError(@"SCROLLING SCROLLING SCROLLING...");
}

@end
