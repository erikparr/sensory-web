import { Resend } from 'resend';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  const { name, email, message } = body || {};

  if (!name || !email || !message) {
    throw createError({ statusCode: 400, message: 'All fields are required.' });
  }

  const resend = new Resend(config.resendApiKey);

  try {
    await resend.emails.send({
      from: 'SENSORY <onboarding@resend.dev>',
      to: config.contactEmail,
      subject: `New inquiry from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return { success: true };
  } catch (e: any) {
    throw createError({ statusCode: 500, message: 'Failed to send message.' });
  }
});
