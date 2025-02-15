import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormState, Plan, UserInfo } from './types';

const initialState: FormState = {
  currentStep: 1,
  userInfo: {
    name: '',
    email: '',
    phone: ''
  },
  selectedPlan: null,
  billingCycle: 'monthly',
  selectedAddOns: []
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<Partial<UserInfo>>) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
    setPlan: (state, action: PayloadAction<Plan>) => {
      state.selectedPlan = action.payload;
    },
    setBillingCycle: (state, action: PayloadAction<'monthly' | 'yearly'>) => {
      state.billingCycle = action.payload;
    },
    toggleAddOn: (state, action: PayloadAction<string>) => {
      const addonId = action.payload;
      const index = state.selectedAddOns.indexOf(addonId);
      if (index === -1) {
        state.selectedAddOns.push(addonId);
      } else {
        state.selectedAddOns.splice(index, 1);
      }
    },
    resetForm: () => initialState
  }
});

export const {
  setStep,
  setUserInfo,
  setPlan,
  setBillingCycle,
  toggleAddOn,
  resetForm
} = formSlice.actions;

export default formSlice.reducer;