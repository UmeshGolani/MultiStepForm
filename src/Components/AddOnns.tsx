import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { toggleAddOn, setStep } from '../store/formSlice';
import { ADD_ONS } from '../constans';

export const AddOns: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedAddOns, billingCycle } = useAppSelector(state => state.form);

  const handleCheckboxChange = (addonId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAddOn(addonId));
  };

  const handleContainerClick = (addonId: string) => {
    dispatch(toggleAddOn(addonId));
  };

  return (
    <div className="space-y-6">
      {ADD_ONS.map((addon) => (
        <div
          key={addon.id}
          onClick={() => handleContainerClick(addon.id)}
          className={`p-4 border rounded-lg cursor-pointer hover:border-purplish-blue transition-colors
            ${selectedAddOns.includes(addon.id) 
              ? 'border-purplish-blue bg-magnolia' 
              : 'border-light-gray'}`}
        >
          <div className="flex items-center">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={selectedAddOns.includes(addon.id)}
                onChange={(e) => handleCheckboxChange(addon.id, e)}
                className="h-5 w-5 text-purplish-blue focus:ring-purplish-blue border-light-gray rounded 
                  cursor-pointer relative z-10"
              />
            </div>
            <div className="ml-4 flex-grow">
              <h3 className="font-medium text-marine-blue">{addon.name}</h3>
              <p className="text-cool-gray text-sm">{addon.description}</p>
            </div>
            <p className="text-purplish-blue font-medium">
              +${billingCycle === 'monthly' ? addon.monthlyPrice : addon.yearlyPrice}/
              {billingCycle === 'monthly' ? 'mo' : 'yr'}
            </p>
          </div>
        </div>
      ))}

      <div className="flex justify-between pt-6">
        <button
          onClick={() => dispatch(setStep(2))}
          className="text-cool-gray hover:text-marine-blue transition-colors font-medium"
        >
          Go Back
        </button>
        <button
          onClick={() => dispatch(setStep(4))}
          className="bg-marine-blue text-white px-6 py-3 rounded-lg 
            hover:bg-marine-blue/90 transition-colors duration-200 font-medium"
        >
          Next Step
        </button>
      </div>
    </div>
  );
};