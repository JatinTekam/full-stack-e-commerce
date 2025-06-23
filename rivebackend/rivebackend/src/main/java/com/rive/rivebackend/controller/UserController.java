package com.rive.rivebackend.controller;
import com.rive.rivebackend.Dto.AuthRequest;
import com.rive.rivebackend.Dto.JwtResponse;
import com.rive.rivebackend.Dto.RefreshTokenRequest;
import com.rive.rivebackend.entity.UserEntity;
import com.rive.rivebackend.model.UserModal;
import com.rive.rivebackend.repository.UserRepository;
import com.rive.rivebackend.service.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/v1")
public class UserController {



    private final UserModal userModal;


    private final AuthenticationManager authManager;

    private final JwtService jwtService;

    private final UserRepository userRepository;

    public UserController(UserModal userModal, AuthenticationManager authManager, JwtService jwtService, UserRepository userRepository) {
        this.userModal = userModal;
        this.authManager = authManager;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> userSignUp(@RequestBody UserEntity user) {
        Map<String, Object> response = new HashMap<>();
        try {
            if (!isValidUser(user)) {
                response.put("success", false);
                response.put("message", "All fields are required: userName, email, name, password, mobileNo");
                response.put("status", 400);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }


            String conflictMessage = checkForExistingUser(user);
            if (conflictMessage != null) {
                response.put("success", false);
                response.put("message", conflictMessage);
                response.put("status", 409);
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }

            userModal.signUp(user);
            response.put("success", true);
            response.put("message", "User registered successfully");
            response.put("status", 201);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Registration failed due to server error");
            response.put("status", 500);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


    @GetMapping("/allUser")
    public List<UserEntity> getAllUser(){
       return userModal.getAllUser();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest user) {
        Map<String, Object> response = new HashMap<>();
        System.out.println(user.getEmail()+" "+user.getPassword());
        authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword()));

       String accessToken=jwtService.generateToken(user.getEmail(),true);

       String refreshToken=jwtService.generateToken(user.getEmail(),false);

       UserEntity dbUser=userRepository.findByEmail(user.getEmail()).get();

      JwtResponse jwtResponse=new JwtResponse(accessToken,refreshToken,dbUser);

      return ResponseEntity.ok(jwtResponse);
    }


    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequest user) {

        if(jwtService.validateToken(user.refreshToken())){
         String usernameFromToken=jwtService.getUsernameFromToken(user.refreshToken());

         String accessToken=jwtService.generateToken(usernameFromToken,true);
         String refreshToken=jwtService.generateToken(usernameFromToken,false);

            UserEntity dbUser=userRepository.findByEmail(usernameFromToken).get();

            JwtResponse jwtResponse=new JwtResponse(accessToken,refreshToken,dbUser);

            return ResponseEntity.ok(jwtResponse);

        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Refresh Token");
    }





    private boolean isValidUser(UserEntity user) {
        return user != null &&
                user.getUsername() != null && !user.getUsername().trim().isEmpty() &&
                user.getEmail() != null && !user.getEmail().trim().isEmpty() &&
                user.getName() != null && !user.getName().trim().isEmpty() &&
                user.getPassword() != null && !user.getPassword().trim().isEmpty() &&
                user.getMobileNo() != null && !user.getMobileNo().trim().isEmpty();
    }

    private String checkForExistingUser(UserEntity user) {

        boolean existingUserByEmail = userModal.findExistingEmail(user.getEmail());
        if (existingUserByEmail) {
            return "Email already exists";
        }


        boolean existingUserByUsername = userModal.findByUsername(user.getUsername());
        if (existingUserByUsername) {
            return "Username already exists";
        }


        boolean existingUserByMobile = userModal.findByMobileNo(user.getMobileNo());
        if (existingUserByMobile) {
            return "Mobile number already exists";
        }

        return null;
    }


}