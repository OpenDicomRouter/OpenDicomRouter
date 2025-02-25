# Documentation of the Plugin
## Orthanc Configurtation

The orthanc.json is a configuration file for Orthanc, a DICOM server. It specifies the settings for the Orthanc instance such as the instance name, remote access permission, plugins, and database settings.

**Warning:** The passwords for the database and the registered user "admin" must be changed from the default values "fakepassword" and "pgpassword" for security reasons.

This JSON file contains a configuration for Orthanc, a DICOM server. 

- The `Name` field gives the name of the Orthanc instance.
- The `RemoteAccessAllowed` field indicates whether remote access is allowed or not.
- The `Plugins` field lists the directory where Orthanc plugins are located.
- The `RegisteredUsers` field lists the registered users for the Orthanc instance, with the username "admin" and password "fakepassword".
- The `PostgreSQL` field contains information about the PostgreSQL database that Orthanc uses, such as the host, port, database name, username, and password.
- The `PythonScript` field specifies the location of the Python script that Orthanc uses.
- The `PythonVerbose` field indicates whether verbose output is enabled or not.

## Requirements.txt
A requirements.txt file is used in Python to specify the dependencies for a project. It is a plain text file that contains a list of libraries, along with the version numbers, that your project needs to run. The dependencies are specified in the format of library_name==version, one per line.

The requirements.txt file is used by the pip package manager to install the required libraries and their dependencies. This makes it easier to set up the development environment and to ensure that the project can run on different systems with the same dependencies.

currently only three requirements are used:
- pydicom -- Python library to deal with DICOM files
- pyorthanc -- orthanc library
- requests -- communication with backend

## DockerFIle Explanation
The Dockerfile is used to build an Orthanc plugin as a Docker container. The Dockerfile specifies a set of instructions to be executed in order to build the Docker image.
1. The first line specifies the base image for the Docker container. The base image is `jodogne/orthanc-plugins` which is an image of Orthanc with plugins already installed.

2. The next two lines run `apt-get update` and `apt-get upgrade` to update the packages on the base image to their latest versions.

3. The next line installs `python3` and `python3-pip` which are required to run the plugin.

4. The next line adds a shell script `download-python.sh` to the Docker container. The script is used to install a specific version of Python.

5. The next line runs the `download-python.sh` script, which installs Python version 3.7.

6. The next line adds a `requirements.txt` file to the Docker container, which lists the required Python packages for the plugin.

7. The next line runs `pip` to install the packages listed in `requirements.txt`.

8. The next line adds the plugin files to the Orthanc plugins directory `/usr/local/share/orthanc/plugins/`.

9. The next line lists the contents of the Orthanc plugins directory to verify that the plugin files were added correctly.

10. The next line sets the environment variable `MALLOC_ARENA_MAX` to `5` to set the number of memory arenas used by the Orthanc server.

11. The next line specifies the command to be run when the Docker container is started. The command `Orthanc` starts the Orthanc server.

12. The final line specifies the command-line arguments to be passed to the Orthanc server when it starts. The argument `/etc/orthanc/` specifies the Orthanc configuration directory.

The download-plugin  and download-python scripts should be self explanatory.






## Important Classes

### Class Documentation: PolicyManager

#### Introduction
The `PolicyManager` class is responsible for managing and evaluating policies for DICOM files. It contains a list of policies, which can be updated and evaluated for a given DICOM file and its data.

#### Class Variables
- `policies`: a list of policies managed by the `PolicyManager` object.

#### Class Methods
- `__init__`: Initializes the `PolicyManager` object and populates the `policies` list with policy objects created from raw policy data obtained from the `get_policies` function.

- `create_policy_objects`: Given a list of raw policies, this method creates policy objects and returns the list of policy objects.

- `update_policies`: Updates the `policies` list with the latest policy objects created from the raw policies obtained from the `get_policies` function.

- `evaluate_policies`: Given a DICOM file and its data, this method evaluates each policy in the `policies` list and executes the action associated with the policy if its evaluation is `True`.

- `print_info`: Prints information about each policy in the `policies` list.

#### Usage
To use the `PolicyManager` class, create an instance of the class and call the appropriate methods as needed. The `evaluate_policies` method can be used to evaluate a list of policies for a given DICOM file and its data, while the `update_policies` method can be used to update the list of policies managed by the `PolicyManager` object.

### Class Documentation: Policy

#### Introduction
The `Policy` class represents a single policy that can be evaluated for a given DICOM file and its data. It contains information about the policy, as well as a list of conditions, rules, and actions associated with the policy.

#### Class Variables
- `policy_id`: a unique identifier for the policy.
- `policy_name`: the name of the policy.
- `policy_active`: a boolean value indicating whether the policy is active or not.
- `policy_anonymize`: a boolean value indicating whether the data should be anonymized or not.
- `policy_created`: the date and time the policy was created.
- `policy_updated`: the date and time the policy was last updated.
- `policy_user`: the user who created the policy.
- `policy_user_name`: the name of the user who created the policy.
- `policy_description`: a description of the policy.
- `information`: a dictionary containing additional information about the policy.
- `conditions`: a dictionary of conditions associated with the policy.
- `rules`: a list of rules associated with the policy.
- `actions`: a list of actions associated with the policy.

#### Class Methods
- `__init__`: Initializes the `Policy` object with the given policy information and actions.
- `_init_policy_information`: Populates the `policy_id`, `policy_active`, `policy_name`, `policy_anonymize`, `policy_created`, `policy_updated`, `policy_user`, `policy_user_name`, and `policy_description` variables with the information from the `policy_information` dictionary.
- `_create_conditions_list`: Populates the `conditions` dictionary with condition objects created from the raw condition data obtained from the `get_conditions` function.
- `_create_rule_list`: Populates the `rules` list with rule objects created from the raw rule data obtained from the `get_rules` function.
- `is_active`: Returns the value of the `policy_active` variable.
- `anonymize_data`: Returns the value of the `policy_anonymize` variable.
- `get_rules`: Returns the `rules` list.
- `get_operator_func`: Given a datatype object and a condition, returns the function associated with the operator specified in the condition.
- `eval_conditions`: Given DICOM data, evaluates each condition in the `conditions` dictionary and returns a dictionary of the evaluation results.
- `eval_rule`: Given a rule and the evaluations of two conditions, returns the evaluation result of the rule.
- `eval_rules`: Given a dictionary of condition evaluations, evaluates each rule in the `rules` list and returns a dictionary of the evaluation results.
- `evaluate`: Given DICOM data, evaluates the policy based on the conditions and rules associated with the policy and returns the evaluation result.
- `run_actions`: Given DICOM data, runs the actions associated with the policy.
- `print_info`: Prints information about the policy, including the policy information, conditions, and rules.

#### Usage
To use the `Policy` class, create an instance of the class with the policy information and actions, and call the appropriate methods as needed. The `evaluate` method can be

### Condition
Represents a single condition for a policy that is used to process DICOM data. It is mainly a helper class for usage in the Policy Manager. It is used to store the data fetched from the backend api


### API Bridge

The API Connection module acts as a bridge between the backend and the plugin. The functions in this module allow the plugin to communicate with the backend and fetch information such as policies, rules, conditions, and actions.

#### `get_policies()`

Fetches the list of policies from the API.

Returns:
List of policies.

#### `get_single_policy(policy_id)`

Fetches a single policy using its policy ID.

Args:
policy_id (str): The ID of the policy.

Returns:
The policy as a dictionary.

#### `get_rules(policy_id)`

Fetches the rules associated with a policy.

Args:
policy_id (str): The ID of the policy.

Returns:
List of rules.

#### `get_conditions(policy_id)`

Fetches the conditions associated with a policy.

Args:
policy_id (str): The ID of the policy.

Returns:
List of conditions.

#### `get_actions(action_type)`

Fetches actions of a specific type.

Args:
action_type (str): The type of actions to fetch.

Returns:
List of actions.

#### `get_all_actions()`

Fetches all available actions.

Returns:
List of all actions.

## Rule Class

The `Rule` class is used to represent the rules associated with a policy.

### Class Properties

- `id`: The ID of the rule.
- `condition1_id`: The ID of the first condition associated with the rule.
- `condition2_id`: The ID of the second condition associated with the rule.
- `logical_operator`: The logical operator used to connect the two conditions.
- `property_key`: The property key of the rule.
- `property_operator`: The operator used to compare the property value.
- `property_value`: The property value of the rule.

### Class Methods

- `get_property_key()`: Returns the property key of the rule.
- `get_property_value()`: Returns the property value of the rule.
- `get_property_operator()`: Returns the operator used to compare the property value.
- `get_logical_operator()`: Returns the logical operator used to connect the two conditions.
- `print_info()`: Prints a human-readable representation of the rule information.

### Initialization

The `Rule` class is initialized with a dictionary representing the rule information, which is obtained from the API.