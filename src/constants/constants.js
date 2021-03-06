export const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

export const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}
export const LOGIN_ERROR_MESSAGES = {
  EMAIL_EXISTS: 'Email already exists. Please, try again.',
  EMAIL_NOT_FOUND: 'Email not found. Please, try again.',
  INVALID_PASSWORD: 'Invalid password. Please, try again.'
};

export const contactForm = {
  name: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Your name'
    },
    value: '',
    validation: {
      required: true,
      minLength: 5
    },
    valid: false,
    touched: false
  },
  street: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Your street'
    },
    value: '',
    validation: {
      required: true
    },
    valid: false,
    touched: false
  },
  zipCode: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Your ZIP code'
    },
    value: '',
    validation: {
      required: true,
      minLength: 5,
      maxLength: 5
    },
    valid: false,
    touched: false
  },
  country: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Your country'
    },
    value: '',
    validation: {
      required: true
    },
    valid: false,
    touched: false
  },
  email: {
    elementType: 'input',
    elementConfig: {
      type: 'email',
      placeholder: 'Your email'
    },
    value: '',
    validation: {
      required: true
    },
    valid: false,
    touched: false
  },
  deliveryMethod: {
    elementType: 'select',
    elementConfig: {
      options: [
        { value: 'fastest', displayValue: 'Fastest' },
        { value: 'cheapest', displayValue: 'Cheapest' }
      ],
    },
    value: 'cheapest',
    validation: {},
    valid: true
  }
};

export const registerForm = {
  email: {
    elementType: 'input',
    elementConfig: {
      type: 'email',
      placeholder: 'Email'
    },
    value: '',
    validation: {
      required: true
    },
    valid: false,
    touched: false
  },
  password: {
    elementType: 'input',
    elementConfig: {
      type: 'password',
      placeholder: 'Password'
    },
    value: '',
    validation: {
      required: true,
      minLength: 6
    },
    valid: false,
    touched: false
  },
};