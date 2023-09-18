package com.shangchenhsieh.petmanagementtool.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shangchenhsieh.petmanagementtool.domain.Pets;
import com.shangchenhsieh.petmanagementtool.repository.PetsRepository;

@Service
public class PetsService {

    @Autowired
    PetsRepository petsRepository;
    
    public Pets savePets(Pets p){
        try {
            return petsRepository.save(p);
        } catch(Exception e) {

        }
    }
}
