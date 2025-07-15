export function validateCheckoutForm({ email, name, surname, address }) {
  const errors = {};

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    errors.email = 'Please enter a valid email';
  }

  if (!name.trim()) {
    errors.name = 'Name is required*';
  }

  if (!surname.trim()) {
    errors.surname = 'Surname is required*';
  }

  if (!address.trim()) {
    errors.address = 'Address is required*';
  }

  return errors;
}
