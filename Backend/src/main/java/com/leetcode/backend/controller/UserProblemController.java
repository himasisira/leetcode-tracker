package com.leetcode.backend.controller;

import com.leetcode.backend.entity.UserProblem;
import com.leetcode.backend.service.UserProblemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-problems")
@CrossOrigin(
        origins = {
                "http://localhost:3000",
                "https://leetcode-tracker-44ot5x389-himasisiras-projects.vercel.app"
        }
)
public class UserProblemController {

    @Autowired
    private UserProblemService userProblemService;

    @GetMapping("/{userId}")
    public List<UserProblem> getUserProblems(
            @PathVariable Long userId
    ) {

        return userProblemService.getUserProblems(userId);

    }

    @PostMapping
    public UserProblem save(
            @RequestBody UserProblem userProblem
    ) {

        return userProblemService.save(userProblem);

    }

}