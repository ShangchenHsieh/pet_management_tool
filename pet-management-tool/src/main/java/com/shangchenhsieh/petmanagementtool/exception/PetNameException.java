package com.shangchenhsieh.petmanagementtool.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class PetNameException extends RuntimeException{
    public PetNameException(String message) {
        super(message);
    }
}
