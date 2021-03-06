# EUSHARE SERVER
EUShare is a file exchange tool from the European Commission. Its source code is published as open source software under the terms of the EUPL public license. 

* [Latest Sonar Cloud analysis](https://sonarcloud.io/dashboard?id=CIRCABC_EasyShare) ![Bugs](https://sonarcloud.io/api/project_badges/measure?project=CIRCABC_EasyShare&metric=bugs) ![Code smells](https://sonarcloud.io/api/project_badges/measure?project=CIRCABC_EasyShare&metric=code_smells)

## Installation requirements
1. Tomcat 8
1. Java 8
1. MySQL 5.7
1. Maven 3.6.0

## Quick start

### Database initialization
1. Create easyshare schema;
``` sql 
CREATE DATABASE easyshare; 
```

2. Create a user which will access this schema;
``` sql 
CREATE USER 'easyshare'@'localhost' IDENTIFIED BY 'easyshare'; 
GRANT ALL PRIVILEGES ON easyshare.* TO 'easyshare'@'localhost';
```

### Run the application
Build the application's jar using the following command:
``` batch
mvn clean install
```

Build the test report by running the following command:
``` batch
mvn surefire-report:report
```

Upload the application to your running tomcat (after setting up a manager-script user in tomcat)
``` batch
# from client folder
mvn clean tomcat7:deploy 
-Dtomcat.admin=your_tomcat_username
-Dtomcat.admin.password=your_tomcat_password
-Dtomcat.deploy.url=your_tomcat_url/manager/text
```

## Repository conventions
### Workflow
We apply the [GitFlow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow).

### Commits
For each commit, we ask to add the number of the issue to which the commit is relevant. E.g.  Issue #1245 : Adding css for class .aClassName. For each branch, we ask it to be named by the issue name then its number. E.g. for an issue like named "Dockerize environment" numbered 1246, the branch name will be "dockerizeEnvironment#1246".