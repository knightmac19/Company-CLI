# Company CLI

[Demo video!](https://drive.google.com/file/d/1GOCBRBQeBcHONkTgRCGuL8X9c20873kD/view?usp=sharing)

### View and manage departments and employees through the command line

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## <a id="languages"></a> Languages & Technologies

[Contents](#contents)  
<img alt="JavaScript" src="https://img.shields.io/badge/javascript-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
<img alt="NodeJS" src="https://img.shields.io/badge/node.js-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/>
<img alt="Visual Studio Code" src="https://img.shields.io/badge/VisualStudioCode-0078d7.svg?&style=for-the-badge&logo=visual-studio-code&logoColor=white"/>
<img alt="Git" src="https://img.shields.io/badge/git-%23F05033.svg?&style=for-the-badge&logo=git&logoColor=white"/>
<img alt="GitHub" src="https://img.shields.io/badge/github-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/>
<img alt="MySQL" src="https://img.shields.io/badge/mysql-%2300f.svg?&style=for-the-badge&logo=mysql&logoColor=white"/>

## <a id="contents"></a> Contents

- [Languages](#languages)
- [Description](#description)
- [Features](#features)
- [Usage](#usage)
- [Challenges](#challenges)
- [Contributors](#contributors)
- [License](#license)

## <a id="description"></a> Description

[Contents](#contents)  
Users can interact with a mySQL database from the command line to view and create departments, roles and employees as well as update an employee.

## <a id="features"></a> Features

[Contents](#contents)  
The "View Roles" and "View Employees" requests don't simply return the data from just those tables. Rather, they include information joined from other tables. When viewing the roles table the associated department name is included by joining the roles and department tables. When users request to view the employees table, the role title and department names are joined as well as concatenating the employee names and including that employee's manager (another employee from the same table). Also, when updating an employee, users can update just the employee's role, name, or manager properties separately, or select to update all those properties in one request.

## <a id="usage"></a> Usage

[Contents](#contents)  
To use the application users can clone the repository, install the necessary npm packages, then create the schema and seed the database using the mysql shell and their local mysql server, before initializing the app with `npm start`.

## <a id="challenges"></a> Challenges & Lessons Learned

[Contents](#contents)  
I certainly wanted to display the employees and roles tables as humanly-readable. Rather than including the id's of associated departments or roles, I wanted to include the names of those properties. This required learning how to implement some mysql JOINs as well as concatenating other properties to create full names.

## <a id="contributors"></a> Contributors

[Contents](#contents)

- Patrick Dunn // [pmdunn78@gmail.com](mailto:pmdunn78@gmail.com) // [github.com/knightmac19](https://github.com/knightmac19)

## <a id="questions"></a> Questions

[Contents](#contents)  
Please direct any questions to [pmdunn78@gmail.com](mailto:pmdunn78@gmail.com).

## <a id="license"></a> License

[Contents](#contents)  
Copyright 2021 Patrick Dunn

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
