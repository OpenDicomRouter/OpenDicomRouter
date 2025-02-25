import json
import sys
from policy import Policy

def read_config(config_path):
	""" Read a config file in json format to specify the endpoints of the backend API.
	 May be better to load configoration via ENV Variables.
	 Returns: Dictionary containing the Base URL and the corresponding REST endpoints.
	"""
	try:
		f = open(config_path, 'rb')
	except OSError:
		print("Could not open/read file:", config_path)
		sys.exit()
	config = json.load(f)	
	return config

def get_policies():
	return ['1234']

def get_rules():
	return {"rule_id":"1234","rule":"Age>72"}

def get_actions():
	return {"action_id":"1234","action":"send_mail"}

def get_policy_information():
	pass

def get_all():
	policy_url = 'http://orthanc/policies'
	policies = get_policies()
	for policy in policies:
		rules = get_rules()
		actions = get_actions()
		policy = Policy(rules,actions)

