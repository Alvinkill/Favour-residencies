/* EmailJS setup: replace the three placeholder values with your EmailJS details. */
const EMAILJS_PUBLIC_KEY = 'q32D5El6HwC7qcBjB';
const EMAILJS_SERVICE_ID = 'service_ikurd35';
const EMAILJS_TEMPLATE_ID = 'template_sd5q06o';
const EMAILJS_AUTO_REPLY_TEMPLATE_ID = 'template_oegeqbl';

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

function sendBookingEmail(data) {
  const templateParams = {
    full_name: data.get('name'),
    phone: data.get('phone'),
    guest_email: data.get('email'),
    room_type: data.get('roomType'),
    arrival_date: data.get('arrival'),
    departure_date: data.get('departure'),
    number_of_guests: data.get('guests'),
    other_requests: data.get('requests') || 'None'
  };

  return emailjs
    .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(() => emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_AUTO_REPLY_TEMPLATE_ID, templateParams));
}
