package com.istyle.controller;

import com.alibaba.druid.support.json.JSONUtils;
import com.istyle.pojo.*;
import com.istyle.service.EvaluationService;
import com.istyle.service.StyHouseService;
import com.istyle.service.StylistService;
import com.istyle.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

/**
 * 我的主页
 * @author 黄文伟
 */
@Controller
@RequestMapping("/myHome")
public class MyHomePage {
    @Autowired
    private UserService userService;
    @Autowired
    private StylistService stylistService;
    @Autowired
    private StyHouseService styHouseService;
    @Autowired
    private EvaluationService evaluationService;

    /**
     * 打开编辑页面发送用户数据
     * @param request
     * @return json
     */
    @ResponseBody
    @RequestMapping(value="/updateUserPage", method= RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    public String updatePage(HttpServletRequest request){
        Long userId;
        Map<String, String> users = new HashMap<>(16);
        String json;
        userId = (Long) request.getSession().getAttribute("userId");
        TbUser user = userService.selectUserById(userId);
        users.put("userPhoto", user.getUserPhoto());
        users.put("userName", user.getUserName());
        users.put("userWord", user.getUserWord());
        users.put("userSex", user.getUserSex());
        json = JSONUtils.toJSONString(users);

        return json;
    }

    /**
     * 编辑信息
     * @param request
     * @return json
     */
    @ResponseBody
    @RequestMapping("/updateMessage")
    public String updateUser(HttpServletRequest request){
        TbUser user = new TbUser();
        Map<String, String> map = new HashMap<>(16);
        String json;

        user.setUserId((Long) request.getSession().getAttribute("userId"));

        if (request.getSession().getAttribute("userId") != null) {
            /*user.setUserPhoto(request.getParameter("userPhoto"));*/
            user.setUserName(request.getParameter("userName"));
            user.setUserWord(request.getParameter("userWord"));
            user.setUserSex(request.getParameter("userSex"));

            userService.updateUser(user);

            map.put("isOpen", "1");
            json = JSONUtils.toJSONString(map);
            return json;
        }
        else {
            map.put("isOpen", "0");
            json = JSONUtils.toJSONString(map);
            return json;
        }
    }

    /**
     * 我的主页跳转至我的信息
     * @param request
     * @return
     */
    @ResponseBody
    @RequestMapping(value="/index", method= RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    public String myHomePage(HttpServletRequest request){
        System.out.println("message page success");
        Long userId = (Long) request.getSession().getAttribute("userId");
        Map<String, String> users = new HashMap(16);
        String json;
        if (userId != null){
            TbUser user = userService.selectUserById(userId);
            users.put("isOpen", "1");
            users.put("userPhoto", user.getUserPhoto());
            users.put("userName", user.getUserName());
            users.put("userWord", user.getUserWord());
            users.put("userSex", user.getUserSex());
            json = JSONUtils.toJSONString(users);
        }
        else {
            users.put("isOpen", "0");
            json = JSONUtils.toJSONString(users);
        }
        return json;
    }

    /**
     * 我的收藏
     * @param request
     * @return
     */
    @ResponseBody
    @RequestMapping(value="/userCollection", method= RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    public Map myCollection(HttpServletRequest request){
        System.out.println("my collection");
        Long userId = (Long) request.getSession().getAttribute("userId");
        Map<String, List> map = new HashMap<>(16);
//        String json;
        Long styCount; //造型师收藏数
        Long styHouseCount; //造型师收藏数
        Long evalCount; //测评数
        List<TbStylist> stylists; //造型师
        List<TbStyHouse> styHouses; //造型屋
        List<TbEvaluation> evaluations; //测评
        if (userId != null){
            styCount = stylistService.selectStylistCountByUserId(userId);
            stylists = stylistService.selectStylistByUserId(userId);
            styHouseCount = styHouseService.selectStyHouseCountByUserId(userId);
            styHouses = styHouseService.selectStyHouseByUserId(userId);
            evalCount = evaluationService.selectEvaluationCountByUserId(userId);
            evaluations = evaluationService.selectEvaluationByUserId(userId);

            map.put("styCount", Collections.singletonList(styCount));
            map.put("stylist", stylists);
            map.put("styHouseCount", Collections.singletonList(styHouseCount));
            map.put("styHouse", styHouses);
            map.put("evalCount", Collections.singletonList(evalCount));
            map.put("evaluation", evaluations);

            /*json = JSONUtils.toJSONString(map);*/
        }
        else {
            System.out.println("没有该成员");
        }

        return map;
    }

    /**
     * 我的关注
     * @param request
     * @return
     */
    @ResponseBody
    @RequestMapping(value="/userFoller", method= RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    public Map<String, List> myFoller(HttpServletRequest request){
        System.out.println("my foller");
        Long userId = (Long) request.getSession().getAttribute("userId");
        Map<String, List> map = new HashMap<>(16);
        Long follerCount;
        List<TbUser> follers;
//        String json = null;

        if (userId != null){
            follerCount = userService.selectUserCountById(userId);
            follers = userService.selectFollersById(userId);

            map.put("follerCount", Collections.singletonList(follerCount));
            map.put("follers", follers);

            /*json = JSONUtils.toJSONString(map);*/
        }
        else {
            System.out.println("失败");
        }
        return map;
    }

    /**
     * 取消关注
     * @param request
     * @param response
     * @return
     * @throws IOException
     * @throws ServletException
     */
    @ResponseBody
    @RequestMapping(value="/unFoller", method= RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
    public int unFoller(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException{
        System.out.println("unFoller");
        Long userId = (Long) request.getSession().getAttribute("userId");
        Long userId2 = Long.valueOf(request.getParameter("userId"));

        int result = userService.unFoller(userId, userId2);
        return result;
    }

    /**
     * 我的粉丝页面
     * @param request
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/myFans", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    public Map myFansPage(HttpServletRequest request){
        System.out.println("myFans");
        Long userId2 = (Long) request.getSession().getAttribute("userId");
        Map<String, TbUser> fans;

        fans = userService.myFansPage(userId2);

        return fans;
    }

    /**
     * 添加粉丝关注
     * @param request
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/doFoller", method = RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
    public int addFanFoller(HttpServletRequest request){
        System.out.println("doFoller");
        Long userId, userId2;
        TbUserUser tbUserUser = new TbUserUser();
        int flag;

        userId = (Long) request.getSession().getAttribute("userId");
        userId2 = Long.valueOf(request.getParameter("userId"));
        tbUserUser.setUserId(userId);
        tbUserUser.setUserId2(userId2);

        flag = userService.addFoller(tbUserUser);

        return flag;
    }

    /**
     * 我的投稿展示
     * @param request
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/mySubmission", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    public Map mySubmissionPage(HttpServletRequest request){
        System.out.println("my submission");
        Map<String, List> map;
        Long userId = (Long) request.getSession().getAttribute("userId");

        map = userService.mySubmission(userId);

        return map;
    }
}
