import datetime
import os
import re
 
from flask import Flask, Response, request
from flask_mongoengine import MongoEngine
from flask import Flask, jsonify, request, json 
from flask_pymongo import PyMongo 
from bson.objectid import ObjectId 
import datetime 
import uuid
from flask_bcrypt import Bcrypt 
from flask_cors import CORS
from flask_jwt_extended import JWTManager 
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity,jwt_required




app = Flask(__name__)


app.config['MONGODB_SETTINGS'] = {
    'host': os.environ['MONGODB_HOST'],
    'username': os.environ['MONGODB_USERNAME'],
    'password': os.environ['MONGODB_PASSWORD'],
    'db': 'webapp',
    'JWT_SECRET_KEY': 'secret',
}

base_uri = 'mongodb://' +  os.environ['MONGODB_USERNAME'] + ':' + os.environ['MONGODB_PASSWORD']+ '@' + os.environ['MONGODB_HOST']
app.config['MONGO_DBNAME'] = 'webapp'
app.config['MONGO_URI'] = base_uri + ':27017/webapp'
app.config['JWT_SECRET_KEY'] = 'secret'

user_db_uri =  base_uri + ':27017/UserDB'
policy_db_uri = base_uri + ':27017/PolicyDB'
rules_db_uri = base_uri + ':27017/RulesDB'
ruleGroups_db_uri = base_uri + ':27017/RuleGroupsDB'
groups_db_uri = base_uri + ':27017/GroupsDB'
condition_db_uri = base_uri + ':27017/ConditionDB'
imgs_db_uri = base_uri + ':27017/ImageDB'
actions_db_uri = base_uri + ':27017/ActionsDB'
action_objects_db_uri = base_uri + ':27017/ActionObjectsDB'
series_db_uri = base_uri+ ':27017/SeriesDB'
studies_db_uri = base_uri + ':27017/StudiesDB'

studies_db = PyMongo(app,uri=studies_db_uri)
series_db = PyMongo(app,uri=series_db_uri)
user_db = PyMongo(app,uri=user_db_uri)
policy_db = PyMongo(app,uri=policy_db_uri)
rules_db = PyMongo(app,uri=rules_db_uri)
ruleGroups_db = PyMongo(app,uri=ruleGroups_db_uri)
groups_db = PyMongo(app,uri=groups_db_uri)
condition_db = PyMongo(app,uri=condition_db_uri)
actions_db = PyMongo(app,uri=actions_db_uri)
action_objects_db = PyMongo(app,uri=action_objects_db_uri)
imgs_db = PyMongo(app,uri=imgs_db_uri)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)


@app.route('/test', methods=["GET"])
def getTest():
    result = {
        "id":1,
        "value":10
    }
    return jsonify({'result' : result})



@app.route('/users/register', methods=["POST"])
def register():
    users = user_db.db.users 
    first_name = request.get_json()['first_name']
    last_name = request.get_json()['last_name']
    email = request.get_json()['email']
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    created = datetime.datetime.utcnow()
    id = str(uuid.uuid4())
    user_id = users.insert({
        'id': id, 
        'first_name': first_name,
        'last_name': last_name,
        'email': email,
        'password': password,
        'created': created
    })

    new_user = users.find_one({'_id': user_id})

    result = {'email': new_user['email'] + ' registered'}
    return jsonify({'result' : result})

@app.route('/users/login', methods=['POST'])
def login():
    users = user_db.db.users 
    email = request.get_json()['email']
    password = request.get_json()['password']
    result = ""
    db_result = users.find_one({'email': email})
    result = {"error":"Invalid username and password"}
    return_code = 400
    if db_result:
        if bcrypt.check_password_hash(db_result['password'], password):
            access_token = create_access_token(identity = {
                'first_name': db_result['first_name'],
                'last_name': db_result['last_name'],
                'email': db_result['email'],
                'id':str(db_result['_id'])
            })
            result = {'token':access_token}
            return_code = 200
    print(result)
    return jsonify({'result' : result}),return_code
"""
    --------------------------------Policies----------------------------------
"""
@app.route('/policies', methods=["POST"])
def add_policy():
    policies = policy_db.db.policies
    data = request.get_json()
    user = data['user_id']
    user_name = data['user_name']
    name = data['policy_name']
    description = data['policy_description']
    anonymize = False
    active = False
    actionExecutionType = 'OnSeries'
    created = datetime.datetime.utcnow()


    policy_id = policies.insert({
        'user': user,
        'user_name': user_name,
        'name': name,
        'description': description,
        'anonymize': anonymize,
        'active': active,
        'updated': created,
        'created': created,
        'actionExecutionType':actionExecutionType
    })

    new_policy = policies.find_one({'_id': policy_id})

    result = {'Policy': new_policy['name'] + ' created'}
    return jsonify({'result' : result})

"""
    user = get_jwt_identity()
    if user is None: 
        return jsonify({"error":" User not authorized "})
    user_id = user.get('id')
    for policy in policies.find({"user":user_id}):
"""
@app.route('/policies', methods=["GET"])
def get_all_policies():
    print("get policies ")
    policies = policy_db.db.policies 
    result = []

    for policy in policies.find():
        dummy_policy = create_policie_for_response(policy)
        result.append(dummy_policy)
        dummy_policy = {}

    return jsonify({'result' : result})

@app.route('/policies/<id>', methods=["GET"])
def get_policy(id):
    result = policy_db.db.policies.find_one({"_id": ObjectId(id)})
    if result is not None:
        result["_id"] = id
    else:
        result = []
    result = create_policie_for_response(result)
    return jsonify({'result' : result})


@app.route('/policies/<id>', methods=["DELETE"])
def delete_policy(id):
    result = policy_db.db.policies.remove({"_id": ObjectId(id)})
    response = {
        'msg': "Successfully deleted element"
    }
    statuscode = 200 
    print("result : ", result)
    if result['n'] !=1:
        response["msg"]= "Error occured"
        statuscode = 500
    return jsonify({'result' : result}), statuscode

@app.route('/policies/<id>', methods=["PUT"])
def update_policy(id):
    updated = datetime.datetime.utcnow()
    filter = { '_id': ObjectId(id) }
    policy_to_update = policy_db.db.policies.find_one({"_id": ObjectId(id)})
    number_of_updated_values = 0
    if policy_to_update is not None:
        keys = policy_to_update.keys()
        for key in keys:
            data_key = key.split('_')[-1]
            if ((data_key !="id") and (data_key != "user")):
                old_value = policy_to_update[data_key]
                new_value = request.get_json()['policy_'+data_key]
                if old_value != new_value:
                    new_values = { "$set": {key:new_value} }
                    result = policy_db.db.policies.update_one(filter,new_values)
                    number_of_updated_values = number_of_updated_values + 1

    response = {
        'msg': "Successfully updated element"
    }
 
    return jsonify({'result' : number_of_updated_values})


def create_policie_for_response(policy):
    dummy_policy = {}
    dummy_policy.update({
            'policy_id': str(policy['_id']),
            'policy_user_name': policy['user_name'],
            'policy_user': str(policy['user']),
            'policy_name': policy['name'],
            'policy_description': policy['description'],
            'policy_created': policy['created'],
            'policy_anonymize': policy['anonymize'],
            'policy_active': policy['active'],
            'policy_updated': policy['updated'] ,
            'policy_actionExecutionType': policy['actionExecutionType']
        })
    return dummy_policy


"""
---------------------------------------------Conditions ---------------------------------------------
"""
@app.route('/condition', methods=["POST"])
def add_condition():
    policy_id = request.get_json()['policy_id']
    property_key = request.get_json()['property_key']
    property_operator = request.get_json()['property_operator']
    property_value = request.get_json()['property_value']
    description = request.get_json()['description']
    created = datetime.datetime.utcnow()


    condition_id = condition_db.db.conditions.insert({
        'policy_id': policy_id,
        'property_key': property_key,
        'property_operator': property_operator,
        'property_value': property_value,
        'description': description,
        'created' : created
    })

    result = {'condition': str(condition_id) + ' created'}
    return jsonify({'result' : result})

@app.route('/condition/<policy_id>', methods=["GET"])
def get_all_cond(policy_id):
    rules = condition_db.db.conditions 
    result = []
    for rule in rules.find({'policy_id':policy_id}):
        rule["_id"]= str(rule['_id'])
        result.append(rule)
      
    return jsonify({'result' : result})

@app.route('/condition', methods=["GET"])
def get_all_conditions():
    rules = condition_db.db.conditions
    result = []
    for rule in rules.find({'policy_id':policy_id}):
        rule["_id"]= str(rule['_id'])
        result.append(rule)
      
    return jsonify({'result' : result})

@app.route('/conditions/<id>', methods=["DELETE"])
def delete_conditions(id):
    rules = condition_db.db.conditions
    result = rules.remove({"_id": ObjectId(id)})
    response = {
        'msg': "Successfully deleted element"
    }
    statuscode = 200 
    if result['n'] !=1:
        response["msg"]= "Error occured"
        statuscode = 500
    return jsonify({'result' : result}), statuscode  

"""
---------------------------------------------Action Objects ---------------------------------------------
"""

@app.route('/action_objects', methods=['POST'])
def create_action_object():
    action_object = request.get_json()
    action_object_id = action_objects_db.db.actionObjects.insert(action_object)
    return jsonify({"message": "Action object created", "action_object_id": str(action_object_id)}), 201

@app.route('/action_objects', methods=['GET'])
def get_all_action_objects():
    action_objects = list(action_objects_db.db.actionObjects.find())
    for action_object in action_objects:
        action_object['_id'] = str(action_object['_id'])
    return jsonify(action_objects), 200

@app.route('/action_objects/<action_object_id>', methods=['GET'])
def get_action_object(action_object_id):
    action_object = action_objects_db.db.actionObjects.find_one({"_id": ObjectId(action_object_id)})
    if action_object:
        action_object['_id'] = str(action_object['_id'])
        return jsonify(action_object), 200
    else:
        return jsonify({"message": "Action object not found"}), 404

@app.route('/action_objects/<action_object_id>', methods=['PUT'])
def update_action_object(action_object_id):
    updated_action_object = request.get_json()
    result = action_objects_db.db.actionObjects.update_one({"_id": ObjectId(action_object_id)}, {"$set": updated_action_object})
    if result.modified_count == 1:
        return jsonify({"message": "Action object updated"}), 200
    else:
        return jsonify({"message": "Action object not found"}), 404

@app.route('/action_objects/<action_object_id>', methods=['DELETE'])
def delete_action_object(action_object_id):
    result = action_objects_db.db.actionObjects.delete_one({"_id": ObjectId(action_object_id)})
    if result.deleted_count == 1:
        return jsonify({"message": "Action object deleted"}), 200
    else:
        return jsonify({"message": "Action object not found"}), 404



 
"""
---------------------------------------------actions ---------------------------------------------
"""


@app.route('/actions/<policy_id>', methods=["GET"])
def get_all_actions(policy_id):
    rules = actions_db.db.actions
    result = []
    print("üolicy id ; ", policy_id)
    for action in rules.find({'policy_id':policy_id}):
        action["_id"]= str(action['_id'])
        result.append(action)
    print("result: ", result)
    return jsonify({'result' : result})


@app.route('/actions/', methods=["GET"])
def get_ActionObjects1():
    actions = actions_db.db.actions
    result = []
    for action in actions.find():
        action["_id"]= str(action['_id'])
        result.append(action)
    data = jsonify({'result' : result})
    return data

@app.route('/action', methods=["POST"])
def add_Action():
    action =request.get_json() 
    action['created'] = datetime.datetime.utcnow()
    action_id = actions_db.db.actions.insert(action)
    result = {'action': str(action_id) + ' created'}
    return jsonify({'result' : result})  

@app.route('/actions/<id>', methods=["DELETE"])
def delete_actions(id):
    rules = actions_db.db.actions
    result = rules.remove({"_id": ObjectId(id)})
    response = {
        'msg': "Successfully deleted element"
    }
    statuscode = 200 
    if result['n'] !=1:
        response["msg"]= "Error occured"
        statuscode = 500
    return jsonify({'result' : result}), statuscode 

"""
---------------------------------------------Rules ---------------------------------------------
"""
@app.route('/rule', methods=["POST"])
def add_rule():
    policy_id = request.get_json()['policy_id']
    rule_name = request.get_json()['rule_name']
    condition1_id = request.get_json()['condition1_id']
    condition2_id = request.get_json()['condition2_id']
    logical_operator = request.get_json()['logical_operator']
    created = datetime.datetime.utcnow()


    rule_id = rules_db.db.rules.insert({
        'policy_id': policy_id,
        'rule_name': rule_name,
        'condition1_id': condition1_id,
        'condition2_id': condition2_id,
        'logical_operator':logical_operator,
        'created' : created
    })

    result = {'rule': str(rule_id) + ' created'}
    return jsonify({'result' : result})

@app.route('/rule/<id>', methods=["GET"])
def get_rule(id):
    rules = rules_db.db.rules
    result = rules.find_one({"_id": ObjectId(id)})
    result["_id"] = id
    return jsonify({'result' : result})

@app.route('/ruleCondition/<policy_id>/<condition_id>', methods=["GET"])
def get_conditionInRule(policy_id,condition_id):
    rules = rules_db.db.rules
    result = []
    for rule in rules.find({'policy_id':policy_id}):
        if(rule['condition1_id'] == condition_id or rule['condition2_id'] == condition_id):
            result.append(rule)
            rule["_id"]= str(rule['_id'])
    
            result.append(rule) 
    return jsonify({'result' : result})

@app.route('/rules/<id>', methods=["DELETE"])
def delete_rule(id):
    rules = rules_db.db.rules
    result = rules.remove({"_id": ObjectId(id)})
    response = {
        'msg': "Successfully deleted element"
    }
    statuscode = 200 
    if result['n'] !=1:
        response["msg"]= "Error occured"
        statuscode = 500
    return jsonify({'result' : result}), statuscode  

@app.route('/rules/<policy_id>', methods=["GET"])
def get_all_rules(policy_id):
    rules = rules_db.db.rules
    conditions = condition_db.db.conditions 
    result = []
    for rule in rules.find({'policy_id':policy_id}):
        rule["_id"]= str(rule['_id'])
        for condition1 in conditions.find({'_id': ObjectId(rule['condition1_id'])}):
            rule['condition1_property_value']= str(condition1['property_value'])
            rule['condition1_property_key']= str(condition1['property_key'])
            rule['condition1_property_operator']= str(condition1['property_operator'])
            break
        for condition2 in conditions.find({'_id': ObjectId(rule['condition2_id'])}):
            rule['condition2_property_value']= str(condition2['property_value'])
            rule['condition2_property_key']= str(condition2['property_key'])
            rule['condition2_property_operator']= str(condition2['property_operator'])
            break
        result.append(rule) 
    return jsonify({'result' : result})


@app.route('/rule/<policy_id>', methods=["GET"])
def get_rules(id):
    rules = rules_db.db.rules
    for rule in rules.find_one({'policy_id': ObjectId(policy_id)}):
        rule["_id"] = str(rule['_id'])
        print("\n\n\n")
        print(rule)
    return jsonify({'result' : result})

"""
--------------------- OPERATORS ------------------------
"""

def get_operator_list():
    return [
        {'id':'1','operator':'equals',},
        {'id':'2','operator':'smaller than',},
        {'id':'3','operator':'greater than',},
        {'id':'4','operator':'regex'},
        {'id':'5','operator':'contains'}
    ]

@app.route('/operators', methods=["GET"])
def get_operators():
    operators = get_operator_list()
    return jsonify({"operators": operators})

@app.route('/operators/<query>', methods=["GET"])
def get_operator(query):
    operators = get_operator_list()
    result = []
    if query == "":
        result = operators
    else:
        result = [i for i in operators if query in i['operator']]

    return jsonify({"operators": result})

"""
------------------- Filter Properties ---------------------
"""
@app.route('/filterproperties',methods=["GET"])
def get_filter_properties():
    filter_properties = rules_db.db.filterproperties
    result = []
    for filter_property in filter_properties.find():
        filter_property['_id'] = str(filter_property['_id'])
        result.append(filter_property)
    return jsonify({"filterproperties":result})

@app.route('/filterproperties/<query>',methods=["GET"])
def get_filter_property(query):
    filter_properties = rules_db.db.filterproperties
    result = []
    db_result  = []
    if query == "":
        db_result = filter_properties.find(limit=20)
    else:
        db_result = filter_properties.find({'Keyword': re.compile(query, re.IGNORECASE)},limit=20)

    for filter_property in db_result:
        filter_property['_id'] = str(filter_property['_id'])
        result.append(filter_property)
    return jsonify({"filterproperties":result})
    
"""
@app.route('/images',methods=["GET"])
def get_img_urls():
    imgs = imgs_db.db.images
    result = []
    for img in imgs.find():
        img['_id'] = str(filter_property['_id'])
        result.append(img)
    return jsonify({"images":result})
    
"""

"""
---------------------------------------------Rule Groups ---------------------------------------------
"""
@app.route('/ruleGroup', methods=["POST"])
def add_ruleGroup():
    print("INSERT RULEGROUP")
    groups = ruleGroups_db.db.groups
    policy_id = request.get_json()['policy_id']
    
    rulegroup_name = request.get_json()['rulegroup_name']
    rule1_id = request.get_json()['rule1_id']
    rule2_id = request.get_json()['rule2_id']
    logical_operator = request.get_json()['logical_operator']
    created = datetime.datetime.utcnow()

    ruleGroup_id = groups.insert({
        'policy_id': policy_id,
        'rulegroup_name': rulegroup_name,
        'rule1_id': rule1_id,
        'rule2_id': rule2_id,
        'logical_operator':logical_operator,
        'created' : created
    })

    result = {'rule': str(ruleGroup_id) + ' created'}
    return jsonify({'result' : result})

@app.route('/ruleGroup/<id>', methods=["GET"])
def get_ruleGroup(id):
    print("get_ruleGroup")
    groups = ruleGroups_db.db.groups
    result = groups.find_one({"_id": ObjectId(id)})
    result["_id"] = id
    return jsonify({'result' : result})

@app.route('/ruleGroup/<id>', methods=["DELETE"])
def delete_ruleGroup(id):
    groups = ruleGroups_db.db.groups
    result = groups.remove({"_id": ObjectId(id)})
    response = {
        'msg': "Successfully deleted element"
    }
    statuscode = 200 
    if result['n'] !=1:
        response["msg"]= "Error occured"
        statuscode = 500
    return jsonify({'result' : result}), statuscode  

@app.route('/ruleGroups/<policy_id>', methods=["GET"])
def get_all_rulegroups(policy_id):
    groups = ruleGroups_db.db.groups 
    rules = rules_db.db.rules
    print(rules)
    result = []
    for rule in groups.find({'policy_id':policy_id}):
        rule["_id"]= str(rule['_id'])
        for ruleName in rules.find({'_id':ObjectId(rule["rule1_id"])}):
            rule["rule1_name"]=str(ruleName["rule_name"])
        for ruleName in rules.find({'_id':ObjectId(rule["rule2_id"])}):
            rule["rule2_name"]=str(ruleName["rule_name"])
        result.append(rule)
    for x in result:
        print(x)
    return jsonify({'result' : result})

if __name__ == "__main__":
    app.run(debug=True, host = "0.0.0.0" , port=5000)