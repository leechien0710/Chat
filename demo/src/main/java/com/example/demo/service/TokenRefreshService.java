package com.example.demo.service;

import com.example.demo.entity.RefreshToken;
import com.example.demo.exception.RefreshTokenException;
import com.example.demo.jwt.JwtTokenProvider;
import com.example.demo.model.CustomUserDetail;
import com.example.demo.model.LoginReponse;
import com.example.demo.repository.RefreshTokenRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class TokenRefreshService {
    @Autowired
    private RefreshTokenRepository refreshTokenRepository;
    @Autowired
    JwtTokenProvider tokenProvider;
    @Autowired
    private UserRepository userRepository;

    private Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshToken createRefreshToken(UUID userId) {
        RefreshToken refreshToken = new RefreshToken();

        refreshToken.setUser(userRepository.findById(userId).get());
        refreshToken.setToken(UUID.randomUUID().toString());

        refreshToken = refreshTokenRepository.save(refreshToken);
        return refreshToken;
    }
    public LoginReponse refreshToken(LoginReponse token){
        RefreshToken refreshToken = findByToken(token.getRefreshToken()).get();
        if(refreshToken==null) {
            throw new RefreshTokenException("Token null");
        }
        String access = tokenProvider.generateToken(new CustomUserDetail(refreshToken.getUser()));
        LoginReponse loginReponse = new LoginReponse();
        loginReponse.setRefreshToken(token.getRefreshToken());
        loginReponse.setAccessToken(access);
        return loginReponse;
    }
}
