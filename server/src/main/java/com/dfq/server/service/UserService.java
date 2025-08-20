package com.dfq.server.service;

import com.dfq.server.dto.UserDTO;
import com.dfq.server.model.User;
import com.dfq.server.repository.UserRepository;
import com.dfq.server.dto.DataDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

  @Autowired
  UserRepository userRepository;

  public DataDTO register(UserDTO userDTO) {
    User newUser = userDTO.toUser();
    DataDTO response;
    try {
      if (userRepository.findByNumber(newUser.getNumber()).isPresent())
        response = new DataDTO(400, "The number has been registered!", null);
      else if (userRepository.findByIdCard(newUser.getIdCard()).isPresent())
        response = new DataDTO(400, "The idCard has been registered!", null);
      else {
        response = new DataDTO(400, "Register successfully!", null);
        userRepository.saveAndFlush(newUser);
      }
    } catch (Exception e) {
      response = new DataDTO(500, "Failed by unknown error.", null);
    }
    return response;
  }

  public DataDTO login(UserDTO userDTO) {
    User user = userDTO.toUser();
    DataDTO response;
    Optional<User> userOptional;
    String number = user.getNumber();
    String idCard = user.getIdCard();
    String password = user.getPassword();
    if (number != null) {
      userOptional = userRepository.findByNumber(number);
    } else if (idCard != null) {
      userOptional = userRepository.findByIdCard(idCard);
    } else {
      return new DataDTO(400, "Failed By unknown error.", null);
    }
    response = new DataDTO(200, "Login successfully!", userOptional.get());
    return response;
  }
}
