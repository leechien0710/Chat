package com.example.demo.controller;

import com.example.demo.entity.RefreshToken;
import com.example.demo.entity.User;
import com.example.demo.jwt.JwtTokenProvider;
import com.example.demo.model.CustomUserDetail;
import com.example.demo.model.LoginReponse;
import com.example.demo.model.LoginRequest;
import com.example.demo.service.CustomUserDetailService;
import com.example.demo.service.TokenRefreshService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    CustomUserDetailService customUserDetailService;
    @Autowired
    private JwtTokenProvider tokenProvider;
    @Autowired
    TokenRefreshService refreshTokenService;
    @PostMapping("/login")
    public ResponseEntity<LoginReponse> Login(@RequestBody LoginRequest loginRequest){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        LoginReponse loginReponse = new LoginReponse();


        // Trả về jwt cho người dùng.
        String accessToken = tokenProvider.generateToken((CustomUserDetail) authentication.getPrincipal());
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(((CustomUserDetail) authentication.getPrincipal()).getUser().getId());
        String role = ((CustomUserDetail) authentication.getPrincipal()).getUser().getRole();
        loginReponse.setAccessToken(accessToken);
        loginReponse.setRefreshToken(refreshToken.getToken());
        loginReponse.setRole(role);
        return ResponseEntity.ok(loginReponse);
    }
    @PostMapping("/signup")
    public ResponseEntity<User> Signup(@RequestBody User user){
        User userSave = customUserDetailService.saveUser(user);
        return ResponseEntity.ok(userSave);
    }
    @GetMapping("/user")
    public ResponseEntity<User> getUser(){
        return ResponseEntity.ok(CustomUserDetailService.getUser());
    }
    @PostMapping("/refreshtoken")
    public ResponseEntity<LoginReponse> refreshToken(@RequestBody LoginReponse token){
        return ResponseEntity.ok(refreshTokenService.refreshToken(token));
    }
}
