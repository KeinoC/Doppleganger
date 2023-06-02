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
import json
import requests
from pathlib import Path

# Load environment variables
BASE_DIR = Path(__file__).resolve().parent
load_dotenv(os.path.join(BASE_DIR, '.env'))

# Initialize Flask app
app = Flask(__name__)

@app.route('/helloworld', methods=['GET'])
def hello_world():
    return "Hello, World Doppelganger's working!", 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)

