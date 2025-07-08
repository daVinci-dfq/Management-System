package com.dfq.server.service;

import com.dfq.server.model.User;
import com.dfq.server.repository.UserRepository;
import com.dfq.server.vo.DataTrans;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserService {

  @Autowired
  UserRepository userRepository;

  public DataTrans register(DataTrans dataTrans) {
    Map map = dataTrans.getMap();
    User newUser = new User();
    newUser.setGender((Integer) map.get("gender"));
    newUser.setName((String) map.get("name"));
    newUser.setNumber((String) map.get("number"));
    newUser.setPassword((String) map.get("password"));
    newUser.setIdCard((String) map.get("idCard"));

    DataTrans response = new DataTrans(200, "注册成功", null);
    try {
      userRepository.saveAndFlush(newUser);
    } catch (Exception e) {
      response = new DataTrans(500, "注册失败", null);
    }
    return response;
  }
}
