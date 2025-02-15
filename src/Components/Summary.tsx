import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { setStep, resetForm } from '../store/formSlice';
import { ADD_ONS } from '../constans';

export const Summary: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedPlan, billingCycle, selectedAddOns } = useAppSelector(state => state.form);

  const calculateTotal = (): number => {
    const planCost = selectedPlan 
      ? (billingCycle === 'monthly' ? selectedPlan.monthlyPrice : selectedPlan.yearlyPrice)
      : 0;

    const addOnsCost = selectedAddOns.reduce((total, addonId) => {
      const addon = ADD_ONS.find(a => a.id === addonId);
      if (!addon) return total;
      return total + (billingCycle === 'monthly' ? addon.monthlyPrice : addon.yearlyPrice);
    }, 0);

    return planCost + addOnsCost;
  };

  const handleConfirm = () => {
    dispatch(resetForm());
    dispatch(setStep(5));
  };

  if (!selectedPlan) {
    return (
      <div className="text-center py-6">
        <p className="text-cool-gray">Please select a plan first.</p>
        <button
          onClick={() => dispatch(setStep(2))}
          className="mt-4 text-purplish-blue hover:text-purplish-blue/90"
        >
          Go back to plan selection
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-magnolia p-6 rounded-lg">
        {/* Plan Selection Summary */}
        <div className="flex justify-between items-center pb-6 border-b border-light-gray">
          <div>
            <h3 className="font-bold text-marine-blue">
              {selectedPlan.name} ({billingCycle})
            </h3>
            <button
              onClick={() => dispatch(setStep(2))}
              className="text-cool-gray underline text-sm hover:text-purplish-blue"
            >
              Change
            </button>
          </div>
          <p className="font-bold text-marine-blue">
            ${billingCycle === 'monthly' 
              ? selectedPlan.monthlyPrice 
              : selectedPlan.yearlyPrice}/
            {billingCycle === 'monthly' ? 'mo' : 'yr'}
          </p>
        </div>

        {/* Add-ons Summary */}
        {selectedAddOns.length > 0 && (
          <div className="pt-4 space-y-4">
            {selectedAddOns.map((addonId) => {
              const addon = ADD_ONS.find(a => a.id === addonId);
              if (!addon) return null;
              
              return (
                <div key={addonId} className="flex justify-between items-center">
                  <p className="text-cool-gray">{addon.name}</p>
                  <p className="text-marine-blue">
                    +${billingCycle === 'monthly' 
                      ? addon.monthlyPrice 
                      : addon.yearlyPrice}/
                    {billingCycle === 'monthly' ? 'mo' : 'yr'}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Total */}
      <div className="flex justify-between items-center px-6">
        <p className="text-cool-gray">
          Total (per {billingCycle === 'monthly' ? 'month' : 'year'})
        </p>
        <p className="text-xl font-bold text-purplish-blue">
          ${calculateTotal()}/{billingCycle === 'monthly' ? 'mo' : 'yr'}
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <button
          onClick={() => dispatch(setStep(3))}
          className="text-cool-gray hover:text-marine-blue transition-colors font-medium"
        >
          Go Back
        </button>
        <button
          onClick={handleConfirm}
          className="bg-purplish-blue text-white px-6 py-3 rounded-lg 
            hover:bg-purplish-blue/90 transition-colors duration-200 font-medium"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};