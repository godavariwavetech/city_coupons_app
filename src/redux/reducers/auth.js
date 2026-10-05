
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
      const response = await api.delete(`${endpoints.GET_USER_PROFILE}/${userId}`);
      return response.data;
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Failed to delete account';
      return rejectWithValue(msg);
    }
  }
);
export const fetchCategoriesWithVendors = createAsyncThunk(
  'home/fetchCategoriesWithVendors',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(endpoints.GET_CATEGORIES_WITH_VENDORS);
      return response.data; // { status, message, data: [...] }
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Failed to load categories';
      return rejectWithValue(msg);
    }
  }
);


export const fetchAllCoupons = createAsyncThunk(
  'home/fetchAllCoupons',
  async (userId, { rejectWithValue }) => {
    if (!userId) {
      return rejectWithValue('User not logged in');
    }

    try {
      const response = await api.get(`/homecoupons/${userId}`);
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
  async (userId, { rejectWithValue }) => {
    if (!userId) {
      return rejectWithValue('User not logged in');
    }

    try {
      const response = await api.get(`/trendingcoupons/${userId}`);
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
  async ({ userId, vendorId }, { rejectWithValue }) => {
    try {
      const response = await api.post(`vendorcoupons`, {
        userId,
        vendorId,
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
  async ({ userId, points }, { rejectWithValue }) => {
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


export const fetchBniCoupons = createAsyncThunk(
  'home/fetchBniCoupons',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/bnicoupons/${userId}`);
      return response.data.data || [];
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to load BNI coupons';
      return rejectWithValue(msg);
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
      state.profile = null;
      state.isNewUser = false;
      state.otpRequestSuccess = false;
      state.message = null;

      // Also clear user-specific fetched data (recommended)
      state.categories = [];
      state.coupons = [];
      state.trendingCoupons = [];
      state.vendorCoupons = [];
      state.vendorInfo = null;
      state.couponHistory = [];
      state.rewardsCoupons = [];
      state.totalPoints = 0;
    },
    resetOtpState: (state) => {
      state.isNewUser = false;
      state.otpRequestSuccess = false;
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
  },
});

export const { actionLogout, resetOtpState ,logout} = AuthSlice.actions;
export default AuthSlice.reducer;