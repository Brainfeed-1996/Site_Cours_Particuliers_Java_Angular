package com.cours.service;

import com.cours.dto.AuthRequest;
import com.cours.dto.AuthResponse;
import com.cours.dto.RegisterRequest;
import com.cours.entity.User;
import com.cours.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtService jwtService;
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Un utilisateur avec cet email existe déjà");
        }
        
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(User.Role.valueOf(request.getRole().toUpperCase()));
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        user.setBio(request.getBio());
        user.setHourlyRate(request.getHourlyRate());
        
        User savedUser = userRepository.save(user);
        String token = jwtService.generateToken(savedUser);
        
        return new AuthResponse(token, savedUser.getId(), savedUser.getEmail(), 
                              savedUser.getFirstName(), savedUser.getLastName(), 
                              savedUser.getRole().name());
    }
    
    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        
        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        
        String token = jwtService.generateToken(user);
        
        return new AuthResponse(token, user.getId(), user.getEmail(), 
                              user.getFirstName(), user.getLastName(), 
                              user.getRole().name());
    }
}
