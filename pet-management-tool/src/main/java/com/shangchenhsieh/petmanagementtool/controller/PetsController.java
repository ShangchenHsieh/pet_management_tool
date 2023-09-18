package com.shangchenhsieh.petmanagementtool.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.*;
import org.springframework.web.bind.annotation.*;

import com.shangchenhsieh.petmanagementtool.domain.Pets;
import com.shangchenhsieh.petmanagementtool.service.MapValidationErrorService;
import com.shangchenhsieh.petmanagementtool.service.PetsService;


@Controller
@RequestMapping("/api/pets")
public class PetsController {

    @Autowired
    private PetsService petsService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    // create pet
    @PostMapping("")
    public ResponseEntity<?> createPets(@Valid @RequestBody Pets pet, BindingResult result) {

        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
        if(errorMap !=  null) {
            return errorMap;
        }
        Pets savedPet = petsService.savePets(pet);
        return new ResponseEntity<Pets>(savedPet, HttpStatus.CREATED);
    }

    // @GetMapping("")
    // public void test() {
    //     System.out.print("Successfully ping");
    // }

    @GetMapping("")
    public ResponseEntity<?> getAllPets() { 
        return null;
    }
    // read pet 
    // update pet
    // delete pet

}
