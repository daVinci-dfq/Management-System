package com.dfq.server.dto;

import com.dfq.server.constant.GenderType;
import com.dfq.server.model.User;
import lombok.Data;

@Data
public class UserDTO {
  private Long id;
  private String name;
  private Integer gender;
  private String password;
  private String idCard;
  private String number;

  public User toUser() {
    User user = new User();
    user.setId(id);
    user.setName(name);
    user.setGender(GenderType.values()[gender]);
    user.setPassword(password);
    user.setIdCard(idCard);
    user.setNumber(number);
    return user;
  }
}
