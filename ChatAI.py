import requests
import openai
import os
from dotenv import load_dotenv

load_dotenv()
def cv_chat(user_input):
    openai.api_key = os.getenv("openai.api_key")

    my_info = "My name is Kyll Hutchens I live in Croydon, Melbourne and my phone number is 0408 992 374"\
    "My first job was in February 2018 with the NSW State Government as an Analyst with a focus on Labour market economics." \
            "In April 2019 I started my second job when I moved to Melbourne to work for Deparmentment of Enegry, Environment and Climate Action. This is my currennt job."\
    "I have completed the following degrees: Masters in Data Science from James Cook University completed in 2020, Bachelor of Commerce, Finance Economics major completed in 2017"\
    "My Data Analysis/Science coding tool of choice is Python. That is what the backend of this website is written in"\
    "I also am proficient in R, with good SQL knowledge from personal projects and university."\
    "The same goes for Git knowledge, which I have aquired from personal projects"\
    "I have significant knowledge in PowerBI including some DAX knowledge and have used it for several years now"\
    "I also have knowledge in Tableau as it was the departments BI tool of choice"

    conversation = [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user",
             "content": "You have access to details about my life as Kyll Hutchens and my CV/Resume. When a user asks questions about me and my resume you will only answer using the info provided"},
            {"role": "assistant",
             "content": "Understood. I'll provide information and assistance based on the information provided about your life."},
            {"role": "user", "content": my_info},
            {"role": "assistant", "content": "Thankyou for providing information on your life and CV"},
            {"role": "user",
             "content": "Keep your responses concise and to the point. Do not provide any additional reasoning or ask follow-up questions."},
            {"role": "user", "content": user_input},
        ]

    response = openai.ChatCompletion.create(
    model = "gpt-3.5-turbo",
    messages = conversation,
    max_tokens = 1000,
    )
    print("A: ", response['choices'][0]['message']['content'])

    # Return the message content
    return response['choices'][0]['message']['content']