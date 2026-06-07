package com.leetcode.backend.controller;

import com.leetcode.backend.entity.Problem;
import com.leetcode.backend.service.ProblemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/problems")
public class ProblemController {

    @Autowired
    private ProblemService problemService;

    // CREATE
    @PostMapping
    public Problem addProblem(@RequestBody Problem problem) {
        return problemService.saveProblem(problem);
    }

    // READ ALL
    @GetMapping
    public List<Problem> getAllProblems() {
        return problemService.getAllProblems();
    }

    // READ BY ID
    @GetMapping("/{id}")
    public Problem getProblemById(@PathVariable Long id) {
        return problemService.getProblemById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Problem updateProblem(@PathVariable Long id,
                                 @RequestBody Problem updatedProblem) {
        return problemService.updateProblem(id, updatedProblem);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteProblem(@PathVariable Long id) {
        return problemService.deleteProblem(id);
    }

    // GET PROBLEMS BY USER ID
    @GetMapping("/user/{userId}")
    public List<Problem> getProblemsByUserId(@PathVariable Long userId) {
        return problemService.getProblemsByUserId(userId);
    }
}