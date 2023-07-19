from flask import Flask, request, redirect, url_for, flash, session, jsonify, send_from_directory
import os
import random

from ChatAI import cv_chat

app = Flask(__name__, static_folder='./build', static_url_path='/')
app.config['JSONIFY_MIMETYPE'] = 'application/json'
app.secret_key = os.urandom(24)


# Create a cursor object
@app.route('/api/set_timezone', methods=['POST'])
def set_timezone():
    print('Received a request.')
    data = request.get_json()
    print('Data:', data)
    session['timezone'] = data['timezone']
    print('Timezone set:', session['timezone'])
    return {'message': 'Timezone set successfully.'}, 200


@app.route('/api/aichat', methods=['POST'])
def chat():
    chat = request.get_json()
    user_input = chat.get('userInput')
    response_message = cv_chat(user_input)

    return jsonify({'message': response_message}), 200

@app.route('/api/funfact', methods=['POST'])
def ffchat():
    response_string = [
        "I have a dog named Moze, she is named after Dwight's cousin from The Office.",
        "I grew up in Outback South Australia.",
        "I got married earlier this year.",
        "When I was five I broke my leg, just a few days after breaking my thumb",
        "My love for data and numbers started in AFL and Cricket.",
        "During COVID I created a neural network model to predict daily fantasy AFL rankings. It went 'ok'.",
        "This website was originally a test for a calendar chatbot.",
        "I tutored Business Statistics at University. This prompted my further studies in Data Science.",
        "My favourite pastime is playing the video game Teamfight Tactics.",
        "I have lived in SA, QLD, NSW and Vic.",
        "This website is an original idea all coded by me (with some help from GPT).",
        "My favourite food is a chicken parmy or a burrito bowl.",
        "Adelaide Crows are my favourite football team."
    ]

    # Retrieve the shuffled fun facts list from the session or create a new one if not exists
    shuffled_facts = session.get('shuffled_facts')
    if not shuffled_facts:
        shuffled_facts = response_string.copy()
        random.shuffle(shuffled_facts)
        session['shuffled_facts'] = shuffled_facts

    # Pop the last fun fact from the shuffled list and store the updated list in the session
    response_message = shuffled_facts.pop()
    session['shuffled_facts'] = shuffled_facts

    # If all fun facts have been sent, return a special message
    if not shuffled_facts:
        response_message = "Thank you for learning a bit more about me, that was all of my facts. It will now cycle back through them."

    return jsonify({'message': response_message}), 200

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    if os.path.isfile(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        response = app.send_static_file('index.html')
        response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '0'
        return response

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))
