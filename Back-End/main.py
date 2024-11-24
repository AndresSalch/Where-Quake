from flask import Flask
from flask_cors import CORS
from Controller.apiController import quake_blueprint, user_blueprint, news_blueprint


app = Flask(__name__)
app.json.sort_keys = False
CORS(app)

app.register_blueprint(quake_blueprint, url_prefix='/quake')
app.register_blueprint(user_blueprint, url_prefix='/user')
app.register_blueprint(news_blueprint, url_prefix='/news')


if __name__ == '__main__':
    app.run(port=5000)