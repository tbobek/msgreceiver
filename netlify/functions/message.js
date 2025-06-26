const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Parse the request body
    const { message } = JSON.parse(event.body);

    if (!message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message is required' })
      };
    }

    // Create message object with timestamp
    const newMessage = {
      id: Date.now(),
      message: message,
      timestamp: new Date().toISOString()
    };

    // Read existing messages or create empty array
    const messagesPath = path.join(process.cwd(), 'data', 'messages.json');
    let messages = [];

    try {
      // Create data directory if it doesn't exist
      const dataDir = path.dirname(messagesPath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      // Read existing messages if file exists
      if (fs.existsSync(messagesPath)) {
        const data = fs.readFileSync(messagesPath, 'utf8');
        messages = JSON.parse(data);
      }
    } catch (readError) {
      console.log('No existing messages file, starting fresh');
      messages = [];
    }

    // Add new message
    messages.push(newMessage);

    // Write updated messages back to file
    fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Message received successfully',
        data: newMessage
      })
    };

  } catch (error) {
    console.error('Error processing message:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
