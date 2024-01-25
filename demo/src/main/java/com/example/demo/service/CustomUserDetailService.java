package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.exception.UserExitsException;
import com.example.demo.model.CustomUserDetail;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CustomUserDetailService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("Username or Password  is not correct");
        }
        return new CustomUserDetail(user);
    }
    public UserDetails loadUserById(UUID id){
        User user = userRepository.findById(id).get();
        if (user == null) {
            throw new UsernameNotFoundException("Not found user by id: "+ id);
        }
        return new CustomUserDetail(user);
    }
    public User saveUser(User user){
        if(userRepository.findByUsername(user.getUsername())!=null){
            throw new UserExitsException("User already exist");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("ROLE_USER");
        user.setFunds(0);
        return userRepository.save(user);
    }
    public static User getUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || authentication instanceof AnonymousAuthenticationToken) {
            throw new BadCredentialsException("Có xác thực đâu mà vào");
        }
        System.out.println(authentication);
        CustomUserDetail customUserDetail = (CustomUserDetail) authentication.getPrincipal();
        return customUserDetail.getUser();
    }
}
