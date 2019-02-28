// Copyright 2016-present 650 Industries. All rights reserved.

#import <EXBlur/EXBlurView.h>
#import <EXBlur/EXBlurViewManager.h>

@implementation EXBlurViewManager

EX_EXPORT_MODULE(ExpoBlurViewManager);

- (UIView *)view
{
  return [[EXBlurView alloc] init];
}

- (NSString *)viewName
{
  return @"ExpoBlurView";
}

EX_VIEW_PROPERTY(tint, NSString *, EXBlurView)
{
  [view setTint:value];
}

EX_VIEW_PROPERTY(intensity, NSNumber *, EXBlurView)
{
  [view setIntensity:value];
}

@end
