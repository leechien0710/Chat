package com.example.demo.exception;

public class HistoryCreateFailException extends RuntimeException{
    public HistoryCreateFailException(String mes){
        super(mes);
    }
}
