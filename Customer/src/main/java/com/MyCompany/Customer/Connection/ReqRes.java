package com.MyCompany.Customer.Connection;

import com.MyCompany.Customer.model.Customer;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReqRes {

    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;
    private String firstname;
    private String lastname;
    private String street;
    private String address;
    private String state;
    private String city;
    private String phone;
    private String role;
    private String email;
    private String password;
    private Customer ourCustomer;
    private List<Customer> ourCustomerList;

}
