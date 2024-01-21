package com.example.demo.service;

import com.example.demo.entity.History;
import com.example.demo.entity.User;
import com.example.demo.exception.HistoryCreateFailException;
import com.example.demo.model.RechargeRequest;
import com.example.demo.repository.HistoryRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class HistoryService {
    @Autowired
    HistoryRepository historyRepository;
    @Autowired
    UserRepository userRepository;
    public History createHistory(RechargeRequest rechargeRequest){
        User user = CustomUserDetailService.getUser();
        if(user==null){
            throw new UsernameNotFoundException("khong tim thay user nap tien dau");
        }
        user.setFunds(user.getFunds()+ rechargeRequest.getAmount());
        userRepository.save(user);
        History history = new History();
        history.setUser(user);
        history.setCreatedAt(LocalDateTime.now());
        history.setAmount(rechargeRequest.getAmount());
        History historySave =  historyRepository.save(history);
        if(historySave == null ){
            throw new HistoryCreateFailException("khong luu duoc history");
        }
        return historySave;
    }
    public List<History> GetListHistoryByUser(){
        User user = CustomUserDetailService.getUser();
        return historyRepository.findAllByUser(user);
    }
}
