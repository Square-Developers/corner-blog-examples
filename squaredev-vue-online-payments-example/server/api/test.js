function formatPhoneNumber(value) {
  // Regular expression to only allow numerical values
  const phoneNumber = value.replace(/\D/g, "");

  // Insert dashes based on phone number length
  if (phoneNumber.length < 4) return phoneNumber;
  if (phoneNumber.length < 7) {
    return phoneNumber.slice(0, 3) + "-" + phoneNumber.slice(3);
  }
  return (
    phoneNumber.slice(0, 3) +
    "-" +
    phoneNumber.slice(3, 6) +
    "-" +
    phoneNumber.slice(6, 10)
  );
}
