from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText

app = Flask(__name__)
CORS(app)  # Allows cross-origin requests

# Replace with your Gmail and App Password
GMAIL_USER = 'ananthsai003@gmail.com'
GMAIL_PASSWORD = 'bpbi pfnn qero myxc'  # Use Gmail App Password

@app.route('/send_email', methods=['POST'])
def send_email():
    data = request.form
    name = data.get('name')
    sender_email = data.get('email')
    message = data.get('message')

    # Email content
    body = f"Name: {name}\nEmail: {sender_email}\nMessage:\n{message}"
    msg = MIMEText(body)
    msg['Subject'] = 'New Message from Portfolio Website'
    msg['From'] = GMAIL_USER
    msg['To'] = GMAIL_USER

    try:
        # Connect to Gmail SMTP and send email
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.login(GMAIL_USER, GMAIL_PASSWORD)
        server.send_message(msg)
        server.quit()
        return jsonify({'status': 'success', 'message': 'Email sent successfully!'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
