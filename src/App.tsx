import { Provider } from 'react-redux';
import { AddOns } from './Components/AddOnns';
import { PlanSelection } from './Components/PlanSelection';
import { Summary } from './Components/Summary';
import ThankYou from './Components/Thankyou';
import { UserInfoForm } from './Components/UserInfoForm';
import { useAppSelector } from './hooks/useAppDispatch';
import { store } from './store/store';

const STEPS = [
  { number: 1, title: 'YOUR INFO' },
  { number: 2, title: 'SELECT PLAN' },
  { number: 3, title: 'ADD-ONS' },
  { number: 4, title: 'SUMMARY' }
];

const MainContent = () => {
  const currentStep = useAppSelector(state => state.form.currentStep);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="w-full max-w-lg">
            <h2 className="text-2xl font-bold text-marine-blue mb-2">Personal info</h2>
            <p className="text-cool-gray mb-6">Please provide your name, email address, and phone number.</p>
            <UserInfoForm />
          </div>
        );
      case 2:
        return (
          <div className="w-full max-w-lg">
            <h2 className="text-2xl font-bold text-marine-blue mb-2">Select your plan</h2>
            <p className="text-cool-gray mb-6">You have the option of monthly or yearly billing.</p>
            <PlanSelection />
          </div>
        );
      case 3:
        return (
          <div className="w-full max-w-lg">
            <h2 className="text-2xl font-bold text-marine-blue mb-2">Pick add-ons</h2>
            <p className="text-cool-gray mb-6">Add-ons help enhance your gaming experience.</p>
            <AddOns />
          </div>
        );
      case 4:
        return (
          <div className="w-full max-w-lg">
            <h2 className="text-2xl font-bold text-marine-blue mb-2">Finishing up</h2>
            <p className="text-cool-gray mb-6">Double-check everything looks OK before confirming.</p>
            <Summary />
          </div>
        );
      case 5:
        return <ThankYou />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-magnolia md:flex md:items-center md:justify-center md:p-4">
      <div className="w-full max-w-4xl bg-white md:rounded-xl md:shadow-lg md:p-4 min-h-screen md:min-h-0">
        <div className="flex flex-col md:flex-row md:gap-8 relative">
          {/* Mobile Steps Bar */}
          <div className="md:hidden w-full h-40 bg-purplish-blue bg-[url('/images/bg-sidebar-mobile.svg')] bg-cover bg-center bg-no-repeat">
            <div className="flex justify-center gap-4 pt-8">
              {STEPS.map((step) => (
                <div 
                  key={step.number}
                  className={`w-9 h-9 rounded-full flex items-center justify-center border-2 
                    ${currentStep === step.number 
                      ? 'bg-light-blue border-light-blue text-marine-blue font-medium' 
                      : 'border-white text-white'}`}
                >
                  {step.number}
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden md:block md:w-72 rounded-lg overflow-hidden">
            <div className="h-full w-full bg-purplish-blue rounded-lg relative bg-[url('/images/bg-sidebar-desktop.svg')] bg-cover bg-center bg-no-repeat md:min-h-[500px]">
              <div className="relative z-10 p-8 space-y-6">
                {STEPS.map((step) => (
                  <div key={step.number} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                      ${currentStep === step.number 
                        ? 'bg-light-blue border-light-blue text-marine-blue' 
                        : 'border-white text-white'}`}>
                      {step.number}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-pastel-blue text-xs">STEP {step.number}</span>
                      <span className="text-white font-medium">{step.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 px-4 md:px-8 py-8">
            <div className="max-w-lg mx-auto md:mx-0 -mt-24 md:mt-0 bg-white rounded-lg p-6 md:p-0 shadow-lg md:shadow-none">
              {renderStep()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <MainContent />
    </Provider>
  );
};

export default App;