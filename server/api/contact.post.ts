import { Resend } from 'resend';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  const { name, email, message } = body || {};

  if (!name || !email || !message) {
    throw createError({ statusCode: 400, message: 'All fields are required.' });
  }

  const resend = new Resend(config.resendApiKey);

  const { data, error } = await resend.emails.send({
    from: 'SENSORY <noreply@sensory.build>',
    to: config.contactEmail,
    subject: `New inquiry from ${name}`,
    replyTo: email,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  if (error) {
    throw createError({ statusCode: 500, message: error.message });
  }

  return { success: true };
});
