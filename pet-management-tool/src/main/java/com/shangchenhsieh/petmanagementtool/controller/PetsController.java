package com.shangchenhsieh.petmanagementtool.controller;

import java.security.Principal;

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

    /**
     * This method creates a new pet object and save it in the database
     * @param pet
     * @param result
     * @return the created pet object
     */
    @PostMapping("")
    public ResponseEntity<?> createPets(@Valid @RequestBody Pets pet, BindingResult result) {

        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
        if(errorMap !=  null) {
            return errorMap;
        }
        Pets savedPet = petsService.savePets(pet);
        return new ResponseEntity<Pets>(savedPet, HttpStatus.CREATED);
    }

    @GetMapping("/{petsName}")
    public ResponseEntity<?> getPetsByPetsname(@PathVariable String petsName) { 
        Pets pet = petsService.findPetsByPetsname(petsName.toUpperCase());

        return new ResponseEntity<Pets>(pet, HttpStatus.OK);
    }

    // read pet 
    // update pet
    // delete pet

}
