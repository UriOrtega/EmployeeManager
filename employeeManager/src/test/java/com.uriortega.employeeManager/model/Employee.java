package com.uriortega.employeeManager.model;

import java.io.Serializable;

import javax.persistence.*;

public class Employee implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String name;
    private String email;
    private String jobTitle;
    private String phone;
    private String imageURL;
    @Column(nullable = false, updatable = false)
    private String employeeCode;

    public Employee() {}

    public Employee(String name, String email, String jobTitle, String phone, String imageURL, String employeeCode) {
        this.name = name;
        this.email = email;
        this.jobTitle = jobTitle;
        this.phone = phone;
        this.imageURL = imageURL;
        this.employeeCode = employeeCode;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String name) {
        this.email = email;
    }

    public String getJobTitle() {
        return jobTitle;
    }
    public void setJobtitle(String name) {
        this.jobTitle = jobTitle;
    }
}



