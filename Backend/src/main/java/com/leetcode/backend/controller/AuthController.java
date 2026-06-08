package com.leetcode.backend.controller;

import com.leetcode.backend.dto.AuthResponse;
import com.leetcode.backend.dto.LoginRequest;
import com.leetcode.backend.entity.User;
import com.leetcode.backend.jwt.JwtUtil;
import com.leetcode.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(
        origins = {
                "http://localhost:3000",
                "https://leetcode-tracker-brown-one.vercel.app"
        }
)
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public AuthResponse login(
            @RequestBody LoginRequest request
    ) {

        System.out.println("========== LOGIN DEBUG ==========");
        System.out.println("Username received = " + request.getUsername());
        System.out.println("Password received = " + request.getPassword());

        User user =
                userRepository.findByEmail(
                        request.getUsername()
                );

        System.out.println("User found = " + user);

        if (user == null) {

            System.out.println("User not found in database");

            throw new RuntimeException(
                    "Invalid email or password"
            );
        }

        System.out.println("Database password = " + user.getPassword());

        if (!user.getPassword().equals(
                request.getPassword()
        )) {

            System.out.println("Password mismatch");

            throw new RuntimeException(
                    "Invalid email or password"
            );
        }

        String token =
                JwtUtil.generateToken(
                        user.getEmail()
                );

        System.out.println("LOGIN SUCCESS");
        System.out.println("Generated Token = " + token);

        return new AuthResponse(token);
    }
}