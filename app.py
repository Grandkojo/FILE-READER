from flask import Flask, render_template, url_for, request, jsonify, redirect
import os
from collections import Counter
import time
import re

app = Flask(__name__)

def get_most_words(filename, number_of_words):
    with open(filename, 'r',encoding='utf-8') as file:
        text = file.read()

    # Extracting words from file
    words = re.findall(r'\b\w+\b', text.lower())

    #Count word frequency
    words_count = Counter(words)
    most_frequent_words = words_count.most_common(number_of_words)

    return most_frequent_words

@app.route('/get_most_frequent_words' , methods=['POST'])
def get_most_frequent_words():
    filename = request.json.get('file')    
    number_of_words = 100

    start_time = time.time()
    result = get_most_words(filename, number_of_words)
    end_time = time.time()

    runtime = end_time - start_time

    response = {
        'runtime': f"{runtime:.4f} seconds",
        'most_frequent_words': result
    }

    return jsonify(response)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/', methods=['POST'])
def upload():
    message = ""
    # Check if the request contains a file
    if 'file' not in request.files:
        # return 'No file part'
        message += "No file part"
        # return render_template('index.html', message=message)

        # return jsonify(message) 
        # return redirect('/')
    
    file = request.files['file']
    
    # Check if the file is empty
    if file.filename == '':
        # return 'No selected file'
        message += "No selected file"
        # return render_template('index.html', message=message)
        # return jsonify(message) 
        # return redirect('/')

    
    # Save the file to a specific location
    file.save(os.path.join('files', file.filename))
    filename = os.path.join('files', file.filename)
    
    # return 'File uploaded successfully'
    message += "File uploaded successfully"
    # get_most_frequent_words(filename)
    return jsonify(message) 
    # return redirect('/')

    # return render_template('index.html')



if __name__ == "main":
    # app.config['FILES'] = 'files'
    app.run()
