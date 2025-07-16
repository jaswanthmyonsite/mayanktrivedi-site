export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, organization, category, subject, message } = req.body;

  // Validate input
  if (!name || !email || !category || !subject || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Here you would typically:
    // 1. Send email notification
    // 2. Save to database
    // 3. Add to CRM
    // 4. Send confirmation email to user

    // For now, we'll just log and return success
    console.log('Contact form submission:', {
      name,
      email,
      organization,
      category,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}
