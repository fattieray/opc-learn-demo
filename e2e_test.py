#!/usr/bin/env python3
"""
OPC Learning Hub - 端到端功能测试
测试部署后的前端和后端所有功能
"""

import requests
import json
import time
import sys

# 配置
BACKEND_URL = "https://opc-learn-backend.onrender.com"
FRONTEND_URL = "https://opc-learn-demo.vercel.app"
API_BASE = f"{BACKEND_URL}/api/v1"

# 测试结果
results = {
    "passed": 0,
    "failed": 0,
    "tests": []
}

def log_test(test_name, passed, details=""):
    """记录测试结果"""
    status = "✅ PASS" if passed else "❌ FAIL"
    results["tests"].append({
        "name": test_name,
        "passed": passed,
        "details": details
    })
    if passed:
        results["passed"] += 1
        print(f"✅ {test_name}")
    else:
        results["failed"] += 1
        print(f"❌ {test_name}: {details}")
    return passed

def print_section(title):
    """打印测试章节"""
    print(f"\n{'='*70}")
    print(f"📋 {title}")
    print(f"{'='*70}")

def test_backend_health():
    """测试后端健康状态"""
    print_section("1. 后端健康检查")
    
    # 测试根路径
    try:
        resp = requests.get(f"{API_BASE}/", timeout=30)
        log_test("后端根路径可访问", resp.status_code == 200, f"状态码: {resp.status_code}")
    except Exception as e:
        log_test("后端根路径可访问", False, str(e))
    
    # 测试 API 文档
    try:
        resp = requests.get(f"{BACKEND_URL}/docs", timeout=30)
        log_test("API 文档页面", resp.status_code == 200, f"状态码: {resp.status_code}")
    except Exception as e:
        log_test("API 文档页面", False, str(e))

def test_user_registration():
    """测试用户注册"""
    print_section("2. 用户注册")
    
    test_user = {
        "phone": f"1380013{int(time.time()) % 10000:04d}",
        "nickname": f"测试用户{int(time.time()) % 10000}"
    }
    
    try:
        resp = requests.post(f"{API_BASE}/auth/register", json=test_user, timeout=30)
        data = resp.json()
        
        if resp.status_code == 200 and "token" in data:
            log_test("用户注册成功", True, f"用户ID: {data.get('user', {}).get('id')}")
            return data.get('user'), data.get('token')
        else:
            log_test("用户注册成功", False, f"错误: {data.get('detail', 'Unknown')}")
            return None, None
    except Exception as e:
        log_test("用户注册成功", False, str(e))
        return None, None

def test_user_login():
    """测试用户登录"""
    print_section("3. 用户登录")
    
    login_data = {
        "phone": "13800138000",
        "otp": "123456"  # 演示环境固定 OTP
    }
    
    try:
        resp = requests.post(f"{API_BASE}/auth/login", json=login_data, timeout=30)
        data = resp.json()
        
        if resp.status_code == 200 and "token" in data:
            log_test("用户登录成功", True, f"Token: {data['token'][:20]}...")
            return data['token'], data.get('user')
        else:
            log_test("用户登录成功", False, f"错误: {data.get('detail', 'No token')}")
            return None, None
    except Exception as e:
        log_test("用户登录成功", False, str(e))
        return None, None

def test_courses_api(token=None):
    """测试课程 API"""
    print_section("4. 课程功能")
    
    headers = {"Authorization": f"Bearer {token}"} if token else {}
    
    # 获取课程列表
    try:
        resp = requests.get(f"{API_BASE}/courses/", headers=headers, timeout=30)
        data = resp.json()
        
        if resp.status_code == 200 and isinstance(data, list):
            log_test("获取课程列表", True, f"课程数量: {len(data)}")
            
            # 打印课程名称
            if len(data) > 0:
                print(f"   课程列表:")
                for i, course in enumerate(data[:5], 1):
                    print(f"     {i}. {course.get('title', 'Unknown')}")
                
                # 测试获取第一个课程详情
                first_course_id = data[0].get('id')
                if first_course_id:
                    try:
                        resp_detail = requests.get(f"{API_BASE}/courses/{first_course_id}", headers=headers, timeout=30)
                        if resp_detail.status_code == 200:
                            log_test("获取课程详情", True, f"课程: {resp_detail.json().get('title')}")
                        else:
                            log_test("获取课程详情", False, f"状态码: {resp_detail.status_code}")
                    except Exception as e:
                        log_test("获取课程详情", False, str(e))
        else:
            log_test("获取课程列表", False, f"状态码: {resp.status_code}")
    except Exception as e:
        log_test("获取课程列表", False, str(e))

def test_missions_api(token=None):
    """测试任务 API"""
    print_section("5. 任务功能")
    
    headers = {"Authorization": f"Bearer {token}"} if token else {}
    
    # 获取任务列表
    try:
        resp = requests.get(f"{API_BASE}/missions/", headers=headers, timeout=30)
        data = resp.json()
        
        if resp.status_code == 200 and isinstance(data, list):
            log_test("获取任务列表", True, f"任务数量: {len(data)}")
            
            if len(data) > 0:
                print(f"   任务列表:")
                for i, mission in enumerate(data[:5], 1):
                    print(f"     {i}. {mission.get('title', 'Unknown')}")
        else:
            log_test("获取任务列表", False, f"状态码: {resp.status_code}")
    except Exception as e:
        log_test("获取任务列表", False, str(e))

def test_circles_api(token=None):
    """测试学习圈 API"""
    print_section("6. 学习圈功能")
    
    headers = {"Authorization": f"Bearer {token}"} if token else {}
    
    # 获取学习圈列表
    try:
        resp = requests.get(f"{API_BASE}/circles/", headers=headers, timeout=30)
        data = resp.json()
        
        if resp.status_code == 200 and isinstance(data, list):
            log_test("获取学习圈列表", True, f"学习圈数量: {len(data)}")
            
            if len(data) > 0:
                print(f"   学习圈列表:")
                for i, circle in enumerate(data[:5], 1):
                    print(f"     {i}. {circle.get('name', 'Unknown')}")
        else:
            log_test("获取学习圈列表", False, f"状态码: {resp.status_code}")
    except Exception as e:
        log_test("获取学习圈列表", False, str(e))

def test_assessment_api(token=None):
    """测试测评 API"""
    print_section("7. 技能测评")
    
    # 获取测评题目
    try:
        resp = requests.get(f"{API_BASE}/assessment/questions", timeout=30)
        data = resp.json()
        
        if resp.status_code == 200 and "questions" in data:
            log_test("获取测评题目", True, f"题目数量: {len(data['questions'])}")
        else:
            log_test("获取测评题目", False, f"响应: {data}")
    except Exception as e:
        log_test("获取测评题目", False, str(e))

def test_frontend_accessibility():
    """测试前端可访问性"""
    print_section("8. 前端可访问性")
    
    pages = [
        ("/", "首页"),
        ("/courses", "课程列表"),
        ("/assessment", "技能测评"),
        ("/login", "登录页面"),
    ]
    
    for path, name in pages:
        try:
            resp = requests.get(f"{FRONTEND_URL}{path}", timeout=30)
            if resp.status_code == 200:
                log_test(f"前端 {name}", True, f"状态码: {resp.status_code}")
            else:
                log_test(f"前端 {name}", False, f"状态码: {resp.status_code}")
        except Exception as e:
            log_test(f"前端 {name}", False, str(e))

def test_user_profile(token=None):
    """测试用户资料"""
    print_section("9. 用户资料")
    
    if not token:
        log_test("获取用户资料", False, "无 token")
        return
    
    headers = {"Authorization": f"Bearer {token}"}
    
    try:
        resp = requests.get(f"{API_BASE}/users/me", headers=headers, timeout=30)
        data = resp.json()
        
        if resp.status_code == 200 and "id" in data:
            log_test("获取用户资料", True, f"用户: {data.get('nickname', data.get('phone'))}")
        else:
            log_test("获取用户资料", False, f"状态码: {resp.status_code}")
    except Exception as e:
        log_test("获取用户资料", False, str(e))

def print_summary():
    """打印测试总结"""
    print(f"\n{'='*70}")
    print(f"📊 测试总结")
    print(f"{'='*70}")
    
    total = results["passed"] + results["failed"]
    pass_rate = (results["passed"] / total * 100) if total > 0 else 0
    
    print(f"\n总测试数: {total}")
    print(f"✅ 通过: {results['passed']}")
    print(f"❌ 失败: {results['failed']}")
    print(f"通过率: {pass_rate:.1f}%\n")
    
    if results["failed"] > 0:
        print("失败的测试:")
        for test in results["tests"]:
            if not test["passed"]:
                print(f"  ❌ {test['name']}: {test['details']}")
        print()
    
    if pass_rate >= 90:
        print("🎉 整体测试结果优秀！")
    elif pass_rate >= 70:
        print("👍 整体测试结果良好")
    elif pass_rate >= 50:
        print("⚠️  部分功能需要修复")
    else:
        print("❌ 存在较多问题，需要重点修复")
    
    print(f"\n{'='*70}\n")

def main():
    print("🚀 OPC Learning Hub - 端到端功能测试")
    print(f"后端: {BACKEND_URL}")
    print(f"前端: {FRONTEND_URL}")
    
    # 1. 后端健康检查
    test_backend_health()
    
    # 2. 数据库种子（如果需要）
    print_section("0. 数据库初始化")
    try:
        resp = requests.post(f"{API_BASE}/seed/", timeout=30)
        if resp.status_code == 200:
            log_test("数据库种子数据", True)
        else:
            log_test("数据库种子数据", False, "可能已初始化")
    except:
        pass
    
    # 3. 用户注册
    new_user = test_user_registration()
    
    # 4. 用户登录
    token = test_user_login()
    
    # 5. 前端可访问性
    test_frontend_accessibility()
    
    # 6. 用户注册
    new_user, reg_token = test_user_registration()
    
    # 7. 用户登录
    token, user_info = test_user_login()
    
    if token:
        # 8. 课程功能
        test_courses_api(token)
        
        # 9. 任务功能
        test_missions_api(token)
        
        # 10. 学习圈功能
        test_circles_api(token)
        
        # 11. 技能测评
        test_assessment_api(token)
        
        # 12. 用户资料
        test_user_profile(token)
    
    # 打印总结
    print_summary()
    
    # 返回测试结果
    return results["failed"] == 0

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
