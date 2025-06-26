# Message Receiver

A simple message receiver application built with Netlify Functions that accepts POST requests with JSON messages and displays them on a web interface.

## Features

- **POST Endpoint**: `/message` endpoint that accepts JSON messages in the format `{"message": "Hello"}`
- **Message Display**: Web interface to view all received messages
- **Real-time Updates**: Auto-refresh messages every 30 seconds
- **Responsive Design**: Clean, mobile-friendly interface
- **Message History**: Stores all messages with timestamps
- **CORS Support**: Accepts requests from any origin

## API Endpoints

### POST /message
Accepts a JSON message and stores it.

**Request:**
```bash
curl -X POST https://your-site.netlify.app/.netlify/functions/message \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello World!"}'
```

**Response:**
```json
{
  "success": true,
  "message": "Message received successfully",
  "data": {
    "id": 1640995200000,
    "message": "Hello World!",
    "timestamp": "2023-12-31T12:00:00.000Z"
  }
}
```

### GET /get-messages
Retrieves all stored messages.

**Request:**
```bash
curl https://your-site.netlify.app/.netlify/functions/get-messages
```

**Response:**
```json
{
  "success": true,
  "messages": [
    {
      "id": 1640995200000,
      "message": "Hello World!",
      "timestamp": "2023-12-31T12:00:00.000Z"
    }
  ],
  "count": 1
}
```

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start local development server:**
   ```bash
   npm run dev
   ```

3. **Access the application:**
   - Frontend: http://localhost:8888
   - API endpoints: http://localhost:8888/.netlify/functions/

## Deployment

### Deploy to Netlify

1. **Connect your repository to Netlify:**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub/GitLab repository

2. **Build settings:**
   - Build command: `echo 'No build step required'`
   - Publish directory: `.` (root directory)

3. **Deploy:**
   - Netlify will automatically deploy your site
   - Functions will be available at `https://your-site.netlify.app/.netlify/functions/`

### Manual Deploy

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

## Project Structure

```
msgreceiver/
├── index.html              # Frontend interface
├── netlify.toml           # Netlify configuration
├── package.json           # Node.js dependencies
├── netlify/
│   └── functions/
│       ├── message.js     # POST /message endpoint
│       └── get-messages.js # GET /get-messages endpoint
├── data/
│   └── messages.json      # Message storage (created automatically)
├── LICENSE
└── README.md
```

## Usage Examples

### Send a message via curl:
```bash
curl -X POST https://your-site.netlify.app/.netlify/functions/message \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello from API!"}'
```

### Send a message via JavaScript:
```javascript
fetch('/.netlify/functions/message', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ message: 'Hello from JavaScript!' })
})
.then(response => response.json())
.then(data => console.log(data));
```

### Get all messages:
```bash
curl https://your-site.netlify.app/.netlify/functions/get-messages
```

## Technical Details

- **Backend**: Netlify Functions (Node.js)
- **Frontend**: HTML, CSS, JavaScript (vanilla)
- **Storage**: JSON file (persistent across deployments)
- **CORS**: Enabled for all origins
- **Error Handling**: Comprehensive error responses
- **Security**: Input validation and XSS protection

## License

MIT License - see LICENSE file for details.
