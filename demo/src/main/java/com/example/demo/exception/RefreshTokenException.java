package com.example.demo.exception;

import com.example.demo.entity.RefreshToken;

public class RefreshTokenException extends RuntimeException{
    public RefreshTokenException(String mes){
        super(mes);
    }
}
