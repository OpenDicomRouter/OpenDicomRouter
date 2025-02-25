# Documentation


## Setup
To install the dependencies of a Node.js project using npm install, you will first need to have Node.js and npm (Node Package Manager) installed on your computer.
Once you have npm installed, you can use the following steps to install the dependencies of your project:

It is important to note that the npm install command should be run in the root directory of your project, 
where the package.json file is located. This ensures that the dependencies are installed in the correct location and are accessible to your project.


With the use of a Docker volume, changes made to the code in the local environment will be reflected in real-time in the Docker container. 
The mapping will be automatically done in the docker-compose.yml.

**Note**: This configuration should only be used during development..

### Package.JSON

**warning**: Please check the proxy entry in the package.json file if the frontend application is not able to reach the backend.

The `package.json` file contains information about the project such as the project name, version, and dependencies.

The `dependencies` section lists all the libraries that the project depends on, such as `react`, `react-dom`, `axios`, and `styled-components`.

The `scripts` section lists commands that can be run in the terminal, such as `start`, `build`, and `test`.

The `eslintConfig` section specifies the linting configuration for the project, using the `extends` key to specify that the project follows the `react-app` and `react-app/jest` linting configurations.

The `browserslist` section lists the browsers that the project supports, with different sets of browsers specified for production and development environments.

The `proxy` section sets a proxy URL for the project to use, in this case `http://api:5000`.

This `package.json` file is used by the npm package manager to install the necessary dependencies for the project and run the specified scripts. To install the dependencies, you would run the following command in the terminal while in the project's directory:

```
npm install
```

This will download and install all the necessary packages listed in the `dependencies` section.
