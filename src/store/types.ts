export interface UserInfo {
    name: string;
    email: string;
    phone: string;
  }
  
  export interface Plan {
    id: 'arcade' | 'advanced' | 'pro';
    name: string;
    monthlyPrice: number;
    yearlyPrice: number;
    icon: string;
  }
  
  export interface AddOn {
    id: string;
    name: string;
    description: string;
    monthlyPrice: number;
    yearlyPrice: number;
  }
  
  export interface FormState {
    currentStep: number;
    userInfo: UserInfo;
    selectedPlan: Plan | null;
    billingCycle: 'monthly' | 'yearly';
    selectedAddOns: string[];
  }
  