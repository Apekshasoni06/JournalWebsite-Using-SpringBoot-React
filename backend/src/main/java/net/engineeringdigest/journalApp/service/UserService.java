package net.engineeringdigest.journalApp.service;
import net.engineeringdigest.journalApp.Entity.User;
import net.engineeringdigest.journalApp.repository.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

;

@Component
public class UserService {

    @Autowired
    public UserService(UserRepository UserRepository) {
        this.userRepository = UserRepository;
    }
    private UserRepository userRepository;
    private static final PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();

    public void saveUser(User user) {
        userRepository.save(user);
    }
    public boolean saveNewUser (User user) {
        try {
            // Check if the username already exists
            if (userRepository.existsByUserName(user.getUserName())) {
                throw new IllegalArgumentException("Username already exists");
            }

            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setRoles(Arrays.asList("USER"));
            userRepository.save(user);
            return true;

        } catch (IllegalArgumentException e) {
            // Handle duplicate username error
            throw e; // Rethrow the exception to be handled in the controller
        } catch (Exception e) {
            return false; // Handle other exceptions
        }
    }

    public void saveAdmin(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(Arrays.asList("USER","ADMIN"));
        userRepository.save(user);
    }

    public List<User> getAll(){
        return userRepository.findAll();
    }
    public Optional<User> findById(ObjectId id){
        return userRepository.findById(id);
    }
    public void deleteById(ObjectId id){
        userRepository.deleteById(id);
    }
    public User findByUserName(String userName){
        return userRepository.findByUserName(userName);
    }
    public User findByUserNameAndPassword(String userName, String rawPassword) {
        User user = userRepository.findByUserName(userName);
        if (user != null && passwordEncoder.matches(rawPassword, user.getPassword())) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            return user;
        }
        return null;
    }

}
