const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
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

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Read messages from file
    const messagesPath = path.join(process.cwd(), 'data', 'messages.json');
    let messages = [];

    try {
      if (fs.existsSync(messagesPath)) {
        const data = fs.readFileSync(messagesPath, 'utf8');
        messages = JSON.parse(data);
      }
    } catch (readError) {
      console.log('No messages file found, returning empty array');
      messages = [];
    }

    // Sort messages by timestamp (newest first)
    messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true,
        messages: messages,
        count: messages.length
      })
    };

  } catch (error) {
    console.error('Error retrieving messages:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
