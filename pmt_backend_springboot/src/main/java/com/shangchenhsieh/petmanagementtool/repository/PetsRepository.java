package com.shangchenhsieh.petmanagementtool.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.shangchenhsieh.petmanagementtool.domain.Pets;

@Repository 
public interface PetsRepository extends CrudRepository<Pets, Long>{
    Pets findByPetsName(String petsName);
}
