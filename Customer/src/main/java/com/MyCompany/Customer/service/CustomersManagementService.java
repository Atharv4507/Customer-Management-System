package com.MyCompany.Customer.service;
import com.MyCompany.Customer.Connection.ReqRes;
import com.MyCompany.Customer.Container.UsersRepo;
import com.MyCompany.Customer.model.Customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class CustomersManagementService {

    @Autowired
    private UsersRepo usersRepo;
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;


    public ReqRes register(ReqRes registrationRequest){
        ReqRes resp = new ReqRes();

        try {
            Customer ourCustomer = new Customer();
            ourCustomer.setEmail(registrationRequest.getEmail());
            ourCustomer.setCity(registrationRequest.getCity());
            ourCustomer.setRole(registrationRequest.getRole());
            ourCustomer.setFirstname(registrationRequest.getFirstname());
            ourCustomer.setLastname(registrationRequest.getLastname());
            ourCustomer.setStreet(registrationRequest.getStreet());
            ourCustomer.setAddress(registrationRequest.getAddress());
            ourCustomer.setState(registrationRequest.getState());
            ourCustomer.setPhone(registrationRequest.getPhone());
            ourCustomer.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            Customer CustomerResult = usersRepo.save(ourCustomer);
            if (CustomerResult.getId()>0) {
                resp.setOurCustomer((CustomerResult));
                resp.setMessage("User Saved Successfully");
                resp.setStatusCode(200);
            }

        }catch (Exception e){
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }
        return resp;
    }


    public ReqRes login(ReqRes loginRequest){
        ReqRes response = new ReqRes();
        try {
            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
                            loginRequest.getPassword()));
            var user = usersRepo.findByEmail(loginRequest.getEmail()).orElseThrow();
            var jwt = jwtUtils.generateToken(user);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRole(user.getRole());
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24Hrs");
            response.setMessage("Successfully Logged In");

        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }
        return response;
    }





    public ReqRes refreshToken(ReqRes refreshTokenReqiest){
        ReqRes response = new ReqRes();
        try{
            String ourEmail = jwtUtils.extractUsername(refreshTokenReqiest.getToken());
            Customer users = usersRepo.findByEmail(ourEmail).orElseThrow();
            if (jwtUtils.isTokenValid(refreshTokenReqiest.getToken(), users)) {
                var jwt = jwtUtils.generateToken(users);
                response.setStatusCode(200);
                response.setToken(jwt);
                response.setRefreshToken(refreshTokenReqiest.getToken());
                response.setExpirationTime("24Hr");
                response.setMessage("Successfully Refreshed Token");
            }
            response.setStatusCode(200);
            return response;

        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
            return response;
        }
    }


    public ReqRes getAllUsers() {
        ReqRes reqRes = new ReqRes();

        try {
            List<Customer> result = usersRepo.findAll();
            if (!result.isEmpty()) {
                reqRes.setOurCustomerList(result);
                reqRes.setStatusCode(200);
                reqRes.setMessage("Successful");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("No users found");
            }
            return reqRes;
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred: " + e.getMessage());
            return reqRes;
        }
    }


    public ReqRes getUsersById(Integer id) {
        ReqRes reqRes = new ReqRes();
        try {
            Customer usersById = usersRepo.findById(id).orElseThrow(() -> new RuntimeException("User Not found"));
            reqRes.setOurCustomer(usersById);
            reqRes.setStatusCode(200);
            reqRes.setMessage("Users with id '" + id + "' found successfully");
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred: " + e.getMessage());
        }
        return reqRes;
    }


    public ReqRes deleteUser(Integer userId) {
        ReqRes reqRes = new ReqRes();
        try {
            Optional<Customer> userOptional = usersRepo.findById(userId);
            if (userOptional.isPresent()) {
                usersRepo.deleteById(userId);
                reqRes.setStatusCode(200);
                reqRes.setMessage("User deleted successfully");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found for deletion");
            }
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while deleting user: " + e.getMessage());
        }
        return reqRes;
    }

    public ReqRes updateUser(Integer userId, Customer updatedCustomer) {
        ReqRes reqRes = new ReqRes();
        try {
            Optional<Customer> userOptional = usersRepo.findById(userId);
            if (userOptional.isPresent()) {
                Customer existingCustomer = userOptional.get();
                existingCustomer.setEmail(updatedCustomer.getEmail());
                existingCustomer.setFirstname(updatedCustomer.getFirstname());
                existingCustomer.setLastname(updatedCustomer.getLastname());
                existingCustomer.setCity(updatedCustomer.getCity());
                existingCustomer.setRole(updatedCustomer.getRole());
                existingCustomer.setAddress(updatedCustomer.getAddress());
                existingCustomer.setStreet(updatedCustomer.getStreet());
                existingCustomer.setState(updatedCustomer.getState());
                existingCustomer.setPhone(updatedCustomer.getPhone());
                // Check if password is present in the request
                if (updatedCustomer.getPassword() != null && !updatedCustomer.getPassword().isEmpty()) {
                    // Encode the password and update it
                    existingCustomer.setPassword(passwordEncoder.encode(updatedCustomer.getPassword()));
                }

                Customer savedUser = usersRepo.save(existingCustomer);
                reqRes.setOurCustomer(savedUser);
                reqRes.setStatusCode(200);
                reqRes.setMessage("User updated successfully");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found for update");
            }
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while updating user: " + e.getMessage());
        }
        return reqRes;
    }


    public ReqRes getMyInfo(String email){
        ReqRes reqRes = new ReqRes();
        try {
            Optional<Customer> userOptional = usersRepo.findByEmail(email);
            if (userOptional.isPresent()) {
                reqRes.setOurCustomer(userOptional.get());
                reqRes.setStatusCode(200);
                reqRes.setMessage("successful");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found for update");
            }

        }catch (Exception e){
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while getting user info: " + e.getMessage());
        }
        return reqRes;

    }
}
