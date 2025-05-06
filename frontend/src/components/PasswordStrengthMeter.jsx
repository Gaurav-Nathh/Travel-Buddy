import { Check, X } from "lucide-react";

const PasswordCriteria = ({ password }) => {
  const criteria = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="mt-3">
      {criteria.map((item) => (
        <div key={item.label} className="flex items-center space-y-1">
          {item.met ? (
            <Check size={13} color={"#6F85DF"} />
          ) : (
            <X size={13} className="mt-1" />
          )}
          <span
            className={`ml-3 text-base ${
              item.met ? "text-blue_main" : "text-grey-500"
            }`}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export const getPasswordStrength = ({ password }) => {
  console.log(password);
  let strength = 0;
  if (password.length >= 6) strength += 1;
  if (password.match(/[a-z]/) && pass.match(/[A-Z]/)) strength += 1;
  if (password.match(/\d/)) strength += 1;
  if (password.match(/[^a-zA-Z\d]/)) strength += 1;
  return strength;
};

export const PasswordStrengthMeter = ({ password }) => {
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength += 1;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength += 1;
    if (pass.match(/\d/)) strength += 1;
    if (pass.match(/[^a-zA-Z\d]/)) strength += 1;
    return strength;
  };

  const getStrengthText = (strength) => {
    if (strength === 0) return "Very Weak";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    return "Strong";
  };
  const strength = getStrength(password);

  return (
    <div className="mt-7 mx-10">
      <div className="flex justify-between text-xs">
        <span className="text-lg font-medium">Password strength</span>
        <span className="text-lg font-medium text-blue_main">
          {getStrengthText(strength)}
        </span>
      </div>
      <div className="flex space-x-1">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`mt-1 h-[0.3rem] w-1/4 rounded-full
              ${index < strength ? "bg-blue_main" : "bg-gray-400"}  
              `}
          />
        ))}
      </div>
      <PasswordCriteria password={password} />
    </div>
  );
};
