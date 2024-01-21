package com.example.demo.controller;

import com.example.demo.entity.History;
import com.example.demo.model.RechargeRequest;
import com.example.demo.service.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class HistoryController {
    @Autowired
    HistoryService historyService;

    @PostMapping("/charge")
    public ResponseEntity<History> PostCreateHistory(@RequestBody RechargeRequest rechargeRequest){
        return ResponseEntity.ok(historyService.createHistory(rechargeRequest));
    }
    @GetMapping("/historys")
    public ResponseEntity<List<History>> GetListHistoryByUser(){
        return ResponseEntity.ok(historyService.GetListHistoryByUser());
    }
}
