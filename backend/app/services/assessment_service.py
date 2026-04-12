"""Assessment scoring and recommendation service"""


# Assessment questions definition (moved from frontend)
QUESTIONS = [
    {
        "id": 1,
        "question": "你有过内容创作经验吗？",
        "options": [
            {"label": "完全没写过，从零开始", "value": "zero", "scores": {"retail": 0, "tourism": 0, "manufacturing": 0}},
            {"label": "偶尔写过朋友圈/小红书", "value": "casual", "scores": {"retail": 2, "tourism": 2, "manufacturing": 0}},
            {"label": "写过工作相关的文案", "value": "some", "scores": {"retail": 4, "tourism": 3, "manufacturing": 3}},
            {"label": "有1年以上内容运营经验", "value": "experienced", "scores": {"retail": 5, "tourism": 4, "manufacturing": 5}},
        ],
    },
    {
        "id": 2,
        "question": "你更擅长或更感兴趣的是？",
        "options": [
            {"label": "写种草文案、做短视频脚本", "value": "retail", "scores": {"retail": 5, "tourism": 2, "manufacturing": 0}},
            {"label": "写旅行游记、做体验内容", "value": "tourism", "scores": {"retail": 1, "tourism": 5, "manufacturing": 0}},
            {"label": "写产品说明、做专业内容", "value": "manufacturing", "scores": {"retail": 0, "tourism": 1, "manufacturing": 5}},
            {"label": "都感兴趣，还不确定", "value": "undecided", "scores": {"retail": 2, "tourism": 2, "manufacturing": 2}},
        ],
    },
    {
        "id": 3,
        "question": "你希望进入哪个行业？",
        "options": [
            {"label": "电商 / 新消费品牌", "value": "retail2", "scores": {"retail": 5, "tourism": 0, "manufacturing": 0}},
            {"label": "文旅 / 酒店 / OTA", "value": "tourism2", "scores": {"retail": 0, "tourism": 5, "manufacturing": 0}},
            {"label": "制造业 / B2B / 外贸", "value": "manufacturing2", "scores": {"retail": 0, "tourism": 0, "manufacturing": 5}},
            {"label": "还在探索阶段", "value": "exploring", "scores": {"retail": 2, "tourism": 2, "manufacturing": 2}},
        ],
    },
    {
        "id": 4,
        "question": "你的数据分析能力如何？",
        "options": [
            {"label": "不会看数据，凭感觉做事", "value": "none", "scores": {"retail": 0, "tourism": 0, "manufacturing": 0}},
            {"label": "能看懂基础数据指标", "value": "basic", "scores": {"retail": 2, "tourism": 1, "manufacturing": 2}},
            {"label": "会用数据指导内容决策", "value": "good", "scores": {"retail": 4, "tourism": 3, "manufacturing": 4}},
        ],
    },
    {
        "id": 5,
        "question": "你希望学习多长时间后开始求职？",
        "options": [
            {"label": "1个月内快速上手", "value": "fast", "scores": {"retail": 2, "tourism": 2, "manufacturing": 1}},
            {"label": "2-3个月系统学习", "value": "medium", "scores": {"retail": 4, "tourism": 3, "manufacturing": 3}},
            {"label": "半年以上深度成长", "value": "deep", "scores": {"retail": 3, "tourism": 3, "manufacturing": 5}},
        ],
    },
]

RECOMMENDATIONS = {
    "retail": {
        "industry": "retail",
        "course_id": "r-micro-01",
        "level": "微技能课",
        "reason": "零售电商种草文案需求最大，2小时速成即可上岗实习",
    },
    "tourism": {
        "industry": "tourism",
        "course_id": "t-micro-01",
        "level": "微技能课",
        "reason": "文旅旅行笔记以体验写作为主，你的兴趣和方向非常匹配",
    },
    "manufacturing": {
        "industry": "manufacturing",
        "course_id": "m-micro-01",
        "level": "微技能课",
        "reason": "B2B产品文案需要专业感，你的理性分析能力是优势",
    },
}


def calculate_recommendation(answers: dict) -> dict:
    """Calculate assessment scores and return recommendation"""
    scores = {"retail": 0, "tourism": 0, "manufacturing": 0}
    
    for question in QUESTIONS:
        q_id = question["id"]
        if q_id in answers:
            answer_value = answers[q_id]
            option = next((o for o in question["options"] if o["value"] == answer_value), None)
            if option:
                scores["retail"] += option["scores"]["retail"]
                scores["tourism"] += option["scores"]["tourism"]
                scores["manufacturing"] += option["scores"]["manufacturing"]
    
    # Determine recommended industry
    recommended_industry = max(scores, key=scores.get)
    recommendation = RECOMMENDATIONS[recommended_industry]
    
    return {
        "industry": recommended_industry,
        "course_id": recommendation["course_id"],
        "scores": scores,
        "reason": recommendation["reason"],
    }
