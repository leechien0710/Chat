package com.example.demo.exception;

import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus()
public class UserExitsException extends RuntimeException{
    public UserExitsException(String msg) {
        super(msg);
    }
}
