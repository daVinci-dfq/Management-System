package com.dfq.server.repository;

import com.dfq.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

  Optional<User> findByNumber(String number);

  Optional<User> findByIdCard(String idCard);

}
