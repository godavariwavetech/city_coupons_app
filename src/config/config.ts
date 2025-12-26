export const baseURL = 'https://mycitycoupons.in:2370/nodeapp';
// export const baseURL = 'http://192.168.0.148:2370/nodeapp';

export const endpoints = {
  REQUEST_LOGIN_OTP: 'user/login',
  USER_REGISTRATION: "user",
  USER_VERIFICATION: "user/verification",
  GET_USER_PROFILE: "user", 
  GET_CATEGORIES_WITH_VENDORS:"categoryswithvendors",
  GET_COUPONS:"coupons",
  GET_TRENDING_COUPONS:"trendingcoupons",
  SEND_COUPON_USAGE:"couponsusage"
};