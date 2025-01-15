// Common email typos and their corrections
const commonTypos: { [key: string]: string } = {
  'gmail.con': 'gmail.com',
  'gmail.co': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gamil.com': 'gmail.com',
  'gnail.com': 'gmail.com',
  'gmail.comm': 'gmail.com',
  'gmail.om': 'gmail.com',
  'hotmail.con': 'hotmail.com',
  'hotmail.co': 'hotmail.com',
  'hotmal.com': 'hotmail.com',
  'yahoo.con': 'yahoo.com',
  'yahoo.co': 'yahoo.com',
  'yaho.com': 'yahoo.com',
  'outloo.com': 'outlook.com',
  'outlook.con': 'outlook.com'
};

// List of disposable email domains
const disposableDomains = [
  'tempmail.com',
  'temp-mail.org',
  'guerrillamail.com',
  'disposablemail.com',
  'mailinator.com',
  'temporary-mail.net',
  '10minutemail.com',
  'throwawaymail.com',
  'yopmail.com',
  'tempmail.net'
];

export interface EmailValidationResult {
  isValid: boolean;
  correctedEmail?: string;
  error?: string;
}

export function validateEmail(email: string): EmailValidationResult {
  // Basic format validation
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      error: 'Please enter a valid email address'
    };
  }

  // Split email into local part and domain
  const [localPart, domain] = email.toLowerCase().split('@');

  // Check for disposable email domains
  if (disposableDomains.includes(domain)) {
    return {
      isValid: false,
      error: 'Please use a non-disposable email address'
    };
  }

  // Check for common typos
  const correctedDomain = commonTypos[domain];
  if (correctedDomain) {
    const correctedEmail = `${localPart}@${correctedDomain}`;
    return {
      isValid: true,
      correctedEmail,
      error: `Did you mean ${correctedEmail}?`
    };
  }

  // Additional validations
  if (localPart.length < 2) {
    return {
      isValid: false,
      error: 'Email username is too short'
    };
  }

  if (email.includes('..')) {
    return {
      isValid: false,
      error: 'Email cannot contain consecutive dots'
    };
  }

  if (email.length > 254) {
    return {
      isValid: false,
      error: 'Email address is too long'
    };
  }

  // All validations passed
  return {
    isValid: true
  };
}
