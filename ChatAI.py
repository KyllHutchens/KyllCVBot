import requests
import openai
import os
from dotenv import load_dotenv

load_dotenv()
def cv_chat(user_input):
    openai.api_key = os.getenv("openai.api_key")

    my_info = "My name is Kyll Hutchens (pronounced Kyle). I live in Croydon, Melbourne and my phone number is 0408 992 374"\
    "I am changing jobs to broaden my horizons in an area where my data analysis can influence business decisions, I also want to expand my industry knowledge on implementation of analysis/models and visualisations as well as gain more experience in large scale SQL"\
    "I am a fast learner, adaptable and love utilising the newest tech. I am proactive, especially when it comes to optimising business processes."\
    "In my current role, I have worked mostly solo, providing insights into OHS datasets through our PowerBI dashboard suite, with consultation to the external safety team"\
    "In my past role, I worked within more team orientated enviornment team, building front end visualisations for the teams econometric models"\
    "My first job was in February 2018 with the NSW State Government as an Analyst with a focus on Labour market economics." \
    "Some notable projects I have worked on are: Extensive storytelling dashboard after the 2019/20 bushfires, outlining how we approached it from a safety perspective and what the impacts were" \
    "Or how I created connected to external providers incident database to provide live up to date data to safety staff on field incidents" \
    "Another project was when I created a bot to put thousands of COVID reports into our external providers database via selenium webscraping (as we dont have access to backend)" \
    "Outside of work I am constantly playing with data, I have built projects from creating calendar appointments via email, to creating NN and logistic regression models for fantasy AFL"\
    "In April 2019 I started my second job when I moved to Melbourne to work for Deparmentment of Enegry, Environment and Climate Action. This is my currennt job."\
    "I have completed the following degrees: Masters in Data Science at James Cook University completed in 2020, Bachelor of Commerce, Finance Economics major completed in 2017 at Griffith University"\
    "I went to primary and high school in South Australia"\
    "My Data Analysis/Science coding tool of choice is Python. That is what the backend of this website is written in"\
    "I also am proficient in R, with good PostgreSQL knowledge from personal projects and university."\
    "The same goes for Git knowledge, which I have aquired from personal projects"\
    "I have significant knowledge in PowerBI including some DAX knowledge and have used it for several years now"\
    "I also have knowledge in Tableau as it was the departments BI tool of choice"\
    "In my spare time I enjoy watching sports, sports analytics, video games, going for walks and eating good food!"\
    "It was a pleasure making this bot"

    conversation = [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user",
             "content": "You have access to details about my life as Kyll Hutchens and my CV/Resume. When a user asks questions about me and my resume you will only answer using the info provided"},
            {"role": "assistant",
             "content": "Understood. I'll provide information and assistance based on the information provided about your life. ONLY Discuss information on my resume and life. "},
            {"role": "user", "content": my_info},
            {"role": "assistant", "content": "Thankyou for providing information on your life and CV, if anyone asks anything not related to Kyll and his life I will respond with 'That is not relevant to Kyll's Application'"},
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