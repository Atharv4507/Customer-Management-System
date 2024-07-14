package com.MyCompany.Customer.Container;


import org.springframework.data.jpa.repository.JpaRepository;

import com.MyCompany.Customer.model.Customer;

import java.util.Optional;

public interface UsersRepo extends JpaRepository<Customer, Integer> {

    Optional<Customer> findByEmail(String email);
}
