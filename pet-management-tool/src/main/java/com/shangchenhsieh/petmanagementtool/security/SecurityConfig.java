package com.shangchenhsieh.petmanagementtool.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter{
    @Override
    public void configure(HttpSecurity heeHttpSecurity) throws Exception {
        heeHttpSecurity.csrf().disable();
    }
}
