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
from pathlib import Path

# Load environment variables
BASE_DIR = Path(__file__).resolve().parent
load_dotenv(os.path.join(BASE_DIR, '.env'))

# Initialize OpenAI API
openai.api_key = os.getenv('OPENAI_API_KEY')

# Initialize Flask app
app = Flask(__name__)

@app.route('/helloworld', methods=['GET'])
def hello_world():
    return "Hello, World Doppelganger's working!", 200

@app.route('/chat', methods=['POST'])
def chat():
    # Get request body
    body = request.get_json()

    # Get username
    username = body['username']

    # Get conversation history
    conversation_history = body['conversation_history']

    # test return response
    return jsonify({
        'chat_response': 'Hello, World!',
    }), 200

    # Get chat response
    chat_response = openai.Completion.create(
        engine='davinci',
        prompt=f'{conversation_history}\nUsername: {username}\nDoppelganger:',
        temperature=0.9,
        max_tokens=150,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0.6,
        stop=['\n', ' Username:', ' Doppelganger:']
    )

    # Return chat response
    return jsonify({
        'chat_response': chat_response['choices'][0]['text'],
    }), 200

# Example usage for chat rout in js on the clientside:
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

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)

