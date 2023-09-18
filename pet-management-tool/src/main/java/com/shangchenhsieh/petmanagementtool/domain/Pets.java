package com.shangchenhsieh.petmanagementtool.domain;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "Pets")
public class Pets {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    
    @Column(nullable = false, updatable = true, unique = true)
    @NotBlank(message = "Give your pet a name")
    private String petsName;


    @Column(nullable = true, updatable = true)
    private double height;
    

    @Column(nullable = true, updatable = true)
    private double weight;


    @Column(nullable = true, updatable = true)
    private double age;

    @Column(nullable = true, length = 64)
    private String petPicture;


    private int feedPerDay = 2; 

    // pets have many to one relation to users

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getPetsName() {
        return this.petsName;
    }

    public void setPetsName(String petsName) {
        this.petsName = petsName;
    }

    public double getHeight() {
        return this.height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public double getWeight() {
        return this.weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public double getAge() {
        return this.age;
    }

    public void setAge(double age) {
        this.age = age;
    }

    public String getPetPicture() {
        return this.petPicture;
    }

    public void setPetPicture(String petPicture) {
        this.petPicture = petPicture;
    }
}
