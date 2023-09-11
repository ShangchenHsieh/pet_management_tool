package com.shangchenhsieh.petmanagementtool.domain;

import javax.persistence.*;

@Entity
@Table(name = "Pets")
public class Pets {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = true, updatable = true)
    private String petsName;

    @Column(nullable = true, updatable = true)
    private double height;

    @Column(nullable = true, updatable = true)
    private double weight;

    @Column(nullable = true, updatable = true)
    private double age; 

    private int feedPerDay = 2; 
}
