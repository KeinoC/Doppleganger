# Chat Input: 
# {
#   "username": USERNAME,
#   "conversation_history": CONVERSATION_HISTORY,
# }
#
# Chat Output:
# {
#   "chat_response": RESPONSE,
# }
# 
# Auth Input:
# {
#   "username": USERNAME,
#   "PIN": PIN,
# }
#
# User Info: (to be stored in MongoDB)
# {
#   "username": USERNAME,
#   "first_name": FIRST_NAME,
#   "last_name": LAST_NAME,
#   "summary": SUMMARY,
#   "skills": SKILLS,
#   "experience": EXPERIENCE,
#   "education": EDUCATION,
#   "projects": PROJECTS,
#   "contact_info": [
#     {
#       "type": TYPE,
#       "value": VALUE,
#     },
#   ],
#   "links": [
#     {
#       "name": NAME,
#       "url": URL,
#     },
#   ],
#   "resume": RESUME,
#   "questions": [
#     {
#       "question_id": QUESTION_ID,
#       "question": QUESTION,
#       "answer": ANSWER,
#     },
#   ],
#   "assistant_name": ASSISTANT_NAME,
# }

from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import openai
import requests
import json
from pathlib import Path

# Load environment variables
BASE_DIR = Path(__file__).resolve().parent
load_dotenv(os.path.join(BASE_DIR, '.env'))

# Initialize OpenAI API
openai.api_key = os.getenv('OPENAI_API_KEY')

# MongoDB Data API constants
MONGODB_API_BASE = 'https://us-east-2.aws.data.mongodb-api.com'
MONGODB_API_PATH = '/app/data-duhus/endpoint/data/v1/'
MONGODB_API_URL = MONGODB_API_BASE + MONGODB_API_PATH
MONGODB_API_HEADERS = {
    'Content-Type': 'application/json',
    'Api-Key': os.getenv('MONGODB_API_PUBLIC'),
    'Api-Token': os.getenv('MONGODB_API_PRIVATE')
}

# Database and collection you are working with
DATABASE = os.getenv('MONGODB_API_DATABASE')
COLLECTION = os.getenv('MONGODB_API_COLLECTION')

# Initialize Flask app
app = Flask(__name__)

# Configure flask_cors for localhost:3000 - 3005
CORS(app, resources={r'/*': {'origins': [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
    'http://localhost:3004',
    'http://localhost:3005'
]}})

@app.route('/helloworld', methods=['GET'])
def hello_world():
    return "Hello, World Doppelganger's working!", 200

@app.route('/user', methods=['POST'])
def create_user():
    user_data = request.json

    # Build the payload for MongoDB
    payload = json.dumps({
        "collection": COLLECTION,
        "database": DATABASE,
        "dataSource": "ServerlessInstance0",
        "document": user_data
    })

    try:
        response = requests.post(
            MONGODB_API_URL,
            headers=MONGODB_API_HEADERS,
            data=payload
        )

        response.raise_for_status()

        if response.json():
            return response.json(), response.status_code
        else:
            return {}, response.status_code
    except Exception as e:
        return {"error": str(e)}, 500



@app.route('/user/<username>', methods=['PATCH'])
def update_user(username):
    user_updates = request.json

    response = requests.patch(
        f'{MONGODB_API_URL}/{DATABASE}/{COLLECTION}/{username}',
        headers=MONGODB_API_HEADERS,
        data=json.dumps(user_updates)
    )

    return response.json(), response.status_code

@app.route('/chat', methods=['POST'])
def chat():
    # Get request body
    body = request.get_json()

    # Get username
    username = body['username']

    # Get conversation history
    conversation_history = body['conversation_history']

    # convert conversation history to proper format
    # From [{'user_message': 'How are you?'}, {'system_message': 'I am good, how are you?'}]
    # To [{"role": "user", "content": "How are you?"}, {"role": "system", "content": "I am good, how are you?"}]

    with open('conversation_history.json', 'w') as f:
        json.dump(body, f)

    if len(conversation_history) == 0:
        return jsonify({"error": "conversation_history cannot be empty"}), 400

    for message in conversation_history:
        if 'user_message' in message:
            message['role'] = 'user'
            message['content'] = message['user_message']
            del message['user_message']
        elif 'system_message' in message:
            message['role'] = 'system'
            message['content'] = message['system_message']
            del message['system_message']

    # Get chat response
    chat_response = openai.ChatCompletion.create(
        model='gpt-3.5-turbo',
        messages=conversation_history,
    )

    # Return chat response
    return jsonify({
        'system_message': chat_response['choices'][0]['message']['content'],
    }), 200

# Example usage for chat route in js on the clientside:
# const response = await fetch('https://api.testapp365.com/chat', {
#   method: 'POST',
#   headers: {
#     'Content-Type': 'application/json',
#   },
#   body: JSON.stringify({
#     username: 'testuser',
#     conversation_history: [
#       {'user_message: 'How are you?'},
#       {'system_message': 'I am good, how are you?'},
#       {'user_message': 'Doing well. Can you tell me about yourself?'},
#     ]
#  }),
# });
# const data = await response.json();
# console.log(data.chat_response);

@app.errorhandler(500)
def handle_500(e):
    return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)

