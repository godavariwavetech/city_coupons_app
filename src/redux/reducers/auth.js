
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Platform } from 'react-native';
import api from '../../utils/api';
import { endpoints } from '../../config/config';

const initialState = {
  message: null,
  loading: false,
  token: null,
  userRole: 1,
  userId: null,
  isNewUser: false,        // ← Will be TRUE only if user is NEW (not registered)
  otpRequestSuccess: false,
  vendorId: null,
  vendorOtpRequestSuccess: false,
  approvalStatus: null,     // ← Vendor registration approval: 0 = pending, 1 = approved
    profile: null,
    categories: [],
categoriesLoading: false,
categoriesError: null,

coupons: [],
couponsLoading: false,
couponsError: null,

trendingCoupons: [],
trendingLoading: false,
trendingError: null,

vendorCoupons: [],
vendorCouponsLoading: false,
vendorCouponsError: null,
vendorInfo: null,

vendorProfile: null,
vendorDashboard: null,
vendorDashboardLoading: false,
vendorDashboardError: null,

vendorCouponsList: [],
vendorCouponsListLoading: false,
vendorCouponsListError: null,
vendorCouponActionLoading: false,

bniConnections: [],
bniConnectionsLoading: false,
bniConnectionsError: null,

givenConnections: [],
givenConnectionLoading: false,
givenConnectionError: null,
addGivenConnectionLoading: false,


couponHistory: [],
couponHistoryLoading: false,
couponHistoryError: null,
rewardsCoupons: [],
rewardsLoading: false,
rewardsError: null,
totalPoints: 0,


bniCoupons: [],
bniLoading: false,
bniError: null,

bniCategories: [],
bniCategoriesLoading: false,
bniCategoriesError: null,

bniCities: [],
bniCitiesLoading: false,
bniCitiesError: null,
bniCityAdding: false,
selectedCity: null,       // ← { id, name } chosen at registration / switched from Home
loginCityId: null,        // ← cityId returned by user login (the account's own city)

bniStates: [],
bniStatesLoading: false,
bniStateAdding: false,

bniDistricts: [],
bniDistrictsLoading: false,
bniDistrictAdding: false,

bniIndustries: [],
bniIndustriesLoading: false,
bniIndustriesError: null,
bniIndustryAdding: false,
};



// ─────────────────────────────────────────────
// 1. Request Login OTP
// ─────────────────────────────────────────────
export const requestLoginOtp = createAsyncThunk(
  'auth/requestLoginOtp',
  async (mobileNumber, { rejectWithValue }) => {
    try {
      const response = await api.post(endpoints.REQUEST_LOGIN_OTP, {
        mobile: mobileNumber,
      });
      return response.data; // { status, message, user_ind }
    } catch (err) {
      const msg =
        err?.response?.data?.message || err.message || 'Network Error';
      return rejectWithValue(msg);
    }
  }
);

// ─────────────────────────────────────────────
// 1b. Request Vendor Login OTP
// ─────────────────────────────────────────────
export const requestVendorLoginOtp = createAsyncThunk(
  'auth/requestVendorLoginOtp',
  async (mobileNumber, { rejectWithValue }) => {
    try {
      const response = await api.post(endpoints.REQUEST_VENDOR_LOGIN_OTP, {
        mobile: mobileNumber,
      });
      return response.data; // { status, message, vendorId }
    } catch (err) {
      const msg =
        err?.response?.data?.message || err.message || 'Network Error';
      return rejectWithValue(msg);
    }
  }
);

// ─────────────────────────────────────────────
// 2. Register New User
// ─────────────────────────────────────────────
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (payload, { rejectWithValue }) => {
    try {
      console.log(payload,"for registration")
      const response = await api.post(endpoints.USER_REGISTRATION, payload);
        console.log(response,"registration response")
      return response.data;
    
    } catch (err) {
      const msg =
        err?.response?.data?.message || err.message || 'Registration Failed';
      return rejectWithValue(msg);
    }
  }
);

// ─────────────────────────────────────────────
// 3. Verify Login OTP
// ─────────────────────────────────────────────
export const verifyLoginOtp = createAsyncThunk(
  'auth/verifyLoginOtp',
  async ({ mobile, otp }, { rejectWithValue }) => {
    try {
      const response = await api.post(endpoints.USER_VERIFICATION, {
        mobile,
        otp,
      });
      return response.data;
    } catch (err) {
      const msg =
        err?.response?.data?.message || err.message || 'Verification Failed';
      return rejectWithValue(msg);
    }
  }
);
// ─────────────────────────────────────────────
// 2b. Register Vendor
// ─────────────────────────────────────────────
export const registerVendor = createAsyncThunk(
  'auth/registerVendor',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post(endpoints.VENDOR_REGISTRATION, payload);
      return response.data; // { status, message, vendorId, approvalStatus }
    } catch (err) {
      const msg =
        err?.response?.data?.message || err.message || 'Registration Failed';
      return rejectWithValue(msg);
    }
  }
);

// ─────────────────────────────────────────────
// 3b. Verify Vendor Login OTP
// ─────────────────────────────────────────────
export const verifyVendorLoginOtp = createAsyncThunk(
  'auth/verifyVendorLoginOtp',
  async ({ mobile, otp }, { rejectWithValue }) => {
    try {
      const response = await api.post(endpoints.VENDOR_VERIFICATION, {
        mobile,
        otp,
      });
      return response.data; // { status, message, vendorId, token }
    } catch (err) {
      const msg =
        err?.response?.data?.message || err.message || 'Verification Failed';
      return rejectWithValue(msg);
    }
  }
);

// ADD THIS THUNK
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`${endpoints.GET_USER_PROFILE}/${userId}`);
      return response.data; // { status, message, data: { ...user details } }
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Failed to fetch profile';
      return rejectWithValue(msg);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async ({ userId, profileData }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`${endpoints.GET_USER_PROFILE}/${userId}`, profileData);
      return response.data; // { status: 200, message: "User Updated Successfully", user_id: "11" }
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Update failed';
      return rejectWithValue(msg);
    }
  }
);

export const deleteUserAccount = createAsyncThunk(
  'auth/deleteUserAccount',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`${endpoints.DLETE_USER_ACCOUNT}/${userId}`);
      return response.data;
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Failed to delete account';
      return rejectWithValue(msg);
    }
  }
);
// ─────────────────────────────────────────────
// Vendor Profile
// ─────────────────────────────────────────────
export const fetchVendorProfile = createAsyncThunk(
  'auth/fetchVendorProfile',
  async (vendorId, { rejectWithValue }) => {
    try {
      const response = await api.get(`${endpoints.GET_VENDOR_PROFILE}/${vendorId}`);
      return response.data; // { status, message, data: { ...vendor details } }
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Failed to fetch profile';
      return rejectWithValue(msg);
    }
  }
);

export const updateVendorProfile = createAsyncThunk(
  'auth/updateVendorProfile',
  async ({ vendorId, profileData }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`${endpoints.GET_VENDOR_PROFILE}/${vendorId}`, profileData);
      return response.data; // { status, message, ... }
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Update failed';
      return rejectWithValue(msg);
    }
  }
);

export const deleteVendorAccount = createAsyncThunk(
  'auth/deleteVendorAccount',
  async (vendorId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`${endpoints.DELETE_VENDOR_ACCOUNT}/${vendorId}`);
      return response.data;
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Failed to delete account';
      return rejectWithValue(msg);
    }
  }
);

// ─────────────────────────────────────────────
// Vendor Dashboard
// ─────────────────────────────────────────────
export const fetchVendorDashboard = createAsyncThunk(
  'vendor/fetchVendorDashboard',
  async (vendorId, { rejectWithValue }) => {
    try {
      const response = await api.get(`${endpoints.GET_VENDOR_DASHBOARD}/${vendorId}/dashboard`);
      return response.data; // { status, message, data: {...} }
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Failed to load dashboard';
      return rejectWithValue(msg);
    }
  }
);

// ─────────────────────────────────────────────
// Vendor Coupons Management (CRUD)
// ─────────────────────────────────────────────
export const listVendorCoupons = createAsyncThunk(
  'vendor/listVendorCoupons',
  async (vendorId, { rejectWithValue }) => {
    try {
      const response = await api.get(`${endpoints.VENDOR_COUPONS}/${vendorId}/coupons`);
      return response.data; // { status, message, data: [...] }
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Failed to load coupons';
      return rejectWithValue(msg);
    }
  }
);

export const createVendorCoupon = createAsyncThunk(
  'vendor/createVendorCoupon',
  async ({ vendorId, couponData }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${endpoints.VENDOR_COUPONS}/${vendorId}/coupons`, couponData);
      return response.data; // { status, message, data: {...} }
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Failed to create coupon';
      return rejectWithValue(msg);
    }
  }
);

export const updateVendorCoupon = createAsyncThunk(
  'vendor/updateVendorCoupon',
  async ({ vendorId, couponId, couponData }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `${endpoints.VENDOR_COUPONS}/${vendorId}/coupons/${couponId}`,
        couponData
      );
      return { couponId, ...response.data };
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Failed to update coupon';
      return rejectWithValue(msg);
    }
  }
);

export const deleteVendorCoupon = createAsyncThunk(
  'vendor/deleteVendorCoupon',
  async ({ vendorId, couponId }, { rejectWithValue }) => {
    try {
      const response = await api.delete(`${endpoints.VENDOR_COUPONS}/${vendorId}/coupons/${couponId}`);
      return { couponId, ...response.data };
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Failed to delete coupon';
      return rejectWithValue(msg);
    }
  }
);

// City the user picked (registration / Home city switcher) — sent with every coupon call
const getCityParams = (getState) => {
  const cityId = getState().Auth?.selectedCity?.id;
  return cityId ? { cityId } : {};
};

export const fetchCategoriesWithVendors = createAsyncThunk(
  'home/fetchCategoriesWithVendors',
  async (_, { rejectWithValue, getState }) => {
    try {
      const response = await api.get(endpoints.GET_CATEGORIES_WITH_VENDORS, {
        params: getCityParams(getState),
      });
      return response.data; // { status, message, data: [...] }
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Failed to load categories';
      return rejectWithValue(msg);
    }
  }
);


export const fetchAllCoupons = createAsyncThunk(
  'home/fetchAllCoupons',
  async (userId, { rejectWithValue, getState }) => {
    if (!userId) {
      return rejectWithValue('User not logged in');
    }

    try {
      const response = await api.get(`/homecoupons/${userId}`, {
        params: getCityParams(getState),
      });
      console.log('All Coupons Response:', response.data); // Debug

      // Adjust based on your actual backend response
      return response.data.data || response.data || [];
    } catch (err) {
      console.log('All Coupons Error:', err.response?.data);
      const msg = err?.response?.data?.message || 'Failed to load coupons';
      return rejectWithValue(msg);
    }
  }
);


export const fetchTrendingCoupons = createAsyncThunk(
  'home/fetchTrendingCoupons',
  async (userId, { rejectWithValue, getState }) => {
    if (!userId) {
      return rejectWithValue('User not logged in');
    }

    try {
      const response = await api.get(`/trendingcoupons/${userId}`, {
        params: getCityParams(getState),
      });
      console.log('Trending Coupons Response:', response.data); // Debug

      return response.data.data || response.data || [];
    } catch (err) {
      console.log('Trending Coupons Error:', err.response?.data);
      const msg = err?.response?.data?.message || 'Failed to load trending offers';
      return rejectWithValue(msg);
    }
  }
);
export const fetchVendorCoupons = createAsyncThunk(
  'vendor/fetchVendorCoupons',
  async ({ userId, vendorId }, { rejectWithValue, getState }) => {
    try {
      const response = await api.post(`vendorcoupons`, {
        userId,
        vendorId,
        ...getCityParams(getState),
      });
console.log(userId,"to get all trending coupons") 
      console.log('Vendor Coupons Response:', response.data);

      const coupons = response.data?.data || [];

      // Extract vendor info from first coupon (if exists)
      if (coupons.length > 0) {
        const first = coupons[0];
        return {
          coupons,
          vendorInfo: {
            vendorName: first.vendorName,
            vendorLogo: first.vendorLogo,
            imageUrl: first.imageUrl || first.categoryImage,
          },
        };
      }

      return { coupons: [], vendorInfo: null };
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to load coupons';
      return rejectWithValue(msg);
    }
  }
);


export const fetchCouponHistory = createAsyncThunk(
  'auth/fetchCouponHistory',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`couponhistory/${userId}`);
      const rawData = response.data?.data;

      if (rawData) {
        return Array.isArray(rawData) ? rawData : [rawData];
      }
      return [];
    } catch (err) {
      return rejectWithValue('Failed to load history');
    }
  }
);


export const recordCouponUsage = createAsyncThunk(
  'coupons/recordCouponUsage',
  async ({ userId, couponId ,couponType,rewardPoints}, { rejectWithValue }) => {
    console.log(userId,couponId,couponType,"u_i,_c_i,c_t")
    try {
      const response = await api.post(endpoints.SEND_COUPON_USAGE, {
        userId,
        couponId,
        couponType,
        rewardPoints
      });
      return response.data;
    } catch (err) {
      console.log('❌ recordCouponUsage ERROR:', err.response?.data);
      
      // ✅ FIXED: Always return STRING
      let errorMessage = 'Failed to record coupon usage';
      
      if (err?.response?.data) {
        // Handle ReadableNativeMap/Object
        if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        } else if (err.response.data?.message) {
          errorMessage = String(err.response.data.message);
        } else {
          errorMessage = String(err.response.data);
        }
      } else if (err?.message) {
        errorMessage = err.message;
      }
      
      return rejectWithValue(errorMessage); // Always STRING
    }
  }
);
export const fetchRewardsCoupons = createAsyncThunk(
  'rewards/fetchRewardsCoupons',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`rewardshistory/${userId}`);
      
      if (response.data.status) {
        return response.data.data; // array of redeemable coupons
      } else {
        return rejectWithValue(response.data.message || 'Failed to fetch rewards');
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Failed to load rewards';
      return rejectWithValue(msg);
    }
  }
);


export const fetchRedeemableCoupons = createAsyncThunk(
  'auth/fetchRedeemableCoupons',
  async ({ userId, points }, { rejectWithValue, getState }) => {
    if (!userId) {
      return rejectWithValue('User not logged in');
    }

    if (!points || points <= 0) {
      return rejectWithValue('Please enter valid points');
    }

    try {
      console.log(userId,points,"user id and points_____________")
      const response = await api.post('rewardsbypoints', {
        userId,
        rewardPoints:points,
        ...getCityParams(getState),
      });

      console.log('Redeemable Coupons Response:', response.data);

      if (response.data.status) {
        return response.data.data || [];
      } else {
        return rejectWithValue(response.data.message || 'No coupons available');
      }
    } catch (err) {
      console.error('Redeemable Coupons Error:', err.response?.data);
      const msg = err?.response?.data?.message || 'Failed to load redeemable coupons';
      return rejectWithValue(msg);
    }
  }
);


export const fetchBniCategories = createAsyncThunk(
  'bni/fetchBniCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(endpoints.LIST_BNI_CATEGORIES);
      return response.data; // { status, message, data: [...] }
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to load categories';
      return rejectWithValue(msg);
    }
  }
);


export const fetchBniCities = createAsyncThunk(
  'bni/fetchBniCities',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(endpoints.BNI_CITIES);
      return response.data; // { status, message, data: [...] }
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to load cities';
      return rejectWithValue(msg);
    }
  }
);

export const fetchBniStates = createAsyncThunk(
  'bni/fetchBniStates',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(endpoints.BNI_STATES);
      return response.data; // { status, data: [{ id, name }] }
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to load states';
      return rejectWithValue(msg);
    }
  }
);

export const addBniState = createAsyncThunk(
  'bni/addBniState',
  async (name, { rejectWithValue }) => {
    try {
      const response = await api.post(endpoints.BNI_STATES, { name });
      return response.data; // { status, data: { id, name } }
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to add state';
      return rejectWithValue(msg);
    }
  }
);

export const fetchBniDistricts = createAsyncThunk(
  'bni/fetchBniDistricts',
  async (stateId, { rejectWithValue }) => {
    try {
      const response = await api.get(endpoints.BNI_DISTRICTS, { params: { stateId } });
      return response.data; // { status, data: [{ id, stateId, name }] }
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to load districts';
      return rejectWithValue(msg);
    }
  }
);

export const addBniDistrict = createAsyncThunk(
  'bni/addBniDistrict',
  async ({ name, stateId }, { rejectWithValue }) => {
    try {
      const response = await api.post(endpoints.BNI_DISTRICTS, { name, stateId });
      return response.data; // { status, data: { id, stateId, name } }
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to add district';
      return rejectWithValue(msg);
    }
  }
);

export const addBniCity = createAsyncThunk(
  'bni/addBniCity',
  async (name, { rejectWithValue }) => {
    try {
      const response = await api.post(endpoints.BNI_CITIES, { name });
      return response.data; // { status, message, data: {...} }
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to add city';
      return rejectWithValue(msg);
    }
  }
);


export const fetchBniIndustries = createAsyncThunk(
  'bni/fetchBniIndustries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(endpoints.BNI_INDUSTRIES);
      return response.data; // { status, message, data: [...] }
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to load industries';
      return rejectWithValue(msg);
    }
  }
);

export const addBniIndustry = createAsyncThunk(
  'bni/addBniIndustry',
  async (name, { rejectWithValue }) => {
    try {
      const response = await api.post(endpoints.BNI_INDUSTRIES, { name });
      return response.data; // { status, message, data: {...} }
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to add industry';
      return rejectWithValue(msg);
    }
  }
);


export const fetchBniCoupons = createAsyncThunk(
  'home/fetchBniCoupons',
  async (userId, { rejectWithValue, getState }) => {
    try {
      const response = await api.get(`/bnicoupons/${userId}`, {
        params: getCityParams(getState),
      });
      return response.data.data || [];
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to load BNI coupons';
      return rejectWithValue(msg);
    }
  }
);

export const searchBniConnections = createAsyncThunk(
  'bni/searchBniConnections',
  async (search, { rejectWithValue }) => {
    try {
      const response = await api.get(endpoints.BNI_CONNECTIONS, {
        params: { search },
      });
      return response.data;
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Failed to search connections';
      return rejectWithValue(msg);
    }
  }
);

export const fetchGivenBniConnection = createAsyncThunk(
  'bni/fetchGivenBniConnection',
  async (vendorId, { rejectWithValue }) => {
    try {
      const response = await api.get(endpoints.BNI_CONNECTIONS, {
        params: { vendorId },
      });
      return response.data;
    } catch (err) {
      if (err?.response?.status === 404) {
        return [];
      }
      const msg = err?.response?.data?.message || err.message || 'Failed to fetch connection';
      return rejectWithValue(msg);
    }
  }
);

export const addGivenBniConnection = createAsyncThunk(
  'bni/addGivenBniConnection',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post(endpoints.BNI_CONNECTIONS, payload);
      return response.data;
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Failed to add connection';
      return rejectWithValue(msg);
    }
  }
);


// Send this device's FCM token so the backend can push notifications.
// role: 'user' | 'vendor', id: userId / vendorId
export const saveFcmToken = createAsyncThunk(
  'notifications/saveFcmToken',
  async ({ role, id, fcmToken }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${role}/${id}/${endpoints.DEVICE_TOKEN}`, {
        token: fcmToken,
        platform: Platform.OS,
      });
      console.log('Save FCM token response:', response.data);
      return response.data;
    } catch (err) {
      console.log('Save FCM token error:', err?.response?.status, err?.response?.data);
      const msg = err?.response?.data?.message || err.message || 'Failed to save FCM token';
      return rejectWithValue(msg);
    }
  }
);

// On logout, so this device stops receiving the previous account's notifications
export const removeFcmToken = createAsyncThunk(
  'notifications/removeFcmToken',
  async (fcmToken, { rejectWithValue }) => {
    try {
      const response = await api.post(endpoints.REMOVE_DEVICE_TOKEN, { token: fcmToken });
      return response.data;
    } catch (err) {
      console.log('Remove FCM token error:', err?.response?.status, err?.response?.data);
      return rejectWithValue(err?.response?.data?.message || err.message);
    }
  }
);

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //  actionLogout: (state) => {  // ← THIS IS THE PROBLEM
    //   state.token = null;
    //   state.userId = null;
    //   state.isNewUser = false;
    //   state.otpRequestSuccess = false;
    //   state.message = null;
    // },
     logout: (state) => {
      // Clear authentication data
      state.token = null;
      state.userId = null;
      state.vendorId = null;
      state.approvalStatus = null;
      state.profile = null;
      state.isNewUser = false;
      state.otpRequestSuccess = false;
      state.vendorOtpRequestSuccess = false;
      state.message = null;

      // Also clear user-specific fetched data (recommended)
      state.categories = [];
      state.coupons = [];
      state.trendingCoupons = [];
      state.vendorCoupons = [];
      state.vendorInfo = null;
      state.vendorProfile = null;
      state.vendorDashboard = null;
      state.vendorCouponsList = [];
      state.couponHistory = [];
      state.rewardsCoupons = [];
      state.totalPoints = 0;
      // Next login picks the city up again from the user's profile (cityId saved at registration)
      state.selectedCity = null;
      state.loginCityId = null;
    },
    setSelectedCity: (state, action) => {
      state.selectedCity = action.payload
        ? { id: action.payload.id, name: action.payload.name }
        : null;
    },
    resetOtpState: (state) => {
      state.isNewUser = false;
      state.otpRequestSuccess = false;
      state.vendorOtpRequestSuccess = false;
      state.message = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // ────────────────────── Request OTP ──────────────────────
      .addCase(requestLoginOtp.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(requestLoginOtp.fulfilled, (state, action) => {
  state.loading = false;
  state.message = action.payload?.message || 'OTP sent';
  state.otpRequestSuccess = true;

  const userInd = Number(action.payload?.user_ind);

  // CORRECTED: user_ind === 0 means NEW USER
  state.isNewUser = userInd === 0;

  console.log('OTP Request → user_ind:', userInd, '→ isNewUser:', state.isNewUser);
})
      .addCase(requestLoginOtp.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload || 'Failed to send OTP';
        state.otpRequestSuccess = false;
      })

      // ────────────────────── Request Vendor OTP ──────────────────────
      .addCase(requestVendorLoginOtp.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(requestVendorLoginOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || 'OTP sent';

        // Do NOT persist vendorId/approvalStatus here — OTP has not been
        // verified yet. Only verifyVendorLoginOtp.fulfilled should log the
        // vendor in. Keep the pending-approval status only transiently.
        const pendingApprovalStatus =
          action.payload?.approvalStatus === 0 || action.payload?.approvalStatus === 1
            ? action.payload.approvalStatus
            : state.approvalStatus;
        state.vendorOtpRequestSuccess = pendingApprovalStatus !== 0;
      })
      .addCase(requestVendorLoginOtp.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload || 'Failed to send OTP';
        state.vendorOtpRequestSuccess = false;
      })

      // ────────────────────── Registration ──────────────────────
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || 'Registered successfully';
        state.userId = action.payload?.user_id ?? null;
        console.log('Registration → user_id:', state.userId);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload || 'Registration failed';
      })

      // ────────────────────── Vendor Registration ──────────────────────
      .addCase(registerVendor.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || 'Registration submitted for admin approval';
        state.vendorId = action.payload?.vendorId ?? null;
        state.approvalStatus = action.payload?.approvalStatus ?? 0;
      })
      .addCase(registerVendor.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload || 'Registration failed';
      })

      // ────────────────────── Verify OTP (Login) ──────────────────────
      .addCase(verifyLoginOtp.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(verifyLoginOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || 'Login successful';

        // Save login data
        state.userId = action.payload?.user_id ?? null;
        state.token = action.payload?.token ?? state.token;

        // City saved on the account → Home loads coupons for it straight away
        // (name is filled in from bni/cities on Home if the login response doesn't carry it)
        const loginUser = action.payload?.user || action.payload?.data || {};
        const loginCityId =
          action.payload?.cityId ?? action.payload?.city_id ?? loginUser.cityId ?? loginUser.city_id;
        if (loginCityId !== undefined && loginCityId !== null && loginCityId !== '') {
          state.loginCityId = Number(loginCityId);
          state.selectedCity = {
            id: Number(loginCityId),
            name: action.payload?.cityName ?? action.payload?.city ?? loginUser.cityName ?? loginUser.city ?? null,
          };
        }

        // Reset flow flags after successful login
        state.isNewUser = false;
        state.otpRequestSuccess = false;

        console.log('LOGIN SUCCESS → user_id:', state.userId);
        console.log('Redux Auth State →', {
          userId: state.userId,
          token: state.token,
          isLoggedIn: !!state.userId,
        });
      })
      .addCase(verifyLoginOtp.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload || 'Invalid or expired OTP';
      })

      // ────────────────────── Verify OTP (Vendor Login) ──────────────────────
      .addCase(verifyVendorLoginOtp.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(verifyVendorLoginOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || 'Login successful';

        // Backend returns { status, message, vendor: { id, approvalStatus, ... } }
        // (no top-level vendorId/token, and no auth token at all for this flow)
        const vendor = action.payload?.vendor;
        state.vendorId = vendor?.id ?? action.payload?.vendorId ?? state.vendorId;
        state.token = action.payload?.token ?? state.token;
        state.vendorProfile = vendor ?? state.vendorProfile;
        const approvalStatus = vendor?.approvalStatus ?? action.payload?.approvalStatus;
        if (approvalStatus === 0 || approvalStatus === 1) {
          state.approvalStatus = approvalStatus;
        }

        // Reset flow flags after successful login
        state.vendorOtpRequestSuccess = false;

        console.log('VENDOR LOGIN SUCCESS → vendorId:', state.vendorId, 'approvalStatus:', state.approvalStatus);
      })
      .addCase(verifyVendorLoginOtp.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload || 'Invalid or expired OTP';
      })
            // ────────────────────── FETCH USER PROFILE ──────────────────────
     // FETCH USER PROFILE
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
  state.loading = false;
  state.message = action.payload?.message || 'Profile loaded';

  // THIS LINE IS CRITICAL — saves data so Profile.js can read it
  state.profile = action.payload.data;

  console.log('Profile saved in Redux →', state.profile);
})
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload || 'Failed to load profile';
        state.profile = null;
      })
       .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || 'Profile updated';
        // Optionally refetch fresh data
        state.profile = null; // Force refetch on next screen open
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload || 'Failed to update profile';
      })
      // ────────────────────── FETCH VENDOR PROFILE ──────────────────────
      .addCase(fetchVendorProfile.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(fetchVendorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || 'Profile loaded';
        state.vendorProfile = action.payload.data;
      })
      .addCase(fetchVendorProfile.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload || 'Failed to load profile';
        state.vendorProfile = null;
      })
      .addCase(updateVendorProfile.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(updateVendorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || 'Profile updated';
        state.vendorProfile = null; // Force refetch on next screen open
      })
      .addCase(updateVendorProfile.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload || 'Failed to update profile';
      })
      // ────────────────────── FETCH VENDOR DASHBOARD ──────────────────────
      .addCase(fetchVendorDashboard.pending, (state) => {
        state.vendorDashboardLoading = true;
        state.vendorDashboardError = null;
      })
      .addCase(fetchVendorDashboard.fulfilled, (state, action) => {
        state.vendorDashboardLoading = false;
        state.vendorDashboard = action.payload?.data || action.payload || null;
      })
      .addCase(fetchVendorDashboard.rejected, (state, action) => {
        state.vendorDashboardLoading = false;
        state.vendorDashboardError = action.payload;
        state.vendorDashboard = null;
      })
      // ────────────────────── Vendor Coupons: List ──────────────────────
      .addCase(listVendorCoupons.pending, (state) => {
        state.vendorCouponsListLoading = true;
        state.vendorCouponsListError = null;
      })
      .addCase(listVendorCoupons.fulfilled, (state, action) => {
        state.vendorCouponsListLoading = false;
        state.vendorCouponsList = action.payload?.data || action.payload || [];
      })
      .addCase(listVendorCoupons.rejected, (state, action) => {
        state.vendorCouponsListLoading = false;
        state.vendorCouponsListError = action.payload;
        state.vendorCouponsList = [];
      })
      // ────────────────────── Vendor Coupons: Create ──────────────────────
      .addCase(createVendorCoupon.pending, (state) => {
        state.vendorCouponActionLoading = true;
        state.message = null;
      })
      .addCase(createVendorCoupon.fulfilled, (state, action) => {
        state.vendorCouponActionLoading = false;
        state.message = action.payload?.message || 'Coupon created successfully';
        if (action.payload?.data) {
          state.vendorCouponsList = [action.payload.data, ...state.vendorCouponsList];
        }
      })
      .addCase(createVendorCoupon.rejected, (state, action) => {
        state.vendorCouponActionLoading = false;
        state.message = action.payload || 'Failed to create coupon';
      })
      // ────────────────────── Vendor Coupons: Update ──────────────────────
      .addCase(updateVendorCoupon.pending, (state) => {
        state.vendorCouponActionLoading = true;
        state.message = null;
      })
      .addCase(updateVendorCoupon.fulfilled, (state, action) => {
        state.vendorCouponActionLoading = false;
        state.message = action.payload?.message || 'Coupon updated successfully';
        state.vendorCouponsList = state.vendorCouponsList.map((c) =>
          (c.id ?? c.couponId) === action.payload.couponId
            ? { ...c, ...(action.payload.data || {}) }
            : c
        );
      })
      .addCase(updateVendorCoupon.rejected, (state, action) => {
        state.vendorCouponActionLoading = false;
        state.message = action.payload || 'Failed to update coupon';
      })
      // ────────────────────── Vendor Coupons: Delete ──────────────────────
      .addCase(deleteVendorCoupon.pending, (state) => {
        state.vendorCouponActionLoading = true;
        state.message = null;
      })
      .addCase(deleteVendorCoupon.fulfilled, (state, action) => {
        state.vendorCouponActionLoading = false;
        state.message = action.payload?.message || 'Coupon deleted successfully';
        state.vendorCouponsList = state.vendorCouponsList.filter(
          (c) => (c.id ?? c.couponId) !== action.payload.couponId
        );
      })
      .addCase(deleteVendorCoupon.rejected, (state, action) => {
        state.vendorCouponActionLoading = false;
        state.message = action.payload || 'Failed to delete coupon';
      })
      .addCase(fetchCategoriesWithVendors.pending, (state) => {
  state.categoriesLoading = true;
  state.categoriesError = null;
})
.addCase(fetchCategoriesWithVendors.fulfilled, (state, action) => {
  state.categoriesLoading = false;
  state.categories = action.payload.data || [];
})
.addCase(fetchCategoriesWithVendors.rejected, (state, action) => {
  state.categoriesLoading = false;
  state.categoriesError = action.payload;
  state.categories = [];
})
.addCase(fetchAllCoupons.pending, (state) => {
  state.couponsLoading = true;
  state.couponsError = null;
})
.addCase(fetchAllCoupons.fulfilled, (state, action) => {
  state.couponsLoading = false;
  state.coupons = action.payload || [];
})
.addCase(fetchAllCoupons.rejected, (state, action) => {
  state.couponsLoading = false;
  state.couponsError = action.payload;
  state.coupons = [];
})
.addCase(fetchTrendingCoupons.pending, (state) => {
  state.trendingLoading = true;
  state.trendingError = null;
})
.addCase(fetchTrendingCoupons.fulfilled, (state, action) => {
  state.trendingLoading = false;
  state.trendingCoupons = action.payload || [];
})
.addCase(fetchTrendingCoupons.rejected, (state, action) => {
  state.trendingLoading = false;
  state.trendingError = action.payload;
  state.trendingCoupons = [];
})
      .addCase(fetchVendorCoupons.pending, (state) => {
  state.vendorCouponsLoading = true;
  state.vendorCouponsError = null;
})
.addCase(fetchVendorCoupons.fulfilled, (state, action) => {
  state.vendorCouponsLoading = false;
  state.vendorCoupons = action.payload.coupons || [];
  state.vendorInfo = action.payload.vendorInfo;
})
.addCase(fetchVendorCoupons.rejected, (state, action) => {
  state.vendorCouponsLoading = false;
  state.vendorCouponsError = action.payload;
  state.vendorCoupons = [];
  state.vendorInfo = null;
})
.addCase(fetchCouponHistory.pending, (state) => {
  state.couponHistoryLoading = true;
  state.couponHistoryError = null;
})
.addCase(fetchCouponHistory.fulfilled, (state, action) => {
  state.couponHistoryLoading = false;
  state.couponHistory = action.payload || [];
})
.addCase(fetchCouponHistory.rejected, (state, action) => {
  state.couponHistoryLoading = false;
  state.couponHistoryError = action.payload;
  state.couponHistory = [];
})
   .addCase(recordCouponUsage.pending, (state) => {
        state.loading = true; // reuse existing loading or add a specific one
      })
      .addCase(recordCouponUsage.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || 'Coupon applied successfully';
      })
      .addCase(recordCouponUsage.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload || 'Failed to apply coupon';
      })
      .addCase(fetchRewardsCoupons.pending, (state) => {
  state.rewardsLoading = true;
  state.rewardsError = null;
})
.addCase(fetchRewardsCoupons.fulfilled, (state, action) => {
  state.rewardsLoading = false;
  state.rewardsCoupons = action.payload || [];

  // Optional: If backend sends total points in response, use it
  // Otherwise keep it from profile
})
.addCase(fetchRewardsCoupons.rejected, (state, action) => {
  state.rewardsLoading = false;
  state.rewardsError = action.payload;
  state.rewardsCoupons = [];
})
.addCase(fetchRedeemableCoupons.pending, (state) => {
  state.couponsLoading = true; // reuse or create redeemableLoading if needed
  state.couponsError = null;
})
.addCase(fetchRedeemableCoupons.fulfilled, (state, action) => {
  state.couponsLoading = false;
  state.coupons = action.payload || []; // we'll use state.coupons for this list
})
.addCase(fetchRedeemableCoupons.rejected, (state, action) => {
  state.couponsLoading = false;
  state.couponsError = action.payload;
  state.coupons = [];
})

.addCase(fetchBniCategories.pending, (state) => {
  state.bniCategoriesLoading = true;
  state.bniCategoriesError = null;
})
.addCase(fetchBniCategories.fulfilled, (state, action) => {
  state.bniCategoriesLoading = false;
  state.bniCategories = action.payload?.data || action.payload || [];
})
.addCase(fetchBniCategories.rejected, (state, action) => {
  state.bniCategoriesLoading = false;
  state.bniCategoriesError = action.payload;
  state.bniCategories = [];
})

.addCase(fetchBniCities.pending, (state) => {
  state.bniCitiesLoading = true;
  state.bniCitiesError = null;
})
.addCase(fetchBniCities.fulfilled, (state, action) => {
  state.bniCitiesLoading = false;
  state.bniCities = action.payload?.data || action.payload || [];
})
.addCase(fetchBniCities.rejected, (state, action) => {
  state.bniCitiesLoading = false;
  state.bniCitiesError = action.payload;
  state.bniCities = [];
})
.addCase(fetchBniStates.pending, (state) => {
  state.bniStatesLoading = true;
})
.addCase(fetchBniStates.fulfilled, (state, action) => {
  state.bniStatesLoading = false;
  state.bniStates = action.payload?.data || [];
})
.addCase(fetchBniStates.rejected, (state) => {
  state.bniStatesLoading = false;
  state.bniStates = [];
})
.addCase(addBniState.pending, (state) => {
  state.bniStateAdding = true;
})
.addCase(addBniState.fulfilled, (state, action) => {
  state.bniStateAdding = false;
  if (action.payload?.data) {
    state.bniStates = [...state.bniStates, action.payload.data];
  }
})
.addCase(addBniState.rejected, (state) => {
  state.bniStateAdding = false;
})
.addCase(fetchBniDistricts.pending, (state) => {
  state.bniDistrictsLoading = true;
  state.bniDistricts = [];
})
.addCase(fetchBniDistricts.fulfilled, (state, action) => {
  state.bniDistrictsLoading = false;
  state.bniDistricts = action.payload?.data || [];
})
.addCase(fetchBniDistricts.rejected, (state) => {
  state.bniDistrictsLoading = false;
  state.bniDistricts = [];
})
.addCase(addBniDistrict.pending, (state) => {
  state.bniDistrictAdding = true;
})
.addCase(addBniDistrict.fulfilled, (state, action) => {
  state.bniDistrictAdding = false;
  if (action.payload?.data) {
    state.bniDistricts = [...state.bniDistricts, action.payload.data];
  }
})
.addCase(addBniDistrict.rejected, (state) => {
  state.bniDistrictAdding = false;
})
.addCase(addBniCity.pending, (state) => {
  state.bniCityAdding = true;
})
.addCase(addBniCity.fulfilled, (state, action) => {
  state.bniCityAdding = false;
  if (action.payload?.data) {
    state.bniCities = [...state.bniCities, action.payload.data];
  }
})
.addCase(addBniCity.rejected, (state) => {
  state.bniCityAdding = false;
})

.addCase(fetchBniIndustries.pending, (state) => {
  state.bniIndustriesLoading = true;
  state.bniIndustriesError = null;
})
.addCase(fetchBniIndustries.fulfilled, (state, action) => {
  state.bniIndustriesLoading = false;
  state.bniIndustries = action.payload?.data || action.payload || [];
})
.addCase(fetchBniIndustries.rejected, (state, action) => {
  state.bniIndustriesLoading = false;
  state.bniIndustriesError = action.payload;
  state.bniIndustries = [];
})
.addCase(addBniIndustry.pending, (state) => {
  state.bniIndustryAdding = true;
})
.addCase(addBniIndustry.fulfilled, (state, action) => {
  state.bniIndustryAdding = false;
  if (action.payload?.data) {
    state.bniIndustries = [...state.bniIndustries, action.payload.data];
  }
})
.addCase(addBniIndustry.rejected, (state) => {
  state.bniIndustryAdding = false;
})

.addCase(fetchBniCoupons.pending, (state) => {
  state.bniLoading = true;
  state.bniError = null;
})
.addCase(fetchBniCoupons.fulfilled, (state, action) => {
  state.bniLoading = false;
  state.bniCoupons = action.payload;
})
.addCase(fetchBniCoupons.rejected, (state, action) => {
  state.bniLoading = false;
  state.bniError = action.payload;
  state.bniCoupons = [];
})

.addCase(searchBniConnections.pending, (state) => {
  state.bniConnectionsLoading = true;
  state.bniConnectionsError = null;
})
.addCase(searchBniConnections.fulfilled, (state, action) => {
  state.bniConnectionsLoading = false;
  state.bniConnections = action.payload?.data || action.payload || [];
})
.addCase(searchBniConnections.rejected, (state, action) => {
  state.bniConnectionsLoading = false;
  state.bniConnectionsError = action.payload;
  state.bniConnections = [];
})

.addCase(fetchGivenBniConnection.pending, (state) => {
  state.givenConnectionLoading = true;
  state.givenConnectionError = null;
})
.addCase(fetchGivenBniConnection.fulfilled, (state, action) => {
  state.givenConnectionLoading = false;
  const data = action.payload?.data || action.payload || [];
  state.givenConnections = Array.isArray(data) ? data : [data];
})
.addCase(fetchGivenBniConnection.rejected, (state, action) => {
  state.givenConnectionLoading = false;
  state.givenConnectionError = action.payload;
  state.givenConnections = [];
})

.addCase(addGivenBniConnection.pending, (state) => {
  state.addGivenConnectionLoading = true;
})
.addCase(addGivenBniConnection.fulfilled, (state, action) => {
  state.addGivenConnectionLoading = false;
  // Use whatever the server returned; fall back to what was submitted so the
  // card can render immediately even if the API only returns { status, message }.
  const newConnection = action.payload?.data || action.payload?.connection || action.meta.arg;
  state.givenConnections = [newConnection, ...state.givenConnections];
})
.addCase(addGivenBniConnection.rejected, (state) => {
  state.addGivenConnectionLoading = false;
})
  },
});

export const { actionLogout, resetOtpState ,logout, setSelectedCity} = AuthSlice.actions;
export default AuthSlice.reducer;