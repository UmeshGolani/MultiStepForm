const ThankYou = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto px-6 py-16">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-8">
        <img src='/images/icon-thank-you.svg' className="w-16 h-16 text-white" />
      </div>

      <h2 className="text-3xl font-bold text-marine-blue mb-4">
        Thank you!
      </h2>

      <p className="text-cool-gray leading-relaxed">
        Thanks for confirming your subscription! We hope you have fun using our 
        platform. If you ever need support, please feel free to email us at{' '}
        <span className="text-marine-blue">support@loremgaming.com</span>.
      </p>
    </div>
  );
};

export default ThankYou;