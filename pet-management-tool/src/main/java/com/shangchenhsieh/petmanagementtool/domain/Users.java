package com.shangchenhsieh.petmanagementtool.domain;


import java.util.Date;

import javax.persistence.*;




@Entity
@Table(name = "Users")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private String confirmedPW;

    private String firstName;
    private String lastName;
    private String middleName;

    private Date created_At;
    private Date updated_At;

    @Column(nullable = true, length = 64)
    private String profilePicture;

    
    // user has one to many relation to pets

}
