"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__) 
CORS(app)

#configuracion de JWT


app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET")
jwt = JWTManager(app)



# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app.url_map.strict_slashes = False
bcrypt = Bcrypt(app)
# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

@app.route('/signup', methods=['POST'])
def add_new_user():
    body = request.get_json()
    if not body:
        return jsonify({
            "message":"Body is required"
        }),400
    if "email" not in body:
          return jsonify({
            "message":"email is required"
        }),400
    
    user = User.query.filter_by(email=body["email"]).first()
 
    if user is not None:
        return jsonify({
            "message":"Invalid credential"
        }),400 
      
    if "password" not in body:
        return jsonify({
            "message":"password is required"
        }),400   

    if len(body["password"]) < 6:
        return jsonify({
            "message":"password must be at least 6 character"
        }),400  
    
    email=body["email"]
    password = body.get("password")
    is_active = body.get("is_active", True)
    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    user= User(email=email, password=hashed_password, is_active=is_active)

    try:
        db.session.add(user)
        db.session.commit()
        return jsonify({"message": "User was succesfully created"}),201 
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error while creating the user", "error":str(e)}),500
    finally:
        db.session.close()  
    
@app.route("/login", methods=["POST"])
def login():
    body=request.get_json() #chequear si llego algo en body
    if not body:
        return jsonify({"msg": "Body es required"}), 400
    
    email = body.get("email", None)
    password = body.get("password", None)
    
    if not email or not password:
        return jsonify({"msg": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if user is None or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"msg": "Invalid credentials"}), 400

    access_token = create_access_token(identity=email) #dato que sea unico, pudiera ser el id

    return jsonify({"access_token":access_token, "user":user.serialize()})

@app.route("/protected", methods=["GET"])
@jwt_required()  
def pagina_protegida_por_inicio_de_sesion():
   
    current_user_email = get_jwt_identity()
    
    return jsonify(logged_in_as=current_user_email), 200


    

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
