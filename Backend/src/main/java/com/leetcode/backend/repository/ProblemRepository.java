package com.leetcode.backend.repository;

import com.leetcode.backend.entity.Problem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProblemRepository extends JpaRepository<Problem, Long> {

    List<Problem> findByUserId(Long userId);

}