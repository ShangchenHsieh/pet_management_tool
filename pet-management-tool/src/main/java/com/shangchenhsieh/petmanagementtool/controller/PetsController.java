package com.shangchenhsieh.petmanagementtool.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.shangchenhsieh.petmanagementtool.domain.Pets;
import com.shangchenhsieh.petmanagementtool.service.PetsService;


@Controller
@RequestMapping("/api/pets")
public class PetsController {

    @Autowired
    PetsService petsService;

    // create pet
    @PostMapping("")
    public Pets createPets(@Valid @RequestBody Pets pet){
        return petsService.savePets(pet);
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
