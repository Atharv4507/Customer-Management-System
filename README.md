# Customer-Management-System
Perform Crud operation on Customer database with JWT authentication

1. download the zip file
2. create a virtual env for downloading react files
   a. in vs code you can create a virtual env by downloading the Python environment manager extension
   b. also download the thunderClient extension for reliability or you can use Postman also
6. **open Mysql and use the command**
7. ```bash create database customer_db```
9. you can execute Java code without env also just press "F5" when your cursor is on any Java file in "src\main\java\com\MyCompany\Customer" this folder
10. Your Java code should execute properly
11. now test the MySQL connectivity using
    a.you can see icon of thunderclient on left side of vs code
    b.click on new Request
    c.first make Get to Post from the select button then put "localhost:1010/auth/register"
    d.go in Body -> Json Content then paste this in box
    e.{
        "email":"atharvmh2002@gmail.com",
        "city":"Pandharpur",
        "firstname": "atharv",
        "lastname": "Hingmire",
        "street":"st.lowies",
        "address":"lane5",
        "state":"Maharastra",
        "phone":"895646219",
        "role": "ADMIN",
        "password":"admin"
    }
    click send button
   f. POST:"localhost:1010/auth/login" just a small change made login except register. click send button
   g. you can see one token is generated in response copy that
   h. Now, make POST to GET "localhost:1010/admin/get-all-customer"
   i. go in Headers remove the tick from User-agent and add Content-type - appliation\xml
   j. go in Auth -> Bearer and paste the token we copied earlier.
    Now, 
12. In env download files using the command "npm i"
13. The node_module folder will be created above the public folder
14. run react code using "npm start"
15. login using email: atharvmh2002@gmail.com and password: admin
16. you will see the profile when you click on login, refresh the page once, and then in nav you will see the Customer Manager where you can perform your crud operation
17. if you are unable to see the record in customer manager try to drop database and create it again.
Thank You!
[Screenshot (13)](https://github.com/user-attachments/assets/7048a136-9dae-4506-8d17-9da07b851127)
[Screenshot (12)](https://github.com/user-attachments/assets/1a79131c-fe72-462d-a926-fb347be5d3da)
![Screenshot (11)](https://github.com/user-attachments/assets/57dd8b21-8702-403b-b237-2aee019897ce)
