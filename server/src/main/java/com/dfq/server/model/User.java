package com.dfq.server.model;

import com.dfq.server.constant.GenderType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

/**
 * User entity class.
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  private String name;

  @NonNull
  @Enumerated(EnumType.ORDINAL)
  private GenderType gender;

  @NotBlank
  @Size(min = 11,  max = 11)
  private String number;

  @NotBlank
  private String password;

  @NotBlank
  @Size(min = 18, max = 18)
  private String idCard;

}
