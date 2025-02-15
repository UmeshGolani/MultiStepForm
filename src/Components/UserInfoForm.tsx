import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { setUserInfo, setStep } from '../store/formSlice';

const userInfoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[\d\s-]{10,}$/, 'Invalid phone number')
});

type UserInfoInputs = z.infer<typeof userInfoSchema>;

export const UserInfoForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(state => state.form.userInfo);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserInfoInputs>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: userInfo
  });

  const onSubmit = (data: UserInfoInputs) => {
    dispatch(setUserInfo(data));
    dispatch(setStep(2));
  };

  const inputClasses = `mt-1 block w-full rounded-md border-light-gray shadow-sm 
    focus:border-purplish-blue focus:ring-purplish-blue
    placeholder:text-cool-gray text-marine-blue focus:placeholder-transparent px-2`;

  const labelClasses = "block text-sm font-medium text-marine-blue";
  const errorClasses = "mt-1 text-sm text-strawberry-red";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className={labelClasses}>
          Name
        </label>
        <input
          {...register('name')}
          className={inputClasses}
          placeholder="e.g. Lorem Gaming"
        />
        {errors.name && (
          <p className={errorClasses}>{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className={labelClasses}>
          Email Address
        </label>
        <input
          {...register('email')}
          className={inputClasses}
          placeholder="e.g. loremgaming@lorem.com"
        />
        {errors.email && (
          <p className={errorClasses}>{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className={labelClasses}>
          Phone Number
        </label>
        <input
          {...register('phone')}
          className={inputClasses}
          placeholder="e.g. +91 9999999999"
        />
        {errors.phone && (
          <p className={errorClasses}>{errors.phone.message}</p>
        )}
      </div>

      <div className="flex justify-between md:justify-end">
        <button
          type="submit"
          className="ml-auto bg-marine-blue text-white px-6 py-3 rounded-md 
            hover:bg-marine-blue/90 transition-colors duration-200"
        >
          Next Step
        </button>
      </div>
    </form>
  );
};