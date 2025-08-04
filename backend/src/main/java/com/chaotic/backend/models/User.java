package com.chaotic.backend.models;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name="user")
public class User {

    public User(){}
    public User(String name, String email, String passwordHashed){
        this.name=name;
        this.email=email;
        this.passwordHashed=passwordHashed;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String name;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(name="password_hashed",nullable = false)
    private String passwordHashed;
    @CreationTimestamp
    @Column(name="created_at",nullable = false,updatable = false)
    private LocalDateTime createdAt;
    @UpdateTimestamp
    @Column(name="updated_at",nullable = false,updatable = true)
    private LocalDateTime updatedAt;

    public void setName(String name){this.name=name;}
    public void setEmail(String email){this.email=email;}

    public Long getId(){return id;}
    public String getName(){return name;}
    public String getEmail(){return email;}
    public String getPasswordHashed(){return passwordHashed;}
}
