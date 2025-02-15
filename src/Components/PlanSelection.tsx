import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { setPlan, setBillingCycle, setStep } from '../store/formSlice';
import { PLANS } from '../constans';
import { Switch } from '@headlessui/react';

export const PlanSelection: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedPlan, billingCycle } = useAppSelector(state => state.form);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PLANS.map((plan) => (
          <button
            key={plan.id}
            onClick={() => dispatch(setPlan(plan))}
            className={`p-4 border rounded-lg text-left hover:border-purplish-blue transition-colors
              ${selectedPlan?.id === plan.id 
                ? 'border-purplish-blue bg-magnolia' 
                : 'border-light-gray'}`}
          >
            <img src={plan.icon} alt={plan.name} className="w-10 h-10 mb-6" />
            <h3 className="font-bold text-marine-blue">{plan.name}</h3>
            <p className="text-cool-gray">
              ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}/
              {billingCycle === 'monthly' ? 'mo' : 'yr'}
            </p>
            {billingCycle === 'yearly' && (
              <p className="text-sm text-marine-blue mt-1">2 months free</p>
            )}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-center bg-alabaster p-4 rounded-lg">
        <span className={`mr-4 font-medium ${
          billingCycle === 'monthly' 
            ? 'text-marine-blue' 
            : 'text-cool-gray'
        }`}>
          Monthly
        </span>
        <Switch
          checked={billingCycle === 'yearly'}
          onChange={(checked) => dispatch(setBillingCycle(checked ? 'yearly' : 'monthly'))}
          className="relative inline-flex h-6 w-11 items-center rounded-full bg-marine-blue"
        >
          <span className="sr-only">Toggle billing cycle</span>
          <span
            className={`${
              billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
        <span className={`ml-4 font-medium ${
          billingCycle === 'yearly' 
            ? 'text-marine-blue' 
            : 'text-cool-gray'
        }`}>
          Yearly
        </span>
      </div>

      <div className="flex justify-between pt-6">
        <button
          onClick={() => dispatch(setStep(1))}
          className="text-cool-gray hover:text-marine-blue transition-colors font-medium"
        >
          Go Back
        </button>
        <button
          onClick={() => dispatch(setStep(3))}
          disabled={!selectedPlan}
          className="bg-marine-blue text-white px-6 py-3 rounded-md 
            hover:bg-marine-blue/90 disabled:opacity-50 transition-colors duration-200"
        >
          Next Step
        </button>
      </div>
    </div>
  );
};