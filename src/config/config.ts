export const baseURL = 'https://mycitycoupons.in:2370/nodeapp';
// export const baseURL = 'http://192.168.0.148:2370/nodeapp';

export const endpoints = {
  REQUEST_LOGIN_OTP: 'user/login',
  USER_REGISTRATION: "user",
  USER_VERIFICATION: "user/verification",
  GET_USER_PROFILE: "user",
  GET_CATEGORIES_WITH_VENDORS:"categoryswithvendors",
  GET_COUPONS:"homecoupons",
  GET_TRENDING_COUPONS:"trendingcoupons",
  SEND_COUPON_USAGE:"couponsusage",
  REQUEST_VENDOR_LOGIN_OTP: "vendor/login",
  VENDOR_VERIFICATION: "vendor/verification",
  VENDOR_REGISTRATION: "vendor/register",
  GET_VENDOR_PROFILE: "vendor",
  DELETE_VENDOR_ACCOUNT: "vendors",
  GET_VENDOR_DASHBOARD: "vendor",
  VENDOR_COUPONS: "vendor",
  LIST_BNI_CATEGORIES: "bni/categories",
  BNI_CITIES: "bni/cities",
  BNI_STATES: "bni/states",
  BNI_DISTRICTS: "bni/districts",
  BNI_INDUSTRIES: "bni/industries",
  BNI_CONNECTIONS: "bni/connections",
  
};