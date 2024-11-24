import os, sys
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.dirname(CURRENT_DIR))

import json

from flask import Blueprint, request, jsonify
from Service.dbService import dbService
from Service.quakeService import quakeService

db = dbService()
db_outPOST = db.conection()

quake_blueprint = Blueprint('quake', __name__)
quake_service = quakeService()

news_blueprint = Blueprint('news', __name__)
news_service = db_outPOST[1]

user_blueprint = Blueprint('user', __name__)
user_service = db_outPOST[0]

@quake_blueprint.route('/new', methods=['GET'])
def newQuake():
    try:
        quake = quake_service.createZero()
        return quake
    except Exception as e:
        return jsonify({f'error: {e}'}), 404

@quake_blueprint.route('/update', methods=['POST'])
def updateQuake():
    try:
        data = request.json
        quake = quake_service.update(data.get('starttime'))
        return quake
    except Exception as e:
        return jsonify({f'error: {e}'}), 404

@user_blueprint.route('/create', methods=['POST'])
def createUsr():
    data = request.json
    name = data.get('name')
    lname = data.get('lname')
    email = data.get('email')
    password = data.get('password')
    phone = data.get('phone')
    birth = data.get('birth')
    role = data.get('role')
    photo = data.get('photo')
    
    print(data)

    if not name or not lname or not email or not password or not phone or not birth or not photo:
        return jsonify({'error': 'Faltan campos'}), 400

    user = user_service.create(name,lname,email,password,phone,birth,role,photo)
    if user != "Correcto":
        return jsonify(f'error: {user}'), 400
    else:
        return jsonify("Usuario agregado!"), 201

@user_blueprint.route('/select', methods=['POST'])
def selectUsr():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    try:
        user = user_service.select(email, password)
        if user != False:
            return user
        else:
            return jsonify({'error': 'Contraseña incorrecta'}), 400
    except Exception as e:
        return jsonify({f'error: {e}'}), 404

@user_blueprint.route('/select/all', methods=['GET'])
def selectAllUsr():
    try:
        user = user_service.selectALL()
        if user:
            return jsonify(user), 200
        else:
            return jsonify({'error': 'No user found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@user_blueprint.route('/select/id', methods=['POST'])
def selectUsrID():
    data = request.json
    id_usuario = data.get('id_usuario')
    try:
        user = user_service.selectId(id_usuario)
        if user != False:
            return user
        else:
            return jsonify({'error': 'Contraseña incorrecta'}), 400
    except Exception as e:
        return jsonify({f'error: {e}'}), 404

@user_blueprint.route('/update/name', methods=['POST'])
def updateUName():
    data = request.json
    email = data.get('email')
    name = data.get('name')

    if not email or not name:
        return jsonify({'error': 'Missing required fields'}), 400
    
    var = user_service.update_name(email, name)

    if var == "Correcto":
        return jsonify("Usuario actualizado!")
    else:
        return jsonify({f'error: {var}'}), 404

@user_blueprint.route('/update/birth', methods=['POST'])
def updateUBirth():
    data = request.json
    email = data.get('email')
    birth = data.get('birth')

    if not email or not birth:
        return jsonify({'error': 'Missing required fields'}), 400
    
    var = user_service.update_birth(email, birth)

    if var == "Correcto":
        return jsonify("Empleado actualizado!")
    else:
        return jsonify({f'error: {var}'}), 404

@user_blueprint.route('/update/pwd', methods=['POST'])
def updateUPwd():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Missing required fields'}), 400
    
    var = user_service.update_password(email, password)

    if var == "Correcto":
        return jsonify("Empleado actualizado!")
    else:
        return jsonify({f'error: {var}'}), 404

@user_blueprint.route('/update/photo', methods=['POST'])
def updateUPhoto():
    data = request.json
    email = data.get('email')
    photo = data.get('photo')

    if not email or not photo:
        return jsonify({'error': 'Missing required fields'}), 400
    
    var = user_service.update_photo(email, photo)

    if var == "Correcto":
        return jsonify("usuario actualizado!")
    else:
        return jsonify({f'error: {var}'}), 404

@user_blueprint.route('/update/last', methods=['POST'])
def updateLlog():
    data = request.json
    email = data.get('email')
    lastLog = data.get('lastLog')

    if not email or not lastLog:
        return jsonify({'error': 'Missing required fields'}), 400
    
    var = user_service.update_lastLog(email, lastLog)

    if var == "Correcto":
        return jsonify("usuario actualizado!")
    else:
        return jsonify({f'error: {var}'}), 404


@user_blueprint.route('/delete', methods=['POST'])
def delete_user():
    data = request.json
    email = data.get('email')
    
    result = user_service.delete(email)
    if result == "Correcto":
        return jsonify({"message": "Borrado Correcto!"}), 200
    else:
        return jsonify({"error": result}), 404

@news_blueprint.route('/create', methods=['POST'])
def createNews():
    data = request.json
    title = data.get('title')
    content = data.get('content')
    date = data.get('date')
    userId = data.get('userId')

    if not title or not content or not date or not userId:
        return jsonify({'error': 'Faltan campos'}), 400

    new = news_service.create(title,content,date,userId)
    if new != "Correcto":
        return jsonify(f'error: {new}'), 400
    else:
        return jsonify("Noticia Agregada!"), 201

@news_blueprint.route('/select', methods=['GET'])
def selectAll():
    try:
        news = news_service.select()
        if news:
            return jsonify(news), 200
        else:
            return jsonify({'error': 'No news found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@news_blueprint.route('/update', methods=['POST'])
def updateNews():
    data = request.json
    ide = data.get('ide')
    title = data.get('title')
    content = data.get('content')
    date = data.get('date')

    if not ide or not title or not content or not date:
        return jsonify({'error': 'Missing required fields'}), 400
    
    var = news_service.update(ide,title,content,date)

    if var == "Correcto":
        return jsonify("Noticia actualizada!"), 200
    else:
        return jsonify({f'error: {var}'}), 404

@news_blueprint.route('/delete', methods=['POST'])
def deleteNews():
    data = request.json
    ide = data.get('ide')
    if not ide:
        return jsonify({'error': 'ID not provided'}), 400
    var = news_service.delete(ide)
    if var == "Correcto":
        return jsonify("Borrado Correcto!"), 200
    else:
        return jsonify({'error': var}), 404
    
    