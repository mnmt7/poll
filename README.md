# Real-time Polling Application

A modern, real-time polling application built with React, Node.js, Express, and MongoDB. Users can create polls, vote on them, and see results update in real-time.

## API Endpoints

### Polls

| Method | Endpoint                 | Description             |
| ------ | ------------------------ | ----------------------- |
| GET    | `/api/v1/polls`          | Get all polls           |
| POST   | `/api/v1/polls`          | Create a new poll       |
| GET    | `/api/v1/polls/:id`      | Get a specific poll     |
| PATCH  | `/api/v1/polls/:id/vote` | Vote on a specific poll |
| DELETE | `/api/v1/polls/:id`      | Delete a specific poll  |

## Request & Response Examples

### Create Poll

#### Request

```json
// POST /api/v1/polls
{
  "question": "What's your favorite programming language?",
  "options": ["JavaScript", "Python", "Java", "C++"]
}
```

#### Response

```json
{
  "status": "success",
  "data": {
    "poll": {
      "id": "123abc...",
      "question": "What's your favorite programming language?",
      "options": [
        { "text": "JavaScript", "votes": 0 },
        { "text": "Python", "votes": 0 },
        { "text": "Java", "votes": 0 },
        { "text": "C++", "votes": 0 }
      ],
      "createdAt": "2024-01-01T12:00:00.000Z"
    }
  }
}
```

### Vote on Poll

#### Request

```json
// PATCH /api/v1/polls/:id/vote
{
  "optionId": "123abc..."
}
```

#### Response

```json
{
  "status": "success",
  "data": {
    "poll": {
      // Updated poll object
    }
  }
}
```

## Database Schema

### Poll Schema

```javascript
{
  question: {
    type: String,
    required: [true, 'A poll must have a question'],
    trim: true
  },
  options: [
    {
      text: {
        type: String,
        required: [true, 'An option must have text']
      },
      votes: {
        type: Number,
        default: 0
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```
